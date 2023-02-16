import { useEffect, useState } from "react";

import { Transactions } from "../../../modules/finances/transactions/components/Transactions";
import PeriodTitle from "../../../modules/finances/PeriodTitle";
import { AuthGuard } from "../../../common/AuthGuard";
import { TabsLayout } from "../../../modules/finances/TabsLayout";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Database } from "../../../types/supabase";
import { UserTransactionType } from "../../../types/highLevelTypes";

const TransactionsPage = () => {
  const supabaseSession = useSessionContext();
  const supabase = useSupabaseClient<Database>();

  const latestDate = new Date();
  latestDate.setDate(1);
  latestDate.setMonth(latestDate.getMonth() - 1);
  const [currentDate, setCurrentDate] = useState(
    new Date("2023-01-01T00:00:00.000Z")
  );

  const [transactions, setTransactions] = useState<UserTransactionType[]>();

  useEffect(() => {
    const getUserBankTransactions = async () => {
      const currentMonth = currentDate.getMonth();
      const { data, error } = await supabase
        .from("user_bank_transactions")
        .select(
          `
          amount,
          brick_category,
          created_at,
          date,
          description,
          direction,
          id,
          recurring_id,
          reference_id,
          status,
          user_id,
          user_categories (
            name
          ),
          user_bank_id (
            bank_id (
              name
            )
          )
        `
        )
        .filter(
          "date",
          "gte",
          new Date(currentDate.getFullYear(), currentMonth, 1).toISOString()
        )
        .filter(
          "date",
          "lte",
          new Date(currentDate.getFullYear(), currentMonth + 1, 0).toISOString()
        )
        .order("date", { ascending: false });

      if (error) {
        console.log(error);
        return;
      } else if (!data) {
        console.log("No data");
        return;
      }

      const finalData = data as UserTransactionType[];
      setTransactions(finalData);
    };

    getUserBankTransactions();
  }, [supabaseSession, supabase, currentDate]);

  return (
    <AuthGuard>
      <TabsLayout>
        <div className="min-h-full">
          <div className="flex flex-1 flex-col lg:pl-10">
            <main className="flex-1 pb-8">
              {/* Page header */}
              <div className="bg-white">
                <div className="px-4 sm:px-6 lg:px-10">
                  <div className="py-6 flex items-center justify-between">
                    <PeriodTitle
                      currentDate={currentDate}
                      setCurrentDate={setCurrentDate}
                    />
                  </div>
                  <Transactions transactions={transactions} />
                </div>
              </div>
            </main>
          </div>
        </div>
      </TabsLayout>
    </AuthGuard>
  );
};

export default TransactionsPage;
