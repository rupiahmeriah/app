// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { createClient } from "@supabase/supabase-js";

import { Database } from "../../types/supabase";

type Data = string;

// [
//     {
//       'accessToken': 'access-sandbox-a2c56a90-d5ac-4636-ag5d-f021d1dc826s',
//       'bankId': '2',
//       'userId': '1234'
//     },
//   ]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method != "POST") {
    res.status(500).send("Error");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || "";

  const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

  const body = req.body;
  let jsonBody = body;
  jsonBody = jsonBody.map((item: any) => {
    return {
      user_id: item.userId,
      bank_id: item.bankId,
      access_token: item.accessToken,
    };
  });

  console.log("JSON boderino", jsonBody);

  const { data, error } = await supabase.from("user_banks").insert(jsonBody);

  if (error) {
    console.log(error);
    res.status(500).send("Error");
  }

  console.log("data:", JSON.stringify(data, null, 4));

  const upstashFetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      "Upstash-Forward-Content-Type": "application/json",
      "Upstash-Forward-Authorization": `Bearer ${NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    },
    body: {
      user_id: jsonBody[0].userId,
    },
  };

  fetch(
    "https://qstash.upstash.io/v1/publish/https://118c-45-8-25-64.ap.ngrok.io/functions/v1/populateBankConnection",
    upstashFetchOptions
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

  res.status(200).send(process.env.NEXT_PUBLIC_APP_URL || "");
}
