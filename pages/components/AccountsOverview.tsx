type UserBankDetailType = {
  balances_available: number;
  balances_current: number;
  user_id: string;
  account_id: string;
  account_holder: string;
  id: string;
  account_number: string;
  institutions: {
    name: string;
  };
};

export default function AccountsOverview({
  userBanks,
}: {
  userBanks: UserBankDetailType[];
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
      <h2 className="text-lg font-medium leading-6 text-gray-900">
        Accounts Overview
      </h2>
      <div className="mt-2">
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
                    <dt className="truncate text-sm font-medium text-gray-500">
                      {userBank.institutions.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {userBank.balances_current}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a
                  href={userBank.account_holder}
                  className="font-medium text-cyan-700 hover:text-cyan-900"
                >
                  View all
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
