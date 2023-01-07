// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import fetch from "node-fetch";

type Data = {
  status: number;
  message: string;
  data: {
    access_token: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const username = process.env.BRICK_USERNAME || "usernameEnvNotSet";
  const password = process.env.BRICK_PASSWORD || "passwordEnvNotSet";

  const response = await fetch("https://sandbox.onebrick.io/v1/auth/token", {
    headers: {
      Authorization: `Basic  ${Buffer.from(username + ":" + password).toString(
        "base64"
      )}`,
    },
  });

  const body = (await response.json()) as Data;

  console.log(body);

  res.status(200).json(body);
}
