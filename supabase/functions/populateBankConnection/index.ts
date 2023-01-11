// deno-lint-ignore-file no-explicit-any
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { populateBrickData } from "../utils/populateBrickData.ts";

import { Database } from "../types/supabase.ts";
import { corsHeaders } from "../_shared/cors.ts";

console.log(`Functioniss "select-from-table-with-auth-rls" up and running!`);

serve(async (req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient<Database>(
      // Supabase API URL - env var exported by default.
      Deno.env.get("SUPABASE_URL") ?? "",
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""

      // // Create client with Auth context of the user that called the function.
      // // This way your row-level-security (RLS) policies are applied.
      // {
      //   global: {
      //     headers: { Authorization: req.headers.get("Authorization")! },
      //   },
      // }
    );

    const body = await req.json();

    console.log("bodybody", JSON.stringify(body, null, 4));

    if (!body.user_id) {
      return new Response(JSON.stringify({ error: "no user_id" }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      });
    }

    // And we can run queries in the context of our authenticated user
    const { data: userBanks, error } = await supabaseClient
      .from("user_banks")
      .select("*")
      .eq("user_id", body.user_id);

    console.log("coq", userBanks);

    if (error) {
      throw error;
    }

    if (!userBanks) {
      return new Response(JSON.stringify({ error: "no user_bank" }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      });
    }

    const populateBrickDataCalls = userBanks.map((userBank) => {
      return populateBrickData(
        supabaseClient,
        body.user_id,
        userBank.access_token,
        userBank.id
      );
    });

    try {
      await Promise.all(populateBrickDataCalls);
    } catch (error) {
      console.log("error", error);
    }

    return new Response(JSON.stringify({ data: userBanks }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
});

// To invoke:
// curl -L -X POST 'http://localhost:54321/functions/v1/populateBankConnection' \
// -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
// --data '{"name":"Functions"}'
