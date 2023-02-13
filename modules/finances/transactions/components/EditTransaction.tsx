import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { Database } from "../../../../types/supabase";

export default function Example() {
  const supabaseSession = useSessionContext();
  const supabase = useSupabaseClient<Database>();

  const [categoriesList, setCategoriesList] = useState<string[]>([]);

  useEffect(() => {
    const getUserBankTransactions = async () => {
      const { data, error } = await supabase
        .from("user_categories")
        .select(`name`)
        .order("name", { ascending: true });

      if (error) {
        console.log(error);
        return;
      } else if (!data) {
        console.log("No data");
        return;
      }
      const finalData = data.map((item) => item.name) as string[];
      setCategoriesList(finalData);
    };

    getUserBankTransactions();
  }, [supabaseSession, supabase]);

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="pt-2">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <div className="mt-1">
                <select
                  id="category"
                  name="category"
                  autoComplete="category-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {categoriesList.map((category) => {
                    return <option>{category}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
