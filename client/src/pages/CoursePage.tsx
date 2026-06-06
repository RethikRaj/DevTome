import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import ArticleReader from '@/components/ArticleReader'
import { sanity } from '@/lib/sanityClient'
import type { Course, Chapter, Article, Quiz } from '@/types'

export default function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>()
  const [course, setCourse] = useState<Course | null>(null)
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [activeArticle, setActiveArticle] = useState<Article | null>(null)
  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (courseId) {
      fetchCourseData(courseId)
    }
  }, [courseId])

  const fetchCourseData = async (id: string) => {
    try {
      setLoading(true)

      // Fetch course
      const courseQuery = `*[_type == "course" && _id == $id][0]`
      const courseData = await sanity.fetch(courseQuery, { id })
      setCourse(courseData)

      // Fetch chapters for this course
      const chaptersQuery = `*[_type == "chapter" && course._ref == $id] | order(orderIndex asc)`
      const chaptersData = await sanity.fetch(chaptersQuery, { id })
      setChapters(chaptersData)

      // Fetch all articles for these chapters
      const chapterIds = chaptersData.map((c: Chapter) => c._id)
      const articlesQuery = `*[_type == "article" && chapter._ref in $chapterIds] | order(orderIndex asc)`
      const articlesData = await sanity.fetch(articlesQuery, { chapterIds })
      setArticles(articlesData)

      // Set first article as active
      if (articlesData.length > 0) {
        setActiveArticle(articlesData[0])
        await fetchQuiz(articlesData[0]._id)
      }
    } catch (error) {
      console.error('Error fetching course data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchQuiz = async (articleId: string) => {
    const quizQuery = `*[_type == "quiz" && article._ref == $articleId][0]`
    const quizData = await sanity.fetch(quizQuery, { articleId })
    setQuiz(quizData)
  }

  const handleArticleSelect = async (articleId: string) => {
    const article = articles.find(a => a._id === articleId)
    if (article) {
      setActiveArticle(article)
      await fetchQuiz(articleId)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-zinc-600 dark:text-zinc-400">Course not found</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-950">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <Sidebar
        course={course}
        chapters={chapters}
        articles={articles}
        activeArticleId={activeArticle?._id || ''}
        onArticleSelect={handleArticleSelect}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main content */}
      <main className="flex-1 lg:ml-[280px] overflow-y-auto">
        {activeArticle && (
          <ArticleReader
            article={activeArticle}
            quiz={quiz}
          />
        )}
      </main>
    </div>
  )
}
