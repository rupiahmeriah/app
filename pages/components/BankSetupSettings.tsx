import { toRupiah } from "../../utils/toRupiah";

export function BankSetupSettings({ userBanks }: any) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {userBanks?.map((bank: any) => (
        <li
          key={bank.account_id}
          className="col-span-1 divide-y divide-slate-200 rounded-lg bg-white shadow"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-slate-900">
                  {bank.institutions.name}
                </h3>
                <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  {bank.account_number}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-slate-500">
                {toRupiah(bank.balances_available)}
              </p>
            </div>
            {/* <img className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-300" src={logo} alt="" /> */}
          </div>
          <div className="flex gap-1 m-2 justify-between">
            <button className="bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-2 px-4 rounded">
              Sync Now
            </button>
            <button className="bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold py-2 px-4 rounded">
              Remove Account
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
