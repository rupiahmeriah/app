import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

import { supabase } from "../utils/supabaseClient";

import App from "./components/app";

const Login = ({ userBanks, transactions }: any) => {
  const session = useSession();
  const supabase = useSupabaseClient();

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

// export const handleAuthProvider = async (ctx: GetServerSidePropsContext) => {
//   // Check if we have a session
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session) {
//     return null;
//   }

//   // Retrieve provider_token & logged in user's third-party id from metadata
//   const { provider_token, user } = session
//   const userId = user.user_metadata.user_name

//   const allRepos = await (
//     await fetch(`https://api.github.com/search/repositories?q=user:${userId}`, {
//       method: 'GET',
//       headers: {
//         Authorization: `token ${provider_token}`,
//       },
//     })
//   ).json()

//   return { props: { user, allRepos } }
// }

export default Login;
