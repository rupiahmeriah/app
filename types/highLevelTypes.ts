export type UserBankDetailType = {
  balances_available: number;
  balances_current: number;
  user_id: string;
  account_id: string;
  account_holder: string;
  id: string;
  account_number: string;
  institutions: {
    name: string;
  };
};

export type UserTransactionType = {
  amount: number;
  brick_category: string | null;
  created_at: string | null;
  date: string;
  description: string | null;
  direction: string;
  id: number;
  recurring_id: number | null;
  reference_id: string | null;
  status: string;
  user_id: string;
  user_categories: {
    name: string;
  } | null;
  user_bank_id: {
    bank_id: {
      name: string;
    } | null;
  } | null;
};
