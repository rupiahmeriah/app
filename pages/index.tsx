import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";

import { supabase } from "../utils/supabaseClient";

import App from "./components/app";
import { Database } from "../types/supabase";

const Login = ({ userBanks, transactions }: any) => {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  return (
    <div className="py-10">
      {!session ? (
        <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={["google", "twitter"]}
            // redirectTo="https://localhost:3001"
          />
        </div>
      ) : (
        <App
          session={session}
          userBanks={userBanks}
          transactions={transactions}
        />
      )}
    </div>
  );
};

export async function getServerSideProps() {
  let { data: transactions } = await supabase
    .from("user_bank_transactions")
    .select();

  let { data } = await supabase.from("user_bank_details").select(`
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
      transactions,
    },
  };
}
export default Login;
