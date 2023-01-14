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
