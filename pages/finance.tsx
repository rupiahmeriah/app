import { Session } from "@supabase/auth-helpers-react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { AuthGuard } from "../common/AuthGuard";

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
              <div className="px-4 sm:px-6 lg:max-w-6xl">
                <div className="py-6 md:flex md:items-center md:justify-between">
                  <div className="min-w-0 flex-1">
                    {/* Profile */}
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center">
                          <h1 className="ml-3 text-4xl font-bold leading-7 text-slate-900 sm:truncate sm:leading-9">
                            Budget
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-[minmax(200px,auto)_1fr_0.3fr] grid-flow-row"></div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
