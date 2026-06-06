import { Link } from 'react-router-dom'
import type { Course } from '@/types'

interface CourseCardProps {
  course: Course
  chapterCount?: number
}

export default function CourseCard({ course, chapterCount = 0 }: CourseCardProps) {
  return (
    <Link
      to={`/course/${course._id}`}
      className="group block animate-scale-in"
    >
      <div className="h-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700">
        <div className="mb-4 text-4xl">{course.icon}</div>
        <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{course.title}</h3>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {course.description}
        </p>
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span className="font-medium" style={{ color: course.color }}>
            {chapterCount} {chapterCount === 1 ? 'chapter' : 'chapters'}
          </span>
        </div>
      </div>
    </Link>
  )
}
