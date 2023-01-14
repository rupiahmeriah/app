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
          category: string | null
          created_at: string | null
          date: string
          description: string | null
          direction: string
          id: number
          reference_id: string | null
          status: string
          user_bank_id: string
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          direction: string
          id?: number
          reference_id?: string | null
          status: string
          user_bank_id: string
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          direction?: string
          id?: number
          reference_id?: string | null
          status?: string
          user_bank_id?: string
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

