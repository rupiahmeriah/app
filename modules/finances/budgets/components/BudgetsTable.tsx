import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

import { Database } from "../../../../types/supabase";

type UserBudgetsCategory = { name: string } & {
  user_budgets: Database["public"]["Tables"]["user_budgets"]["Row"][];
};

type CategoryEditStatusType = {
  [key: string]: {
    budget: number;
    remaining: number;
    id: number;
  };
};

export default function BudgetsTable() {
  const supabaseSession = useSessionContext();
  const supabase = useSupabaseClient<Database>();

  const [categories, setBudgets] = useState<UserBudgetsCategory[]>();

  const [categoryEditStatus, setCategoryEditStatus] =
    useState<CategoryEditStatusType>();

  const [isEditing, setIsEditing] = useState(false);
  const [categoryBeingEdited, setCategoryBeingEdited] = useState<string>();

  useEffect(() => {
    const getUserBudgets = async () => {
      const firstDayOfLastMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        1
      );
      const firstDayofThisMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      );

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
          ascending: true,
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

      const foo: CategoryEditStatusType = {};
      finalData.forEach((category) => {
        foo[category.name!] = {
          budget: category.user_budgets[0].budget,
          remaining: category.user_budgets[0].remaining,
          id: category.user_budgets[0].id,
        };
      });

      setCategoryEditStatus(foo);
    };

    getUserBudgets();
  }, [supabaseSession, supabase]);

  useEffect(() => {
    const handleWindowClick = async (event: MouseEvent) => {
      if (event.target instanceof HTMLElement) {
        const focusedCategory = event.target.id;

        const isInput = event.target instanceof HTMLInputElement;

        if (isInput) {
          return;
        }

        if (
          event.target.classList.contains(
            `${focusedCategory.replace(/\s/g, "-")}-budget`
          )
        ) {
          setIsEditing(true);
          setCategoryBeingEdited(focusedCategory);
          // get this target's id
          setCategoryEditStatus((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              [focusedCategory]: {
                ...prev[focusedCategory],
              },
            };
          });
        } else if (isEditing) {
          const currCategory = categoryEditStatus![categoryBeingEdited!];

          const { data, error } = await supabase
            .from("user_budgets")
            .update({
              budget: currCategory.budget,
              remaining: currCategory.remaining,
            })
            .filter("id", "eq", currCategory.id)
            .select();

          if (error) {
            console.log(error);
            return;
          }

          if (!data) {
            console.log("No data");
            setIsEditing(false);
            setCategoryBeingEdited("");
            setCategoryEditStatus((prev) => {
              const foo = { ...prev };
              Object.keys(foo).forEach((key) => {});
              return foo;
            });
            return;
          }

          //   call setBudgets to update the table
          setBudgets((prev) => {
            if (!prev) return prev;
            return prev.map((category) => {
              if (category.name === categoryBeingEdited) {
                return {
                  ...category,
                  user_budgets: [
                    {
                      ...category.user_budgets[0],
                      budget: currCategory.budget,
                      remaining: currCategory.remaining,
                    },
                    {
                      ...category.user_budgets[1],
                    },
                  ],
                };
              }
              return category;
            });
          });

          setIsEditing(false);
          setCategoryBeingEdited("");
          setCategoryEditStatus((prev) => {
            const foo = { ...prev };
            Object.keys(foo).forEach((key) => {});
            return foo;
          });
        }
      }
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [categoryEditStatus]);

  return (
    <form>
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
            {categories?.map((category, index) => (
              <tr key={category.name}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {category.name}
                </td>
                <td
                  className={`${category.name}-budget hidden px-3 py-4 text-sm text-gray-500 lg:table-cell`}
                >
                  {category.name == categoryBeingEdited ? (
                    <input
                      type="text"
                      value={categoryEditStatus?.[category.name!].budget}
                      onChange={(e) => {
                        setCategoryEditStatus((prev) => {
                          if (!prev) return prev;
                          return {
                            ...prev,
                            [category.name!]: {
                              ...prev[category.name!],
                              budget: parseInt(e.target.value) || 0,
                              remaining:
                                parseInt(e.target.value) -
                                category.user_budgets[0].current_total,
                            },
                          };
                        });
                      }}
                    />
                  ) : (
                    // onclick, set isEditing to true

                    <span className="inline-flex items-center space-x-3">
                      <p
                        id={category.name}
                        // convert whitespace of category.name to dash
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
    </form>
  );
}
