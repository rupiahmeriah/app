import Image from "next/image";

import { Session } from "@supabase/auth-helpers-react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { AuthGuard } from "../common/AuthGuard";
import DropDown from "../common/DropDown";
import BudgetsTable from "../modules/finances/budgets/components/BudgetsTable";
import { useState } from "react";

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
      <div className="min-h-full">
        <div className="flex flex-1 flex-col lg:pl-10">
          <main className="flex-1 pb-8">
            {/* Page header */}
            <div className="bg-white">
              <div className="px-4 sm:px-6 lg:px-10">
                <div className="py-6 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center">
                      <button
                        className="flex-shrink-0 cursor-pointer"
                        onClick={() => {
                          const newDate = new Date(currentDate);
                          newDate.setMonth(newDate.getMonth() - 1);
                          setCurrentDate(newDate);
                        }}
                      >
                        <Image
                          src="/left-carrot.svg"
                          alt="left carrot for previous month"
                          width={40}
                          height={40}
                        />
                      </button>
                      <button
                        className="flex-shrink-0 cursor-pointer disabled:cursor-default disabled:opacity-50"
                        disabled={currentDate >= latestDate}
                        onClick={() => {
                          const newDate = new Date(currentDate);
                          newDate.setMonth(newDate.getMonth() + 1);
                          setCurrentDate(newDate);
                        }}
                      >
                        <Image
                          src="/right-carrot.svg"
                          alt="right carrot for previous month"
                          width={40}
                          height={40}
                        />
                      </button>
                      <div>
                        <div className="flex items-center">
                          <h1 className="ml-3 text-4xl font-bold leading-7 text-slate-900 sm:truncate sm:leading-9">
                            {/* current Month in FullMonth FullYear format */}
                            {currentDate.toLocaleString("default", {
                              month: "long",
                            })}{" "}
                            {currentDate.getFullYear()}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>

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
    </AuthGuard>
  );
}
