import {
  useSessionContext,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { UserBankDetailType } from "../types/highLevelTypes";

import { supabase as supabaseClient } from "../utils/supabaseClient";
import { BankSetupSettings } from "./components/BankSetupSettings";

export async function getServerSideProps() {
  let { data } = await supabaseClient.from("user_bank_details").select(`
    balances_available,
    balances_current,
    user_id,
    account_id,
    account_holder,
    id,
    account_number,
    institutions (
      name
    )
  `);

  return {
    props: {
      userBanks: data,
    },
  };
}

export default function SetupPage({
  userBanks,
}: {
  userBanks: UserBankDetailType[];
}) {
  const session = useSessionContext();
  const supabase = useSupabaseClient();

  const user = useUser();

  async function getPublicToken() {
    const response = await fetch("/api/getPublicToken");
    const jsonResponse = await response.json();
    return jsonResponse.data.access_token;
  }

  async function setupAndRedirectToBrickWidget() {
    const publicToken = await getPublicToken();
    const redirectUrl = process.env.URL || process.env.NEXT_PUBLIC_URL;
    const finalUrl = `https://cdn.onebrick.io/sandbox-widget/v1/?accessToken=${publicToken}&region=id&user_id=${user?.id}&redirect_url=${redirectUrl}/api/saveUserAccessToken`;
    window.location.assign(finalUrl);
  }

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      ) : (
        <div className="min-h-full">
          {session.isLoading ? (
            "Loading"
          ) : (
            <div className="py-10">
              <header>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                    Setup
                  </h1>
                </div>
              </header>
              <main>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  {/* Replace with your content */}
                  <div className="px-4 py-8 sm:px-0">
                    <div>
                      <button
                        type="button"
                        className="mt-4 inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        onClick={setupAndRedirectToBrickWidget}
                      >
                        Sync your bank accounts
                      </button>
                    </div>

                    <div className="mt-10">
                      <h2 className="text-xl font-semibold underline underline-offset-4 mb-2">
                        Bank accounts
                      </h2>

                      <BankSetupSettings userBanks={userBanks} />
                    </div>
                  </div>
                  {/* /End replace */}
                </div>
              </main>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
