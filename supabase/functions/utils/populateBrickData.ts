// deno-lint-ignore-file no-explicit-any

import SupabaseClient from "https://esm.sh/v102/@supabase/supabase-js@2.4.0/dist/module/SupabaseClient";

import { Database } from "../types/supabase.ts";

export const populateBrickData = async (
  supabaseClient: SupabaseClient<Database>,
  userId: string,
  accessToken: string,
  userBankId: string
) => {
  // const bankDetailResponse = await fetch(
  //   "https://sandbox.onebrick.io/v1/account/fulldetail",
  //   {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${userBanks[0].access_token}`,
  //     },
  //   }
  // );
  const bankDetailResponse = {
    json() {
      return {
        status: 200,
        message: "OK",
        data: [
          {
            email: null,
            phoneNumber: null,
            address: null,
            ktpNumber: null,
            accountId: "xlZJTl5AgmL5VZLUTX7-ww==",
            accountHolder: "Egan Gumiwang Prat",
            accountNumber: "6044153127",
            balances: {
              available: 4460439.59,
              current: 4460439.59,
              limit: null,
            },
            currency: "IDR",
            type: null,
          },
        ],
      };
    },
  };

  const bankDetailJson = await bankDetailResponse.json();

  console.log("ONEBRICK_RESPONSE FULLDETAIL", bankDetailJson);

  const insertUserBankDetails = bankDetailJson.data.map((accountDetail) => {
    return supabaseClient.from("user_bank_details").upsert({
      id: `${userId}-${accessToken}`,
      user_id: userId,
      account_id: accountDetail.accountId,
      account_holder: accountDetail.accountId,
      account_number: accountDetail.accountNumber,
      balances_available: accountDetail.balances.available,
      balances_current: accountDetail.balances.current,
    });
  });

  try {
    const results = await Promise.all(insertUserBankDetails);

    results.forEach((result: any) => {
      if (result.error) {
        throw result.error;
      }
    });
  } catch (error) {
    console.log("ERROR", error);
  }

  const bankTransactionsResponse = await fetch(
    `https://sandbox.onebrick.io/v1/transaction/list?from=${"2022-11-29"}&to=${"2023-01-20"}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const bankTransactionJson: {
    status: number;
    message: string;
    data: {
      date: string;
      amount: number;
      description: string;
      status: string;
      direction: string;
      reference_id: string;
      category: string;
    }[];
  } = await bankTransactionsResponse.json();

  console.log("ONEBRICK_RESPONSE TRANSACTIONS", bankTransactionJson);

  const insertUserBankTransactions = bankTransactionJson.data.map(
    (transaction) => {
      return supabaseClient.from("user_bank_transactions").upsert({
        user_bank_id: userBankId,
        date: transaction.date,
        amount: transaction.amount,
        description: transaction.description,
        status: transaction.status,
        direction: transaction.direction,
        reference_id: transaction.reference_id,
        category: transaction.category,
      });
    }
  );

  try {
    const results = await Promise.all(insertUserBankTransactions);

    results.forEach((result: any) => {
      if (result.error) {
        throw result.error;
      }
    });
  } catch (error) {
    console.log("ERROR", error);
  }
};
