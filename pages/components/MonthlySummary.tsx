import { PlusIcon, ScaleIcon } from "@heroicons/react/24/outline";
import { toRupiah } from "../../utils/toRupiah";

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Finances", href: "#", current: false },
  { name: "Setup", href: "#", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div className="mx-auto max-w-6xl py-4 px-4 sm:px-6 lg:px-8 w-full">
      <div className="mt-2">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <h2 className="text-lg font-medium leading-6 text-slate-600">
            This Month's Summary
          </h2>
          <Card title="Total Budgeted" value={5450333} />
          <Card title="Current Budget" value={3450333} />
          {/* tailwind insert line divider */}

          <Divider />

          <Card title="Income" value={1000000} />
          <Card title="Expenses" value={-135000} />

          <Divider />

          <Card title="Net income" value={4300234} />
        </div>
      </div>
    </div>
  );
}

const Card = ({ title, value }: { title: string; value: number }) => {
  return (
    <div className="p-5">
      <div className="items-center">
        <dl className="flex justify-between">
          <dt className="truncate text-md font-medium text-gray-500">
            <a href="#" className="text-cyan-600">
              {title}
            </a>
          </dt>
          <dd>
            <div className="text-md font-medium text-gray-900">
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
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-200 mx-4" />
      </div>
    </div>
  );
};
