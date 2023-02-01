import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

import { Database } from "../../../../types/supabase";

type UserBudgetsCategory = { name: string } & {
  user_budgets: Database["public"]["Tables"]["user_budgets"]["Row"][];
};

export default function BudgetsTable() {
  const supabaseSession = useSessionContext();
  const supabase = useSupabaseClient<Database>();

  const [categories, setBudgets] = useState<UserBudgetsCategory[]>();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [treatAsIncome, setTreatAsIncome] = useState(false);
  const [excludeFromBudget, setExcludeFromBudget] = useState(false);
  const [excludeFromTotals, setExcludeFromTotals] = useState(false);

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
        .filter("treat_as_income", "eq", false);

      if (error) {
        console.log(error);
        return;
      } else if (!data) {
        console.log("No data");
        return;
      }
      setBudgets(data as UserBudgetsCategory[]);
    };

    getUserBudgets();
  }, [supabaseSession, supabase]);

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
                DIFFERENCE
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
                DIFFERENCE
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {categories?.map((category, index) => (
              <tr key={category.name}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {category.name}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {category.user_budgets[0]?.budget || 0}
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
