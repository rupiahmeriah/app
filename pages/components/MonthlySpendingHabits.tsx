import { useState } from "react";
import { StackedBarChart } from "./StackedBarChart";

export default function MonthlySpendingHabits() {
  const [sessions] = useState([
    {
      label: "Food",
      size: 60,
      color: "red",
    },
    {
      label: "Home, Auto",
      size: 30,
      color: "blue",
    },
    {
      label: "Shopping",
      size: 10,
      color: "green",
    },
  ]);

  return (
    <>
      <h2 className="mx-auto max-w-6xl px-4 text-sm text-center font-bold leading-6 text-slate-900 sm:px-6 lg:px-8">
        SPENDING BREAKDOWN
      </h2>
      <div className="w-full border-t border-gray-300 my-2" />
      <div>
        <div className="flex justify-between text-sm font-semibold">
          <h3 className="">INCOME</h3>
          <h3>IDR 4,500.00</h3>
        </div>
        <StackedBarChart sessions={sessions} />
      </div>

      <div>
        <div className="flex justify-between text-sm  font-semibold">
          <h3>EXPENSES</h3>
          <h3>
            IDR 735.056.59 /{" "}
            <span className="text-slate-400">IDR 750.500.30</span>
          </h3>
        </div>
        <StackedBarChart sessions={sessions} />
      </div>

      <div>
        <div className="flex flex-col">INCOME</div>
        <div className="flex flex-col">EXPENSES</div>
      </div>
    </>
  );
}
