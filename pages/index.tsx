import { supabase } from "../utils/supabaseClient";

import { AuthGuard } from "../common/AuthGuard";
import { useSessionContext } from "@supabase/auth-helpers-react";
import AccountsOverview from "../modules/home/overview/components/AccountsOverview";
import MonthlySpendingHabits from "../modules/home/overview/components/MonthlySpendingHabits";
import MonthlySummary from "../modules/home/overview/components/MonthlySummary";
import TransactionsReview from "../modules/home/overview/components/TransactionsReview";

const Login = ({ userBanks, transactions }: any) => {
  const supabaseSession = useSessionContext();
  return (
    <AuthGuard>
      <div className="min-h-full">
        <div className="flex flex-1 flex-col lg:pl-10">
          <main className="flex-1 pb-8">
            {/* Page header */}
            <div className="bg-white">
              <div className="px-4 sm:px-6 lg:max-w-6xl">
                <div className="py-6 md:flex md:items-center md:justify-between">
                  <div className="min-w-0 flex-1">
                    {/* Profile */}
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center">
                          <h1 className="ml-3 text-4xl font-bold leading-7 text-slate-900 sm:truncate sm:leading-9">
                            Welcome {supabaseSession.session?.user.email}!
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-[minmax(200px,auto)_1fr_0.3fr] grid-flow-row">
              <div className="flex flex-col w-1/3 min-w-fit">
                <AccountsOverview userBanks={userBanks} />
                <MonthlySummary />
              </div>
              <div className="">
                <MonthlySpendingHabits />
              </div>
              <div className="w-1/3 min-w-fit">
                <TransactionsReview />
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
};

export async function getServerSideProps() {
  let { data: transactions } = await supabase
    .from("user_bank_transactions")
    .select();

  let { data } = await supabase.from("user_bank_details").select(`
      balances_available,
      balances_current,
      user_id,
      account_id,
      account_holder,
      id,
      account_number,
      institutions (
        name
      )
  `);

  return {
    props: {
      userBanks: data,
      transactions,
    },
  };
}
export default Login;
