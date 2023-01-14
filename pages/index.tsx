import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

import { supabase } from "../utils/supabaseClient";

import App from "./components/app";

const Login = ({ userBanks, transactions }: any) => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
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
