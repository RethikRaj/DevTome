import { useAuth } from '@/hooks/useAuth'
import { useStreak } from '@/hooks/useStreak'
import { Flame } from 'lucide-react'

export default function StreakWidget() {
  const { user } = useAuth()
  const { currentStreak, longestStreak, loading } = useStreak()

  if (!user || loading) {
    return null
  }

  return (
    <div 
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
      title={`Longest streak: ${longestStreak} days`}
    >
      <Flame className="h-4 w-4" />
      <span className="text-sm font-medium">
        {currentStreak} day streak
      </span>
    </div>
  )
}
