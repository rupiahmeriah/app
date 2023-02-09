import { useState } from "react";

import { Transactions } from "../../../modules/finances/transactions/components/Transactions";
import { supabase } from "../../../utils/supabaseClient";
import PeriodTitle from "../../../modules/finances/PeriodTitle";
import { AuthGuard } from "../../../common/AuthGuard";
import { TabsLayout } from "../TabsLayout";

const TransactionsPage = ({ transactions }: any) => {
  const latestDate = new Date();
  latestDate.setDate(1);
  latestDate.setMonth(latestDate.getMonth() - 1);
  const [currentDate, setCurrentDate] = useState(
    new Date("2023-01-01T00:00:00.000Z")
  );

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

export async function getServerSideProps() {
  let { data: transactions } = await supabase
    .from("user_bank_transactions")
    .select();
  return {
    props: {
      transactions,
    },
  };
}

export default TransactionsPage;
