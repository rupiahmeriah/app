import { UserBankDetailType } from "../../types/highLevelTypes";
import { toRupiah } from "../../utils/toRupiah";

export default function AccountsOverview({
  userBanks,
}: {
  userBanks: UserBankDetailType[];
}) {
  return (
    <div className="mx-auto sm:px-6 lg:px-8 w-full">
      <div className="mt-2 bg-slate-100 p-4">
        <h2 className="mx-auto max-w-6xl px-4 text-sm text-center font-bold leading-6 text-slate-900 sm:px-6 lg:px-8">
          ACCOUNTS OVERVIEW
        </h2>
        <div className="w-full border-t border-slate-300 my-2" />

        {/* Card */}
        {userBanks?.map((userBank) => (
          <div
            key={userBank.institutions.name}
            className="overflow-hidden rounded-lg bg-white shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">{}</div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-slate-500">
                      {userBank.institutions.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-slate-900">
                        {toRupiah(userBank.balances_current)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-5 py-3">
              <div className="text-sm">
                <a
                  href={userBank.account_holder}
                  className="font-medium text-cyan-700 hover:text-cyan-900"
                >
                  View details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
