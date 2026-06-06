import { useState } from 'react'
import { ChevronDown, ChevronRight, Search, Check } from 'lucide-react'
import type { Course, Chapter, Article } from '@/types'
import { useProgress } from '@/hooks/useProgress'

interface SidebarProps {
  course: Course
  chapters: Chapter[]
  articles: Article[]
  activeArticleId: string
  onArticleSelect: (articleId: string) => void
  isMobileOpen?: boolean
  onCloseMobile?: () => void
}

export default function Sidebar({
  course,
  chapters,
  articles,
  activeArticleId,
  onArticleSelect,
  isMobileOpen = false,
  onCloseMobile
}: SidebarProps) {
  const { completedArticleIds } = useProgress()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set(chapters.map(c => c._id))
  )

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => {
      const next = new Set(prev)
      if (next.has(chapterId)) {
        next.delete(chapterId)
      } else {
        next.add(chapterId)
      }
      return next
    })
  }

  const filteredChapters = chapters
    .map(chapter => ({
      ...chapter,
      articles: articles.filter(
        a => a.chapter._ref === chapter._id && 
        a.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(chapter => chapter.articles.length > 0)

  const totalArticles = articles.length
  const completedCount = completedArticleIds.length
  const progressPercent = totalArticles > 0 ? (completedCount / totalArticles) * 100 : 0

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-[280px] bg-zinc-100 dark:bg-zinc-900 
        border-r border-zinc-200 dark:border-zinc-800 flex flex-col z-50
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Course header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {course.icon} {course.title}
          </h2>
          
          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400 mb-1">
              <span>Progress</span>
              <span>{completedCount}/{totalArticles}</span>
            </div>
            <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-zinc-200 dark:bg-zinc-800 
              border-none rounded-lg text-zinc-900 dark:text-zinc-100 
              placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Chapter list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredChapters.map(chapter => (
            <div key={chapter._id}>
              {/* Chapter header */}
              <button
                onClick={() => toggleChapter(chapter._id)}
                className="w-full flex items-center justify-between p-2 text-sm font-medium
                text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg"
              >
                <span>{chapter.title}</span>
                {expandedChapters.has(chapter._id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {/* Articles */}
              {expandedChapters.has(chapter._id) && (
                <div className="ml-4 mt-1 space-y-1">
                  {chapter.articles
                    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
                    .map(article => {
                      const isCompleted = completedArticleIds.includes(article._id)
                      const isActive = activeArticleId === article._id
                      
                      return (
                        <button
                          key={article._id}
                          onClick={() => {
                            onArticleSelect(article._id)
                            onCloseMobile?.()
                          }}
                          className={`
                            w-full flex items-center gap-2 p-2 text-sm rounded-lg transition-all
                            ${isActive 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100 border-l-4 border-green-500' 
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                            }
                          `}
                        >
                          {isCompleted && (
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          )}
                          <span className="truncate">{article.title}</span>
                        </button>
                      )
                    })}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
