import { useEffect, useState } from "react";

import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";

import { StackedBarChart } from "./StackedBarChart";
import { Database } from "../../types/supabase";

export default function MonthlySpendingHabits() {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);

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
    getProfile();
  }, [session, user]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user!.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        // setUsername(data.username)
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
          <div>
            <div className="flex justify-between text-sm font-semibold">
              <h3 className="">INCOME</h3>
              <h3>IDR 4,500.00</h3>
            </div>
            <StackedBarChart sessions={sessions} />
          </div>

          <div>
            <div className="flex justify-between text-sm  font-semibold">
              <h3>EXPENSES</h3>
              <h3>
                IDR 735.056.59 /{" "}
                <span className="text-slate-400">IDR 750.500.30</span>
              </h3>
            </div>
            <StackedBarChart sessions={sessions} />
          </div>

          <div>
            <div className="flex flex-col">INCOME</div>
            <div className="flex flex-col">EXPENSES</div>
          </div>
        </>
      ) : (
        <p>Log in to view your spending breakdown.</p>
      )}
    </div>
  );
}
