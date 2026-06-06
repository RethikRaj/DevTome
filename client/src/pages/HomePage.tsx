import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import CourseCard from '@/components/CourseCard'
import { getCourses } from '@/services/sanityService'
import { getChaptersByCourse } from '@/services/sanityService'
import type { Course } from '@/types'

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [chapterCounts, setChapterCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    async function loadCourses() {
      try {
        const coursesData = await getCourses()
        setCourses(coursesData)

        // Fetch chapter count for each course
        const counts: Record<string, number> = {}
        await Promise.all(
          coursesData.map(async (course) => {
            const chapters = await getChaptersByCourse(course._id)
            counts[course._id] = chapters.length
          })
        )
        setChapterCounts(counts)
      } catch (error) {
        console.error('Failed to load courses:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold">Available Courses</h2>
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <p className="text-muted-foreground">No courses yet. Check back soon!</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  chapterCount={chapterCounts[course._id] || 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
