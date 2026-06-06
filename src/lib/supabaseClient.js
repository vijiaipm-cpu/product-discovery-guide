import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock client if env vars are not set (for demo purposes)
let supabase

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  // Mock client for demo — replace with real Supabase credentials
  supabase = {
    from: (table) => ({
      insert: async (data) => {
        console.log(`[Supabase Mock] INSERT into ${table}:`, data)
        return { data, error: null }
      },
      select: async () => {
        return { data: [], error: null }
      },
      upsert: async (data) => {
        console.log(`[Supabase Mock] UPSERT into ${table}:`, data)
        return { data, error: null }
      },
    }),
  }
}

export { supabase }

// Helper: save exercise (problem statement)
export async function saveExercise(problemStatement) {
  return supabase.from('exercises').insert({
    problem_statement: problemStatement,
    created_at: new Date().toISOString(),
  })
}

// Helper: save section progress
export async function saveProgress(userSession, section) {
  return supabase.from('progress').insert({
    user_session: userSession,
    section,
    completed: true,
    created_at: new Date().toISOString(),
  })
}
