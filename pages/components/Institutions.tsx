import { ScaleIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Finances", href: "#", current: false },
  { name: "Setup", href: "#", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const cards = [
  {
    name: "BCA",
    type: "Bank",
    href: "#",
    icon: ScaleIcon,
    amount: "$30,659.45",
  },
  {
    name: "Tokopedia",
    type: "ECommerce",
    href: "#",
    icon: ScaleIcon,
    amount: "$30,659.45",
  },
];

export default function Example() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
      <h2 className="text-lg font-medium leading-6 text-gray-900">
        Institution
      </h2>
      <div className="mt-2 border">
        <ul role="list" className="divide-y divide-gray-200">
          {cards.map((card) => (
            <li key={card.name} className="flex py-4">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{card.name}</p>
                <p className="text-sm text-gray-500">{card.type}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
