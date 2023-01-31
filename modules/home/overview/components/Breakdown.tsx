import { Fragment } from "react";
import { classNames } from "../../../../utils/classNames";
import { toRupiah } from "../../../../utils/toRupiah";
import { StackedBarChart } from "../../../../common/StackedBarChart";

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
  ];
  const shit2 = [
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
            <div className="overflow-hidden ">
              <table className="min-w-full border-t border-slate-200">
                <thead className="bg-slate-50 px-4 py-2 text-left text-xs font-semibold text-slate-900 sm:px-6">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-slate-900 sm:pl-6"
                    >
                      INCOME
                    </th>
                    <th
                      scope="col"
                      className="w-full px-3 py-3.5 text-left text-xs font-semibold text-slate-900"
                    ></th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-semibold text-slate-900"
                    >
                      TOTAL EARNED
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-semibold text-slate-900"
                    >
                      PROJ. EARN
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-semibold text-slate-900"
                    >
                      % OF TOTAL
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {shit.map((breakdown) => (
                    <Fragment key={breakdown.name}>
                      {breakdown.stackedBarData.map(
                        (category: any, categoryIdx: number) => (
                          <tr
                            key={category.name}
                            className={classNames(
                              categoryIdx === 0
                                ? "border-slate-300"
                                : "border-slate-200",
                              "border-t"
                            )}
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs font-medium text-slate-900 sm:pl-6">
                              {category.name}
                            </td>
                            <td className="align-middle w-full whitespace-nowrap py-4 text-xs font-medium text-slate-900">
                              <StackedBarChart sessions={[category]} />
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-xs text-slate-500">
                              {toRupiah(category.total)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-xs text-slate-500">
                              foo
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-xs text-slate-500">
                              {category.size.toFixed(2)}%
                            </td>
                          </tr>
                        )
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>

              <table className="min-w-full border-t border-slate-200">
                <thead className="bg-slate-50 px-4 py-2 text-left text-xs font-semibold text-slate-900 sm:px-6">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-slate-900 sm:pl-6"
                    >
                      EXPENSE
                    </th>
                    <th
                      scope="col"
                      className="w-full px-3 py-3.5 text-left text-xs font-semibold text-slate-900"
                    ></th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-semibold text-slate-900"
                    >
                      TOTAL SPENT
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-semibold text-slate-900"
                    >
                      PROJ. SPEND
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-semibold text-slate-900"
                    >
                      % OF TOTAL
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {shit2.map((breakdown) => (
                    <Fragment key={breakdown.name}>
                      {breakdown.stackedBarData.map(
                        (category: any, categoryIdx: number) => (
                          <tr
                            key={category.name}
                            className={classNames(
                              categoryIdx === 0
                                ? "border-slate-300"
                                : "border-slate-200",
                              "border-t"
                            )}
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs font-medium text-slate-900 sm:pl-6">
                              {category.name}
                            </td>
                            <td className="align-middle w-full whitespace-nowrap py-4 text-xs font-medium text-slate-900">
                              <StackedBarChart sessions={[category]} />
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-xs text-slate-500">
                              {toRupiah(category.total)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-xs text-slate-500">
                              foo
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-xs text-slate-500">
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
