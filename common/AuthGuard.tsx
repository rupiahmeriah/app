import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import App from "next/app";
import { Database } from "../types/supabase";

interface MyComponentProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<MyComponentProps> = (props) => {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

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
        props.children
      )}
    </div>
  );
};
