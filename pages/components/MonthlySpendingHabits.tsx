import { useEffect, useState } from "react";

import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";

import { StackedBarChart } from "./StackedBarChart";
import { Database } from "../../types/supabase";
import { toRupiah } from "../../utils/toRupiah";

export default function MonthlySpendingHabits() {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);

  const [userSpendingBreakdown, setUserSpendingBreakdown] = useState<any>([]);

  const [userSpendingTotals, setUserSpendingTotals] = useState<any>([]);

  const [sessions] = useState([
    {
      label: "Food",
      size: 60,
      color: "red",
    },
    {
      label: "Home, Auto",
      size: 30,
      color: "blue",
    },
    {
      label: "Shopping",
      size: 10,
      color: "green",
    },
  ]);

  useEffect(() => {
    getUserSpendingBreakdown();
  }, [session, user]);

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

      if (data) {
        console.log(data);
        setUserSpendingBreakdown(data);
      }

      if (spendingTotals) {
        console.log(spendingTotals);
        setUserSpendingTotals(spendingTotals);
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
      {session ? (
        <>
          <h2 className="mx-auto max-w-6xl px-4 text-sm text-center font-bold leading-6 text-slate-900 sm:px-6 lg:px-8">
            SPENDING BREAKDOWN
          </h2>

          <div className="w-full border-t border-gray-300 my-2" />

          {userSpendingTotals.map((userSpendingTotal: any) => {
            return (
              <div>
                <div className="flex justify-between text-sm  font-semibold">
                  <h3>
                    {userSpendingTotal.direction == "out"
                      ? "EXPENSES"
                      : "INCOME"}
                  </h3>
                  <h3>
                    {toRupiah(userSpendingTotal.total)}
                    {userSpendingTotal.direction == "out" && (
                      <>
                        {" /"}{" "}
                        <span className="text-slate-400">
                          {toRupiah(750500.3)}
                        </span>
                      </>
                    )}
                  </h3>
                </div>
                <StackedBarChart sessions={sessions} />
              </div>
            );
          })}

          <div className="text-sm">
            <div className="flex flex-col">
              <h3>INCOME</h3>
              <div className="w-full border-t border-gray-300 my-1" />
              {userSpendingBreakdown.map((category: any) => {
                return (
                  <div className="flex justify-between">
                    <h3>{category.name ?? "Other"}</h3>
                    <h3>{toRupiah(category.total)}</h3>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col mt-4">
              <h3>EXPENSES</h3>
              <div className="w-full border-t border-gray-300 my-1" />
              {userSpendingBreakdown.map((category: any) => {
                return (
                  // <div>
                  <div className="flex justify-between gap-1">
                    <h3>{category.name ?? "Other"}</h3>
                    <div className="w-full mx-4">
                      <StackedBarChart sessions={sessions} />
                    </div>
                    <h3>{toRupiah(category.total)}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <p>Log in to view your spending breakdown.</p>
      )}
    </div>
  );
}
