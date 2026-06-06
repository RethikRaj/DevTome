import { sanity } from '@/lib/sanityClient'
import type { Course, Chapter, Article, Quiz } from '@/types'

export async function getCourses(): Promise<Course[]> {
  return await sanity.fetch(`
    *[_type == "course"] | order(orderIndex asc) {
      _id,
      title,
      description,
      icon,
      color,
      orderIndex
    }
  `)
}

export async function getChaptersByCourse(courseId: string): Promise<Chapter[]> {
  return await sanity.fetch(`
    *[_type == "chapter" && course._ref == $courseId] | order(orderIndex asc) {
      _id,
      title,
      course,
      orderIndex
    }
  `, { courseId })
}

export async function getArticlesByChapter(chapterId: string): Promise<Article[]> {
  return await sanity.fetch(`
    *[_type == "article" && chapter._ref == $chapterId] | order(orderIndex asc) {
      _id,
      title,
      chapter,
      content,
      readTime,
      orderIndex
    }
  `, { chapterId })
}

export async function getArticleById(articleId: string): Promise<Article | null> {
  return await sanity.fetch(`
    *[_type == "article" && _id == $articleId][0] {
      _id,
      title,
      chapter,
      content,
      readTime,
      orderIndex
    }
  `, { articleId })
}

export async function getQuizByArticle(articleId: string): Promise<Quiz | null> {
  return await sanity.fetch(`
    *[_type == "quiz" && article._ref == $articleId][0] {
      _id,
      article,
      questions
    }
  `, { articleId })
}
