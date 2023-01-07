// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = string;

// [
//     {
//       'accessToken': 'access-sandbox-a2c56a90-d5ac-4636-ag5d-f021d1dc826s',
//       'bankId': '2',
//       'userId': '1234'
//     },
//     {
//       'accessToken': 'access-sandbox-02181f91-3945-414s-bf34-f44564e97d4s',
//       'bankId': '14',
//       'userId': '1234'
//     }
//   ]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method != "POST") {
    res.status(500).send("Error");
  }

  const body = req.body;

  console.log(body);

  res.status(200).send(process.env.NEXT_PUBLIC_APP_URL || "");
}
