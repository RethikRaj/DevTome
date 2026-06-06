import { supabase } from '@/lib/supabase'
import type { Progress, Streak } from '@/types'

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  return { session, error }
}

export async function markArticleComplete(articleId: string) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: new Error('User not authenticated') }

  const { data, error } = await supabase
    .from('progress')
    .upsert({
      user_id: user.id,
      article_id: articleId,
      completed: true,
      completed_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id,article_id'
    })

  return { data, error }
}

export async function getProgress(userId: string): Promise<Progress[]> {
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', userId)
    .eq('completed', true)

  if (error) throw error
  return data || []
}

export async function updateStreak(userId: string) {
  const { data: existingStreak } = await supabase
    .from('streaks')
    .select('*')
    .eq('user_id', userId)
    .single()

  const today = new Date().toISOString().split('T')[0]
  const lastVisit = existingStreak?.last_visit ? new Date(existingStreak.last_visit).toISOString().split('T')[0] : null

  let currentStreak = existingStreak?.current_streak || 0
  let longestStreak = existingStreak?.longest_streak || 0

  if (lastVisit === today) {
    // Already visited today, no change
    return { data: existingStreak, error: null }
  }

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  if (lastVisit === yesterdayStr) {
    // Consecutive day, increment streak
    currentStreak += 1
  } else if (lastVisit !== today) {
    // Streak broken or first visit
    currentStreak = 1
  }

  if (currentStreak > longestStreak) {
    longestStreak = currentStreak
  }

  const { data, error } = await supabase
    .from('streaks')
    .upsert({
      user_id: userId,
      last_visit: new Date().toISOString(),
      current_streak: currentStreak,
      longest_streak: longestStreak,
    }, {
      onConflict: 'user_id'
    })

  return { data, error }
}

export async function getStreak(userId: string): Promise<Streak | null> {
  const { data, error } = await supabase
    .from('streaks')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) return null
  return data
}
