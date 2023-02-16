import { useState } from "react";

import { Session } from "@supabase/auth-helpers-react";

import { AuthGuard } from "../../common/AuthGuard";
import DropDown from "../../common/DropDown";
import BudgetsTable from "../../modules/finances/budgets/components/BudgetsTable";
import PeriodTitle from "../../modules/finances/PeriodTitle";
import { TabsLayout } from "../../modules/finances/TabsLayout";

export default function Finance({
  session,
  userBanks,
  transactions,
}: {
  session: Session;
  userBanks: any;
  transactions: any;
}) {
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

                    <div className="flex gap-4 items-center">
                      <div className="font-semibold text-sm text-green-700 cursor-pointer">
                        BACK TO THIS MONTH
                      </div>
                      <div>
                        <DropDown title="Jump to Month" />
                      </div>
                    </div>
                  </div>

                  <BudgetsTable currentDate={currentDate} />
                </div>
              </div>
            </main>
          </div>
        </div>
      </TabsLayout>
    </AuthGuard>
  );
}
