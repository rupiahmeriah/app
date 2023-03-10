import { BanknotesIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { SlideOvers } from "../../../../common/SlideOvers";
import { UserTransactionType } from "../../../../types/highLevelTypes";
import { classNames } from "../../../../utils/classNames";
import EditTransaction from "./EditTransaction";

export const Transactions = ({
  transactions = [],
}: {
  transactions: UserTransactionType[] | undefined;
}) => {
  const [toggleSlideOver, setToggleSlideOver] = useState(false);
  const [focusedTransaction, setFocusedTransaction] = useState<
    UserTransactionType | undefined
  >();

  return (
    <div>
      {
        // Slide over
        toggleSlideOver && (
          <div className="absolute inset-0 overflow-hidden">
            <SlideOvers
              title={"Edit Transaction"}
              open={toggleSlideOver}
              setOpen={setToggleSlideOver}
            >
              <EditTransaction focusedTransaction={focusedTransaction} />
            </SlideOvers>
          </div>
        )
      }
      <div>
        <h3 className="mx-auto mt-4 max-w-6xl px-4 text-md font-medium leading-6 text-slate-600 sm:px-6 lg:px-8">
          Total Expenses
        </h3>
      </div>
      {/* Activity list (smallest breakpoint only) */}
      <div className="shadow sm:hidden">
        <ul
          role="list"
          className="mt-2 divide-y divide-slate-200 overflow-hidden shadow sm:hidden"
        >
          {transactions?.slice(0, 10).map((transaction: any) => (
            <li key={transaction.id}>
              <a
                href={transaction.direction}
                className="block bg-white px-4 py-4 hover:bg-slate-50"
              >
                <span className="flex items-center space-x-4">
                  <span className="flex flex-1 space-x-2 truncate">
                    <BanknotesIcon
                      className="h-5 w-5 flex-shrink-0 text-slate-400"
                      aria-hidden="true"
                    />
                    <span className="flex flex-col truncate text-sm text-slate-500">
                      <span className="truncate">
                        {transaction.description}
                      </span>
                      <span>
                        <span className="font-medium text-slate-900">
                          {transaction.amount}
                        </span>{" "}
                      </span>
                      <time dateTime={transaction.datetime}>
                        {transaction.date}
                      </time>
                    </span>
                  </span>
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-slate-400"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <nav
          className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3"
          aria-label="Pagination"
        >
          <div className="flex flex-1 justify-between">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-500"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-500"
            >
              Next
            </a>
          </div>
        </nav>
      </div>

      {/* Activity table (small breakpoint and up) */}
      <div className="hidden sm:block">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-2 flex flex-col">
            <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-slate-200">
                <thead>
                  <tr>
                    <th
                      className="bg-slate-50 px-6 py-3 text-right text-sm font-semibold text-slate-900"
                      scope="col"
                    >
                      Date
                    </th>
                    <th
                      className="bg-slate-50 px-6 py-3 text-right text-sm font-semibold text-slate-900"
                      scope="col"
                    >
                      Category
                    </th>
                    <th
                      className="bg-slate-50 px-6 py-3 text-left text-sm font-semibold text-slate-900"
                      scope="col"
                    >
                      Transaction
                    </th>
                    <th
                      className="bg-slate-50 px-6 py-3 text-right text-sm font-semibold text-slate-900"
                      scope="col"
                    >
                      Amount
                    </th>
                    <th
                      className="hidden bg-slate-50 px-6 py-3 text-left text-sm font-semibold text-slate-900 md:block"
                      scope="col"
                    >
                      Direction
                    </th>
                    <th
                      className="bg-slate-50 px-6 py-3 text-right text-sm font-semibold text-slate-900"
                      scope="col"
                    >
                      Account
                    </th>
                    <th
                      className="bg-slate-50 px-6 py-3 text-right text-sm font-semibold text-slate-900"
                      scope="col"
                    >
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {transactions.slice(0, 100).map((transaction) => (
                    <tr key={transaction.id} className="bg-white">
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-500">
                        <time dateTime={transaction.date}>
                          {transaction.date}
                        </time>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-center text-sm text-slate-500">
                        {transaction.user_categories
                          ? transaction.user_categories.name
                          : "-"}
                      </td>
                      <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                        <div className="flex">
                          <a className="group inline-flex space-x-2 truncate text-sm">
                            <BanknotesIcon
                              className="h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-slate-500"
                              aria-hidden="true"
                            />
                            <p className="truncate text-slate-500 group-hover:text-slate-900">
                              {transaction.description}
                            </p>
                          </a>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-500">
                        <span className="font-medium text-slate-900">
                          {transaction.amount}
                        </span>
                        {/* {transaction.currency} */}
                      </td>
                      <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-slate-500 md:block">
                        <span
                          className={classNames(
                            // statusStyles[transaction.status],
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                          )}
                        >
                          {transaction.direction}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-500">
                        {transaction.user_bank_id?.bank_id?.name}
                      </td>
                      <td className=" bg-slate-100 whitespace-nowrap  text-right text-sm text-slate-500">
                        <button
                          className="px-6 py-4 text-slate-400 hover:text-slate-500 text-lg"
                          onClick={() => {
                            setToggleSlideOver(true);
                            setFocusedTransaction(transaction);
                          }}
                        >
                          {`>`}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <nav
                className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 sm:px-6"
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-slate-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">10</span> of{" "}
                    <span className="font-medium">20</span> results
                  </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Next
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
