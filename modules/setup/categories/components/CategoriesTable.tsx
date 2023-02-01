import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

import Toggle from "../../../../common/Toggle";
import { Database } from "../../../../types/supabase";

export default function CategoriesTable() {
  const supabaseSession = useSessionContext();
  const supabase = useSupabaseClient<Database>();

  const [categories, setCategories] =
    useState<Database["public"]["Tables"]["user_categories"]["Row"][]>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [treatAsIncome, setTreatAsIncome] = useState(false);
  const [excludeFromBudget, setExcludeFromBudget] = useState(false);
  const [excludeFromTotals, setExcludeFromTotals] = useState(false);

  useEffect(() => {
    const getUserCategories = async () => {
      const { data, error } = await supabase
        .from("user_categories")
        .select("*")
        .order("name", { ascending: true });
      if (error) {
        console.log(error);
      }
      setCategories(data!);
    };

    getUserCategories();
  }, [supabaseSession, supabase]);

  const handleSubmit = async (event: any) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      name,
      description,
      treatAsIncome,
      excludeFromBudget,
      excludeFromTotals,
    };

    // check if data.name is unique in categories
    const isUnique = categories?.every((category) => category.name !== name);

    if (!isUnique) {
      alert("Category name must be unique.");
      return;
    }

    if (supabaseSession.session) {
      try {
        const { data: newCategory, error } = await supabase
          .from("user_categories")
          .insert({
            name: data.name,
            description: data.description,
            treat_as_income: data.treatAsIncome,
            exclude_from_budget: data.excludeFromBudget,
            exclude_from_totals: data.excludeFromTotals,
            user_id: supabaseSession.session.user.id,
          })
          .select()
          .single();

        if (error) {
          console.log("db error", error);
        }

        setCategories((prevCategories) => {
          return [...prevCategories!, newCategory!];
        });

        setName("");
        setDescription("");
        setTreatAsIncome(false);
        setExcludeFromBudget(false);
        setExcludeFromTotals(false);
      } catch (error) {
        console.log("error", error);
      }
    } else {
      alert("No user logged in, or user session haven't been loaded yet.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                DISPLAY NAME
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                DESCRIPTION
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                TREAT AS INCOME
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                EXCLUDE FROM BUDGET
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                EXCLUDE FROM TOTALS
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                <div>
                  <label htmlFor=" " className="sr-only">
                    Display Name
                  </label>
                  <input
                    className="block w-full rounded-sm border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Description
                  </label>
                  <input
                    className="block w-full rounded-sm border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </div>
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                <Toggle checked={treatAsIncome} onChange={setTreatAsIncome} />
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">
                <Toggle
                  checked={excludeFromBudget}
                  onChange={setExcludeFromBudget}
                />
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">
                <Toggle
                  checked={excludeFromTotals}
                  onChange={setExcludeFromTotals}
                />
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">
                <button
                  type="submit"
                  className="text-sm inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  ADD
                </button>
              </td>
            </tr>
            {categories?.map((category) => (
              <tr key={category.name}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {category.name}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {category.description}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {category.treat_as_income ? "✔️" : ""}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {category.exclude_from_budget ? "✔️" : ""}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {category.exclude_from_totals ? "✔️" : ""}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
}
