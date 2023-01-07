import {
  Session,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Database } from "../types/supabase";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function SetupPage({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user, session]);

  async function getPublicToken() {
    const response = await fetch("/api/getPublicToken");
    const jsonResponse = await response.json();
    return jsonResponse.data.access_token;
  }

  async function setupAndRedirectToBrickWidget() {
    const publicToken = await getPublicToken();
    window.location.assign(
      `https://cdn.onebrick.io/sandbox-widget/v1/?accessToken=${publicToken}&region=id&user_id=${user?.email}&redirect_url=${process.env.NEXT_PUBLIC_APP_URL}/api/saveUserAccessToken`
    );
  }

  return (
    <>
      <div className="min-h-full">
        {loading ? (
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
                    <h2 className="text-xl font-semibold underline underline-offset-2">
                      Bank accounts
                    </h2>
                    <button
                      type="button"
                      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={setupAndRedirectToBrickWidget}
                    >
                      Sync your bank accounts
                    </button>
                  </div>
                </div>
                {/* /End replace */}
              </div>
            </main>
          </div>
        )}
      </div>
    </>
  );
}
