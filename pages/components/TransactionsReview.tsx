import { ScaleIcon } from "@heroicons/react/24/outline";

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
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
      <div className="mx-auto p-4 border text-center">
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          Review X Transactions
        </h2>
        <div className="ml-3">
          <p className="text-sm text-gray-500">
            Ensure your transactions are categorized properly.
          </p>
        </div>
      </div>
    </div>
  );
}
