import { useEffect, useState } from "react";

import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";

import { StackedBarChart } from "./StackedBarChart";
import { Database } from "../../types/supabase";
import { toRupiah } from "../../utils/toRupiah";
import Breakdown from "./MonthlySpendingHabits/Breakdown";

export default function MonthlySpendingHabits() {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  const user = useUser();
  const [loading, setLoading] = useState(true);

  const [stackedBarExpenseData, setStackedBarExpenseData] = useState<any>([]);
  const [stackedBarIncomeData, setStackedBarIncomeData] = useState<any>([]);
  const [userSpendingTotals, setUserSpendingTotals] = useState<any>([]);

  useEffect(() => {
    if (user) {
      getUserSpendingBreakdown();
    }
  }, [session, user]);

  function getStackedBarData(data: any, restructuredSpendingTotals: any) {
    let stackedBarExpenseData: any = [];
    let stackedBarIncomeData: any = [];
    data.forEach((category: any) => {
      let name = category.name;

      if (!name) {
        if (category.direction == "in") {
          name = "Other Income";
        } else if (category.direction == "out") {
          name = "Other Expenses";
        }
      }

      if (category.direction == "in") {
        stackedBarIncomeData.push({
          name: name,
          size: (category.total / restructuredSpendingTotals.in) * 100,
          color: getRandomColor(),
          total: category.total,
        });
      } else {
        stackedBarExpenseData.push({
          name: name,
          size: (category.total / restructuredSpendingTotals.out) * 100,
          color: getRandomColor(),
          total: category.total,
        });
      }
    });

    // sort stackedBarData by size
    stackedBarExpenseData.sort((a: any, b: any) => b.size - a.size);
    stackedBarIncomeData.sort((a: any, b: any) => b.size - a.size);
    return [stackedBarExpenseData, stackedBarIncomeData];
  }

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  async function getUserSpendingBreakdown() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("user_spending_breakdown")
        .select();

      let {
        data: spendingTotals,
        error: spendingTotalsError,
        status: spendingTotalsStatus,
      } = await supabase.from("user_spending_totals").select();

      if (error && status !== 406) {
        throw error;
      }

      if (spendingTotalsError && spendingTotalsStatus !== 406) {
        throw error;
      }

      if (spendingTotals && data) {
        const restructuredSpendingTotals: any = {};

        spendingTotals.forEach((spendingTotal) => {
          restructuredSpendingTotals[spendingTotal.direction!] =
            spendingTotal.total;
        });
        setUserSpendingTotals(restructuredSpendingTotals);

        const stackedBarData = getStackedBarData(
          data,
          restructuredSpendingTotals
        );
        setStackedBarExpenseData(stackedBarData[0]);
        setStackedBarIncomeData(stackedBarData[1]);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-100 p-4">
      {session && !loading ? (
        <>
          <h2 className="mx-auto max-w-6xl px-4 text-sm text-center font-bold leading-6 text-slate-900 sm:px-6 lg:px-8">
            SPENDING BREAKDOWN
          </h2>

          <div className="w-full border-t border-slate-300 my-2" />

          <div>
            <div className="flex justify-between text-sm  font-semibold">
              <h3>INCOME</h3>
              <h3>{toRupiah(userSpendingTotals.in)}</h3>
            </div>
            <StackedBarChart
              sessions={[
                {
                  name: "in",
                  size:
                    (userSpendingTotals.in /
                      (userSpendingTotals.in + userSpendingTotals.out)) *
                    100,
                  color: "rgb(59, 209, 130)",
                },
                {
                  name: "total",
                  size:
                    100 -
                    (userSpendingTotals.in /
                      (userSpendingTotals.in + userSpendingTotals.out)) *
                      100,
                  color: "#202020",
                },
              ]}
            />
          </div>
          <div>
            <div className="flex justify-between text-sm  font-semibold">
              <h3>EXPENSE</h3>
              <h3>
                {toRupiah(userSpendingTotals.out)}
                {" /"}{" "}
                <span className="text-slate-400">{toRupiah(750500.3)}</span>
              </h3>
            </div>
            <StackedBarChart sessions={stackedBarExpenseData} />
          </div>

          <Breakdown
            stackedBarExpenseData={stackedBarExpenseData}
            stackedBarIncomeData={stackedBarIncomeData}
          />
        </>
      ) : (
        <p>Log in to view your spending breakdown.</p>
      )}
    </div>
  );
}
