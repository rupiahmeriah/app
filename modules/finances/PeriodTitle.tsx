import { useState } from "react";

import Image from "next/image";

// include currentDate in props
const PeriodTitle = (
  {
    currentDate = new Date(),
    // add setCurrentDate to props. which is the set function from useState
    setCurrentDate = () => {},
  }: { currentDate: Date; setCurrentDate: (date: Date) => void } // add currentDate to props
) => {
  const latestDate = new Date();
  latestDate.setDate(1);
  latestDate.setMonth(latestDate.getMonth() - 1);

  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-center">
        <button
          className="flex-shrink-0 cursor-pointer"
          onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setMonth(newDate.getMonth() - 1);
            setCurrentDate(newDate);
          }}
        >
          <Image
            src="/left-carrot.svg"
            alt="left carrot for previous month"
            width={40}
            height={40}
          />
        </button>
        <button
          className="flex-shrink-0 cursor-pointer disabled:cursor-default disabled:opacity-50"
          disabled={currentDate >= latestDate}
          onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setMonth(newDate.getMonth() + 1);
            setCurrentDate(newDate);
          }}
        >
          <Image
            src="/right-carrot.svg"
            alt="right carrot for previous month"
            width={40}
            height={40}
          />
        </button>
        <div>
          <div className="flex items-center">
            <h1 className="ml-3 text-4xl font-bold leading-7 text-slate-900 sm:truncate sm:leading-9">
              {/* current Month in FullMonth FullYear format */}
              {currentDate.toLocaleString("default", {
                month: "long",
              })}{" "}
              {currentDate.getFullYear()}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodTitle;
