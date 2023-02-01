import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

import { Database } from "../../../../types/supabase";

type UserBudgetsCategory =
  Database["public"]["Tables"]["user_budgets"]["Row"] & {
    user_categories: { name: string | null };
  };

export default function BudgetsTable() {
  const supabaseSession = useSessionContext();
  const supabase = useSupabaseClient<Database>();

  const [budgets, setBudgets] = useState<UserBudgetsCategory[]>();
  const [previousBudgets, setPreviousBudgets] =
    useState<UserBudgetsCategory[]>();

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
        .from("user_budgets")
        .select(
          `
                id,
                user_id,
                period,
                budget,
                current_total,
                remaining,
                created_at,
                category_id,
                user_categories (
                    name
                )
            `
        )
        .in("period", [
          firstDayOfLastMonth.toDateString(),
          firstDayofThisMonth.toDateString(),
        ])
        .order("period", { ascending: false });
      console.log("dataer user_budgets", data);
      if (error) {
        console.log(error);
        return;
      } else if (!data) {
        console.log("No data");
        return;
      }
      setBudgets(data.slice(0, data.length / 2) as UserBudgetsCategory[]);
      setPreviousBudgets(data.slice(data.length / 2) as UserBudgetsCategory[]);
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
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
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
            {budgets?.map((budget, index) => (
              <tr key={budget.user_categories.name}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {budget.user_categories.name}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {budget.budget}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {budget.current_total}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {budget.remaining}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {previousBudgets?.[index].budget}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {previousBudgets?.[index].current_total}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {previousBudgets?.[index].remaining}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
}
