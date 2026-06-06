import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'

export function useProgress() {
  const { user } = useAuth()
  const [completedArticleIds, setCompletedArticleIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchProgress()
    } else {
      setCompletedArticleIds([])
      setLoading(false)
    }
  }, [user])

  const fetchProgress = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('progress')
      .select('article_id')
      .eq('user_id', user.id)
      .eq('completed', true)

    if (error) {
      console.error('Error fetching progress:', error)
    } else {
      setCompletedArticleIds(data?.map(p => p.article_id) || [])
    }

    setLoading(false)
  }

  const markComplete = async (articleId: string) => {
    if (!user) return

    const { error } = await supabase
      .from('progress')
      .upsert({
        user_id: user.id,
        article_id: articleId,
        completed: true,
        completed_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error marking complete:', error)
      return
    }

    // Refresh progress
    await fetchProgress()
  }

  return {
    completedArticleIds,
    markComplete,
    loading
  }
}
