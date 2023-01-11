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
      user_banks: {
        Row: {
          access_token: string
          bank_id: number
          bank_name: string | null
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          access_token: string
          bank_id: number
          bank_name?: string | null
          created_at?: string | null
          id: string
          user_id: string
        }
        Update: {
          access_token?: string
          bank_id?: number
          bank_name?: string | null
          created_at?: string | null
          id?: string
          user_id?: string
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

