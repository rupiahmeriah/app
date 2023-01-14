import { Session } from "@supabase/auth-helpers-react";

import { useSessionContext } from "@supabase/auth-helpers-react";

import AccountsOverview from "./AccountsOverview";
import Institutions from "./Institutions";
import MonthlySummary from "./MonthlySummary";
import MonthlySpendingHabits from "./MonthlySpendingHabits";
import { Database } from "../../types/supabase";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({
  session,
  userBanks,
  transactions,
}: {
  session: Session;
  userBanks: any;
  transactions: any;
}) {
  const supabaseSession = useSessionContext();

  return (
    <>
      <div className="min-h-full">
        <div className="flex flex-1 flex-col lg:pl-64">
          <main className="flex-1 pb-8">
            {/* Page header */}
            <div className="bg-white">
              <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between">
                  <div className="min-w-0 flex-1">
                    {/* Profile */}
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center">
                          <h1 className="ml-3 text-4xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                            Welcome {supabaseSession.session?.user.email}!
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2">
              <div className="grid grid-cols-1 grid-rows-3">
                <AccountsOverview userBanks={userBanks} />
                <MonthlySummary />
                {/* <Institutions /> */}
              </div>

              <div>
                <MonthlySpendingHabits transactions={transactions} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
