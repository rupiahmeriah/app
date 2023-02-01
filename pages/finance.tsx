import Image from "next/image";

import { Session } from "@supabase/auth-helpers-react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { AuthGuard } from "../common/AuthGuard";
import DropDown from "../common/DropDown";
import BudgetsTable from "../modules/finances/budgets/components/BudgetsTable";

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
                      <div className="flex-shrink-0">
                        <Image
                          src="/left-carrot.svg"
                          alt="left carrot for previous month"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="flex-shrink-0">
                        <Image
                          src="/right-carrot.svg"
                          alt="right carrot for previous month"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h1 className="ml-3 text-4xl font-bold leading-7 text-slate-900 sm:truncate sm:leading-9">
                            {/* current Month in FullMonth FullYear format */}
                            {new Date().toLocaleString("default", {
                              month: "long",
                            })}{" "}
                            {new Date().getFullYear()}
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

                <BudgetsTable />
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
