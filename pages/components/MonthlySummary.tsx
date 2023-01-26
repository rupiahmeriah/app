import { useEffect, useState } from "react";

import Image from "next/image";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";

import { Database } from "../../types/supabase";
import { toRupiah } from "../../utils/toRupiah";

export default function MonthlySummary() {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);

  const [spendingBreakdown, setSpendingBreakdown] =
    useState<Database["public"]["Tables"]["user_period_summary"]["Row"]>();

  useEffect(() => {
    if (user) {
      getUserMonthlySummary();
    }
  }, [session, user]);

  async function getUserMonthlySummary() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("user_period_summary")
        .select()
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log(data);
        setSpendingBreakdown(data);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl py-4 px-4 sm:px-6 lg:px-8 w-full">
      <div className="mt-2">
        <div className="overflow-hidden rounded-lg  shadow bg-slate-100 p-4">
          <h2 className="mx-auto max-w-6xl px-4 text-sm text-center font-bold leading-6 text-slate-900 sm:px-6 lg:px-8">
            THIS MONTH'S SUMMARY
          </h2>
          <div className="w-full border-t border-gray-400 my-2" />

          <Card
            title="Total Budgeted"
            value={spendingBreakdown?.total_budget ?? 0}
          />
          <Card
            title="Current Budget"
            value={spendingBreakdown?.current_budget ?? 0}
          />
          {/* tailwind insert line divider */}

          <Divider />

          <Card
            title="Total Income"
            value={spendingBreakdown?.total_income ?? 0}
          />
          <SubCard
            title="Recurring Income"
            value={spendingBreakdown?.recurring_income ?? 0}
          />
          <SubCard
            title="Other Income"
            value={spendingBreakdown?.other_income ?? 0}
          />

          <Card
            title="Total Expenses"
            value={spendingBreakdown?.total_expenses ?? 0}
          />
          <SubCard
            title="Recurring Expenses"
            value={spendingBreakdown?.recurring_expenses ?? 0}
          />
          <SubCard
            title="Other Expenses"
            value={spendingBreakdown?.other_expenses ?? 0}
          />

          <Divider />

          <Card
            title="Etsd. Net Worth"
            value={spendingBreakdown?.net_income ?? 0}
          />
        </div>
      </div>
    </div>
  );
}

const Card = ({ title, value = 0 }: { title: string; value: number }) => {
  return (
    <div className="px-3 pt-2 text-sm">
      <div className="items-center">
        <dl className="flex justify-between">
          <dt className="truncate text-md font-medium text-slate-500">
            <a href="#" className="text-cyan-600">
              {title}
            </a>
          </dt>
          <dd className="ml-2">
            <div className="text-md font-medium text-slate-700">
              {toRupiah(value)}
            </div>
          </dd>
        </dl>
      </div>
    </div>
  );
};

const SubCard = ({ title, value = 0 }: { title: string; value: number }) => {
  return (
    <div className="px-3 pt-2 ml-4 text-sm">
      <div className="items-center">
        <dl className="flex justify-between">
          <dt className="flex gap-2 truncate text-md font-medium text-slate-500">
            <span className="">
              <Image
                src="/right-angle-arrow.svg"
                alt="right angle hierarchy arrow"
                width={15}
                height={15}
              />
            </span>
            <a href="#" className="text-cyan-700">
              {title}
            </a>
          </dt>
          <dd className="ml-2">
            <div className="text-md font-medium text-slate-700">
              {toRupiah(value)}
            </div>
          </dd>
        </dl>
      </div>
    </div>
  );
};

const Divider = () => {
  return (
    <div className="relative pt-2">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-slate-400 mx-4" />
      </div>
    </div>
  );
};
