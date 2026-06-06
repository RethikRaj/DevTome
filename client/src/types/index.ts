export interface Course {
  _id: string
  title: string
  description: string
  icon: string
  color: string
  orderIndex: number
}

export interface Chapter {
  _id: string
  title: string
  course: { _ref: string }
  orderIndex: number
}

export interface Article {
  _id: string
  title: string
  chapter: { _ref: string }
  content: any[]
  readTime: number
  orderIndex: number
}

export interface QuizQuestion {
  _key: string
  type: 'mcq' | 'truefalse' | 'code'
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  codeSnippet?: string
  codeLanguage?: string
}

export interface Quiz {
  _id: string
  article: { _ref: string }
  questions: QuizQuestion[]
}

export interface Progress {
  id: string
  user_id: string
  article_id: string
  completed: boolean
  completed_at: string
}

export interface Streak {
  id: string
  user_id: string
  last_visit: string
  current_streak: number
  longest_streak: number
}
