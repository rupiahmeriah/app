import { Fragment } from "react";
import { classNames } from "../../../utils/classNames";
import { toRupiah } from "../../../utils/toRupiah";
import { StackedBarChart } from "../StackedBarChart";

export default function Breakdown({
  userSpendingTotals,
  stackedBarExpenseData,
  stackedBarIncomeData,
}: any) {
  const shit = [
    {
      name: "Income",
      stackedBarData: stackedBarIncomeData,
    },
    {
      name: "Expenses",
      stackedBarData: stackedBarExpenseData,
    },
  ];

  return (
    <div className="px-1">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      CATEGORY
                    </th>
                    <th
                      scope="col"
                      className="w-full px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
                    ></th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
                    >
                      TOTAL EARNED
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
                    >
                      PROJ. SPEND
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
                    >
                      % OF TOTAL
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {shit.map((breakdown) => (
                    <Fragment key={breakdown.name}>
                      <tr className="border-t border-gray-200">
                        <th
                          colSpan={5}
                          scope="colgroup"
                          className="bg-gray-50 px-4 py-2 text-left text-xs font-semibold text-gray-900 sm:px-6"
                        >
                          {breakdown.name}
                        </th>
                      </tr>
                      {breakdown.stackedBarData.map(
                        (category: any, categoryIdx: number) => (
                          <tr
                            key={category.name}
                            className={classNames(
                              categoryIdx === 0
                                ? "border-gray-300"
                                : "border-gray-200",
                              "border-t"
                            )}
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs font-medium text-gray-900 sm:pl-6">
                              {category.name}
                            </td>
                            <td className="align-middle w-full whitespace-nowrap py-4 text-xs font-medium text-gray-900">
                              <StackedBarChart sessions={[category]} />
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                              {toRupiah(category.total)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                              foo
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                              {category.size.toFixed(2)}%
                            </td>
                          </tr>
                        )
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
