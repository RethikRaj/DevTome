import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'

export function useStreak() {
  const { user } = useAuth()
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      updateStreak()
    } else {
      setCurrentStreak(0)
      setLongestStreak(0)
      setLoading(false)
    }
  }, [user])

  const updateStreak = async () => {
    if (!user) return

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Get current streak from Supabase
    const { data: streakData, error } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching streak:', error)
      setLoading(false)
      return
    }

    let newCurrentStreak = 1
    let newLongestStreak = 1

    if (streakData) {
      const lastVisit = new Date(streakData.last_visit)
      lastVisit.setHours(0, 0, 0, 0)

      const diffTime = today.getTime() - lastVisit.getTime()
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 0) {
        // Same day, do nothing
        newCurrentStreak = streakData.current_streak
        newLongestStreak = streakData.longest_streak
      } else if (diffDays === 1) {
        // Yesterday, increment streak
        newCurrentStreak = streakData.current_streak + 1
        newLongestStreak = Math.max(streakData.longest_streak, newCurrentStreak)
      } else {
        // Older than yesterday, reset streak
        newCurrentStreak = 1
        newLongestStreak = streakData.longest_streak
      }

      // Update streak in Supabase
      const { error: updateError } = await supabase
        .from('streaks')
        .upsert({
          user_id: user.id,
          last_visit: today.toISOString(),
          current_streak: newCurrentStreak,
          longest_streak: newLongestStreak
        })

      if (updateError) {
        console.error('Error updating streak:', updateError)
      }
    } else {
      // Create new streak entry
      const { error: createError } = await supabase
        .from('streaks')
        .insert({
          user_id: user.id,
          last_visit: today.toISOString(),
          current_streak: 1,
          longest_streak: 1
        })

      if (createError) {
        console.error('Error creating streak:', createError)
      }
    }

    setCurrentStreak(newCurrentStreak)
    setLongestStreak(newLongestStreak)
    setLoading(false)
  }

  return {
    currentStreak,
    longestStreak,
    loading
  }
}
