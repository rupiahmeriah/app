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
  return (
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
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr>
            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <dl className="font-normal lg:hidden">
                <dd className="mt-1 truncate text-gray-700">formfield</dd>
                <dd className="mt-1 truncate text-gray-500 sm:hidden">
                  description
                </dd>
              </dl>
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
              toggle
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
              toggle
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">toggle</td>
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
                    toggle
                  </dd>
                </dl>
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                {person.title}
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                toggle
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">toggle</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
