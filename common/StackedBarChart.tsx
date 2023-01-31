import { useState } from "react";

export const StackedBarChart = ({ sessions }: any) => {
  return (
    <div className="relative overflow-hidden transition-all duration-500">
      <div className="pb-4 lg:pb-6">
        <div className="overflow-hidden rounded-full h-3 bg-slate-800 flex transition-all duration-500 w-full">
          {sessions.map((session: any) => {
            return (
              <div
                className={`h-full`}
                style={{
                  background: session.color,
                  width: `${session.size}%`,
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
