export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      institutions: {
        Row: {
          automatic_verification: boolean | null
          bank_code: string | null
          country_code: string | null
          country_name: string | null
          created_at: string | null
          id: number
          institution_type: string | null
          logo: string | null
          name: string | null
          passbook_verification: boolean | null
          pdf_verification: boolean | null
          primary_color: string | null
        }
        Insert: {
          automatic_verification?: boolean | null
          bank_code?: string | null
          country_code?: string | null
          country_name?: string | null
          created_at?: string | null
          id?: number
          institution_type?: string | null
          logo?: string | null
          name?: string | null
          passbook_verification?: boolean | null
          pdf_verification?: boolean | null
          primary_color?: string | null
        }
        Update: {
          automatic_verification?: boolean | null
          bank_code?: string | null
          country_code?: string | null
          country_name?: string | null
          created_at?: string | null
          id?: number
          institution_type?: string | null
          logo?: string | null
          name?: string | null
          passbook_verification?: boolean | null
          pdf_verification?: boolean | null
          primary_color?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      user_bank_details: {
        Row: {
          account_holder: string
          account_id: string
          account_number: string | null
          balances_available: number
          balances_current: number
          bank_id: number | null
          created_at: string | null
          id: string
          institution_type: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_holder?: string
          account_id?: string
          account_number?: string | null
          balances_available: number
          balances_current: number
          bank_id?: number | null
          created_at?: string | null
          id: string
          institution_type?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_holder?: string
          account_id?: string
          account_number?: string | null
          balances_available?: number
          balances_current?: number
          bank_id?: number | null
          created_at?: string | null
          id?: string
          institution_type?: string | null
          updated_at?: string | null
          user_id?: string
        }
      }
      user_bank_tokens: {
        Row: {
          access_token: string
          bank_id: number
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          access_token: string
          bank_id: number
          created_at?: string | null
          id: string
          user_id: string
        }
        Update: {
          access_token?: string
          bank_id?: number
          created_at?: string | null
          id?: string
          user_id?: string
        }
      }
      user_bank_transactions: {
        Row: {
          amount: number
          brick_category: string | null
          category_id: number | null
          created_at: string | null
          date: string
          description: string | null
          direction: string
          id: number
          reference_id: string | null
          status: string
          user_bank_id: string
          user_budget_id: number | null
        }
        Insert: {
          amount: number
          brick_category?: string | null
          category_id?: number | null
          created_at?: string | null
          date: string
          description?: string | null
          direction: string
          id?: number
          reference_id?: string | null
          status: string
          user_bank_id: string
          user_budget_id?: number | null
        }
        Update: {
          amount?: number
          brick_category?: string | null
          category_id?: number | null
          created_at?: string | null
          date?: string
          description?: string | null
          direction?: string
          id?: number
          reference_id?: string | null
          status?: string
          user_bank_id?: string
          user_budget_id?: number | null
        }
      }
      user_budget: {
        Row: {
          budget: number | null
          category_id: number | null
          created_at: string | null
          current_difference: number | null
          current_total: number | null
          id: number
          month: number | null
          year: number | null
        }
        Insert: {
          budget?: number | null
          category_id?: number | null
          created_at?: string | null
          current_difference?: number | null
          current_total?: number | null
          id?: number
          month?: number | null
          year?: number | null
        }
        Update: {
          budget?: number | null
          category_id?: number | null
          created_at?: string | null
          current_difference?: number | null
          current_total?: number | null
          id?: number
          month?: number | null
          year?: number | null
        }
      }
      user_categories: {
        Row: {
          created_at: string | null
          description: string | null
          exclude_from_budget: boolean | null
          exclude_from_totals: boolean | null
          id: number
          name: string | null
          treat_as_income: boolean | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          exclude_from_budget?: boolean | null
          exclude_from_totals?: boolean | null
          id?: number
          name?: string | null
          treat_as_income?: boolean | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          exclude_from_budget?: boolean | null
          exclude_from_totals?: boolean | null
          id?: number
          name?: string | null
          treat_as_income?: boolean | null
        }
      }
      user_period_summary: {
        Row: {
          created_at: string | null
          current_budget: number | null
          id: number
          net_income: number | null
          other_expenses: number | null
          other_income: number | null
          projected_expenses: number | null
          recurring_expenses: number | null
          recurring_income: number | null
          remaining_recurring_expense: number | null
          total_budgeted: number | null
          total_expenses: number | null
          total_income: number | null
        }
        Insert: {
          created_at?: string | null
          current_budget?: number | null
          id?: number
          net_income?: number | null
          other_expenses?: number | null
          other_income?: number | null
          projected_expenses?: number | null
          recurring_expenses?: number | null
          recurring_income?: number | null
          remaining_recurring_expense?: number | null
          total_budgeted?: number | null
          total_expenses?: number | null
          total_income?: number | null
        }
        Update: {
          created_at?: string | null
          current_budget?: number | null
          id?: number
          net_income?: number | null
          other_expenses?: number | null
          other_income?: number | null
          projected_expenses?: number | null
          recurring_expenses?: number | null
          recurring_income?: number | null
          remaining_recurring_expense?: number | null
          total_budgeted?: number | null
          total_expenses?: number | null
          total_income?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

