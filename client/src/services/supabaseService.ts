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
  const today = new Date().toISOString().split('T')[0]
  
  // First try to get existing streak
  const { data: existing } = await supabase
    .from('streaks')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (!existing) {
    // First time - create new streak
    await supabase.from('streaks').insert({
      user_id: userId,
      last_visit: today,
      current_streak: 1,
      longest_streak: 1
    })
    return
  }

  const lastVisit = existing.last_visit
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  let newStreak = existing.current_streak

  if (lastVisit === today) {
    // Already visited today, do nothing
    return
  } else if (lastVisit === yesterdayStr) {
    // Visited yesterday, increment streak
    newStreak = existing.current_streak + 1
  } else {
    // Missed a day, reset streak
    newStreak = 1
  }

  await supabase.from('streaks').update({
    last_visit: today,
    current_streak: newStreak,
    longest_streak: Math.max(newStreak, existing.longest_streak)
  }).eq('user_id', userId)
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
