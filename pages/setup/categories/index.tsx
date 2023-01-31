import { Session } from "@supabase/auth-helpers-react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import CategoriesTable from "../../../modules/setup/categories/components/CategoriesTable";
import { TabsLayout } from "../TabsLayout";

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
    <TabsLayout>
      <div className="min-h-full">
        <div className="flex flex-1 flex-col lg:pl-10">
          <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6">
              <div className="py-6 md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center">
                    <div>
                      <div className="flex items-center">
                        <h1 className="ml-3 text-4xl font-bold leading-7 text-slate-900 sm:truncate sm:leading-9">
                          Categories
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2 ">
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Add New Category
                  </button>
                </div>

                <CategoriesTable />
              </div>
            </div>
          </main>
        </div>
      </div>
    </TabsLayout>
  );
}
