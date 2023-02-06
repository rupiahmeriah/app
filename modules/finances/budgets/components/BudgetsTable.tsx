import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useEffect, useReducer, useRef, useState } from "react";

import { Database } from "../../../../types/supabase";
import {
  handleWindowClick,
  persistUpdateBudget,
} from "../utils/handleWindowClick";

export type UserBudgetsCategory = { name: string } & {
  user_budgets: Database["public"]["Tables"]["user_budgets"]["Row"][];
};

export type CategoryEditStatusType = {
  [key: string]: {
    budget: number;
    remaining: number;
    id: number;
  };
};

export default function BudgetsTable({
  currentDate = new Date(),
}: {
  currentDate?: Date;
}) {
  const supabaseSession = useSessionContext();
  const supabase = useSupabaseClient<Database>();

  const [budgets, setBudgets] = useState<UserBudgetsCategory[]>();

  const [categoryBeingEdited, setCategoryBeingEdited] = useState<string>();

  type ActionType =
    | {
        type: "UPDATE_BUDGET";
        payload: { categoryName: string; budget: number };
      }
    | {
        type: "ASSIGN_BULK_BUDGET";
        payload: { categories: CategoryEditStatusType };
      }
    | { type: "OTHER_ACTION" };

  type CategoryEditStatusType = {
    [key: string]: {
      budget: number;
      currentTotal: number;
      remaining: number;
      id: number;
    };
  };

  const categoryEditStatusReducer = (
    state: CategoryEditStatusType,
    action: ActionType
  ) => {
    switch (action.type) {
      case "UPDATE_BUDGET":
        const { categoryName, budget } = action.payload;
        const category = state[categoryName];
        const remaining = budget - category.currentTotal;
        return { ...state, [categoryName]: { ...category, budget, remaining } };
      case "ASSIGN_BULK_BUDGET":
        return action.payload.categories;
      case "OTHER_ACTION":
        return state;
      default:
        return state;
    }
  };

  const [categoryEditStatus, dispatch] = useReducer(
    categoryEditStatusReducer,
    {}
  );

  const updateBudget = (categoryName: string, budget: number) => {
    dispatch({ type: "UPDATE_BUDGET", payload: { categoryName, budget } });
  };

  const assignBulkBudget = (categories: CategoryEditStatusType) => {
    dispatch({ type: "ASSIGN_BULK_BUDGET", payload: { categories } });
  };

  useEffect(() => {
    const getUserBudgets = async () => {
      const firstDayOfLastMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      );
      const firstDayofThisMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );

      // console.log(firstDayOfLastMonth.toDateString());
      // console.log(firstDayofThisMonth.toDateString());

      const { data, error } = await supabase
        .from("user_categories")
        .select(
          `
                name,
                user_budgets (
                    id,
                    user_id,
                    period,
                    budget,
                    current_total,
                    remaining,
                    created_at,
                    category_id
                )
            `
        )
        .in("user_budgets.period", [
          firstDayOfLastMonth.toDateString(),
          firstDayofThisMonth.toDateString(),
        ])
        .filter("treat_as_income", "eq", false)
        // order user_budgets by period
        .order("period", {
          ascending: false,
          foreignTable: "user_budgets",
        });

      if (error) {
        console.log(error);
        return;
      } else if (!data) {
        console.log("No data");
        return;
      }

      const finalData = data as UserBudgetsCategory[];

      setBudgets(finalData);

      const finalCategoryBeingEdited: CategoryEditStatusType = {};

      if (finalData.length === 0) {
        return;
      }

      finalData.forEach((category) => {
        finalCategoryBeingEdited[category.name!] = {
          budget: category.user_budgets.length
            ? category.user_budgets[0].budget
            : 0,
          currentTotal: category.user_budgets.length
            ? category.user_budgets[0].current_total
            : 0,
          remaining: category.user_budgets.length
            ? category.user_budgets[0].remaining
            : 0,
          id: category.user_budgets.length ? category.user_budgets[0].id : -1,
        };
      });

      assignBulkBudget(finalCategoryBeingEdited);
    };

    getUserBudgets();
  }, [supabaseSession, supabase, currentDate]);

  useEffect(() => {
    const clickListener = (event: MouseEvent) => {
      handleWindowClick(
        event,
        supabase,
        categoryBeingEdited,
        categoryEditStatus,
        setBudgets,
        updateBudget,
        setCategoryBeingEdited
      );
    };
    window.addEventListener("click", clickListener);

    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, [categoryBeingEdited, categoryEditStatus, setCategoryBeingEdited]);

  return (
    <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              CATEGORY
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              THIS PERIOD'S BUDGET
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              THIS PERIOD'S TOTAL
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 border-r-2 border-slate-300 border-dashed"
            >
              REMAINING
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              LAST PERIOD'S BUDGET
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              LAST PERIOD'S TOTAL
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              REMAINING
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {budgets?.map((category) => (
            <tr key={category.name}>
              <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                {category.name}
              </td>
              <td
                className={`${category.name}-budget hidden px-3 py-4 text-sm text-gray-500 lg:table-cell`}
              >
                {category.name == categoryBeingEdited ? (
                  <form
                    className="flex items-center"
                    onSubmit={(event) => {
                      event.preventDefault();
                      const currCategory =
                        categoryEditStatus![categoryBeingEdited!];
                      return persistUpdateBudget(
                        supabase,
                        currCategory,
                        setBudgets,
                        categoryBeingEdited,
                        updateBudget,
                        setCategoryBeingEdited
                      );
                    }}
                  >
                    <input
                      type="text"
                      value={categoryEditStatus?.[category.name!].budget}
                      onChange={(e) => {
                        updateBudget(
                          category.name!,
                          parseInt(e.target.value) || 0
                        );
                      }}
                    />
                  </form>
                ) : (
                  <span className="inline-flex items-center space-x-3">
                    <p
                      id={category.name}
                      className={`${category.name.replace(
                        /\s/g,
                        "-"
                      )}-budget text-sm font-medium text-gray-900 truncate`}
                    >
                      {category.user_budgets[0]?.budget}
                    </p>
                  </span>
                )}
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                {category.user_budgets[0]?.current_total || 0}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500 border-r-2 border-slate-200 border-dashed">
                {category.user_budgets[0]?.remaining || 0}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">
                {category.user_budgets[1]?.budget || 0}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">
                {category.user_budgets[1]?.current_total || 0}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">
                {category.user_budgets[1]?.remaining || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
