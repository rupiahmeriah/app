// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

import { Database } from "../../types/supabase";

type Data = {
  status: number;
  message: string;
  data: {
    id: number;
    name: string;
    bank_code: string;
    country_code: string;
    country_name: string;
    primary_color?: string;
    logo?: string;
    isOcrActive: boolean;
    automatic_verification: boolean;
    pdf_verification: boolean;
    passbook_verification: boolean;
    institution_type: string;
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method != "POST") {
    res.status(500).send({
      status: 500,
      message: "Method not allowed",
      data: [],
    });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || "";

  const username = process.env.BRICK_USERNAME || "usernameEnvNotSet";
  const password = process.env.BRICK_PASSWORD || "passwordEnvNotSet";
  const publicTokenResponse = await fetch(
    "https://sandbox.onebrick.io/v1/auth/token",
    {
      headers: {
        Authorization: `Basic  ${Buffer.from(
          username + ":" + password
        ).toString("base64")}`,
      },
    }
  );

  const publicToken = (await publicTokenResponse.json()) as {
    status: number;
    message: string;
    data: {
      access_token: string;
      primary_color: string;
    };
  };

  const response = await fetch(
    "https://sandbox.onebrick.io/v1/institution/list",
    {
      headers: {
        Authorization: `Bearer ${publicToken.data.access_token}`,
      },
    }
  );

  const body = (await response.json()) as Data;

  const supabaseClient = createClient<Database>(
    supabaseUrl,
    supabaseServiceKey
  );

  const insertInstitutions = body.data.map((institution) => {
    return supabaseClient.from("institutions").upsert({
      id: institution.id,
      name: institution.name,
      bank_code: institution.bank_code,
      country_code: institution.country_code,
      country_name: institution.country_name,
      primary_color: institution.primary_color,
      logo: institution.logo,
      automatic_verification: institution.automatic_verification,
      pdf_verification: institution.pdf_verification,
      passbook_verification: institution.passbook_verification,
      institution_type: institution.institution_type,
    });
  });

  try {
    const results = await Promise.all(insertInstitutions);

    results.forEach((result: any) => {
      if (result.error) {
        throw result.error;
      }
    });
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }

  res.status(200).send(body);
}
