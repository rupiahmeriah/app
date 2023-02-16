// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

import fetch from "node-fetch";

const getDateTime = () => {
  const currentDate = new Date();
  // get the date and time components
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  let hours: string | number = currentDate.getHours();
  hours = String(hours >= 12 ? hours % 12 : hours).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const datetime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

  return datetime;
};

export const generateSignature = async () => {
  const datetime = getDateTime();

  const clientId = process.env.FINANTIER_CLIENT_ID || "clientIdEnvNotSet";
  const apiKey = process.env.FINANTIER_API_KEY || "apiKeyEnvNotSet";

  console.log(clientId);
  console.log(apiKey);

  const utf8Message = Buffer.from(`${clientId}:${apiKey}`);

  // convert the UTF-8 data to base64
  const key = utf8Message.toString("base64");

  const hmac = crypto.createHmac("sha256", key);
  hmac.update(clientId + datetime);
  const signature = hmac.digest("hex");

  return {
    signature,
    datetime,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const reqData = req.body;

  // validate if reqData has req_id, is_successful fields and that is_successful is true
  // if not, return 400
  if (!reqData.req_id || !reqData.is_successful) {
    res.status(400).json({
      status: 400,
      message: "Bad request",
    });
    return;
  }
  const clientId = process.env.FINANTIER_CLIENT_ID || "clientIdEnvNotSet";
  const apiKey = process.env.FINANTIER_API_KEY || "apiKeyEnvNotSet";

  const { signature, datetime } = await generateSignature();

  console.log("signature", signature);
  console.log("datetime", datetime);

  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", apiKey);
  myHeaders.append("datetime", datetime);
  myHeaders.append("signature", signature);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("X-Client-ID", clientId);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    // redirect: "follow",
  };

  const generateTokenResponse = await fetch(
    "https://api.ftier.io/auth/v1/generate-token",
    requestOptions
  )
    .then((response) => {
      console.log(response.status);
      return response;
    })
    .then((response) => response.text())
    .catch((error) => console.log("error", error));

  // const generateTokenResponse = `{
  //   "success":true,
  //   "message":"success",
  //   "data":{
  //     "type":"Bearer",
  //     "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzY2MTMwNDYsImlzcyI6ImZpbmFudGllckF1dGhTZXJ2aWNlIiwiVXNlcklEIjo2NywiQXBwSUQiOjE0MywiQ2xpZW50SUQiOjkzLCJYQ2xpZW50SUQiOiJydXBpYWhtZXJpYWgjMSIsIlNvdXJjZSI6IkFQSSIsIkFwcElEcyI6bnVsbH0.Y5G8Qw0K6zmRpydnuS9M-erzMr0sdFlUtZw-43GwL64",
  //     "expire_at":"2023-02-17T05:50:46.03942446Z"
  //   }
  // }`;

  if (!generateTokenResponse) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
    return;
  }

  console.log("token cockeroily", generateTokenResponse);

  const generateTokenResponseJson = JSON.parse(generateTokenResponse);
  const token = generateTokenResponseJson.data.token;

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "supabaseUrlEnvNotSet";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "supabaseAnonKeyEnvNotSet";

  console.log("token", token);

  const response = await fetch(
    `${supabaseUrl}/functions/v1/populateBankConnection`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        token: generateTokenResponseJson.data.token,
        req_id: reqData.req_id,
        consumer_id: reqData.consumer_id,
        account_number: reqData.account_number,
      }),
    }
  );

  const body = (await response.json()) as any;

  console.log(body);

  res.status(200).json({
    // token: "foo",
    token: generateTokenResponse,
  });
  // res.status(200).json({
  //   ...body,
  //   message: reqData.message,
  // });
}
