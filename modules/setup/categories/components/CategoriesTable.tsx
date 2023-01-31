import { useState } from "react";
import Toggle from "../../../../common/Toggle";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

export default function Example() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [treatAsIncome, setTreatAsIncome] = useState(false);
  const [excludeFromBudget, setExcludeFromBudget] = useState(false);
  const [excludeFromTotals, setExcludeFromTotals] = useState(false);

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

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    console.log(`Is this your category: ${JSONdata}`);
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
            {people.map((person) => (
              <tr key={person.email}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {person.name}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Title</dt>
                    <dd className="mt-1 truncate text-gray-700">
                      {person.title}
                    </dd>
                    <dt className="sr-only sm:hidden">Email</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                      <Toggle />
                    </dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {person.title}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  <Toggle />
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  <Toggle />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
}
