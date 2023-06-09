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
      city: {
        Row: {
          city_name: string
          id: number
        }
        Insert: {
          city_name: string
          id?: number
        }
        Update: {
          city_name?: string
          id?: number
        }
      }
      temperature: {
        Row: {
          id: number
          location: number
          temperature: number
          time: number
        }
        Insert: {
          id?: number
          location: number
          temperature: number
          time: number
        }
        Update: {
          id?: number
          location?: number
          temperature?: number
          time?: number
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
