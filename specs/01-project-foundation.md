# Spec 01 — Project Foundation

## Goal
Set up the complete folder structure, routing, and client connections for DevTome.

## Tech Stack
- React + Vite + TypeScript
- Tailwind CSS + shadcn/ui
- React Router DOM
- Supabase (auth + user data)
- Sanity (content)

## Tasks

### 1. Create folder structure inside client/src/
Create these folders:
- components/
- components/ui/ (already exists from shadcn)
- pages/
- services/
- hooks/
- types/
- lib/ (already exists)

### 2. Create types/index.ts
Define these TypeScript interfaces:

interface Course {
  _id: string
  title: string
  description: string
  icon: string
  color: string
  orderIndex: number
}

interface Chapter {
  _id: string
  title: string
  course: { _ref: string }
  orderIndex: number
}

interface Article {
  _id: string
  title: string
  chapter: { _ref: string }
  content: any[]
  readTime: number
  orderIndex: number
}

interface QuizQuestion {
  _key: string
  type: 'mcq' | 'truefalse' | 'code'
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
}

interface Quiz {
  _id: string
  article: { _ref: string }
  questions: QuizQuestion[]
}

interface Progress {
  id: string
  user_id: string
  article_id: string
  completed: boolean
  completed_at: string
}

interface Streak {
  id: string
  user_id: string
  last_visit: string
  current_streak: number
  longest_streak: number
}

### 3. Create services/sanityService.ts
Functions to fetch from Sanity:
- getCourses() — fetch all courses ordered by orderIndex
- getChaptersByCourse(courseId) — fetch chapters for a course
- getArticlesByChapter(chapterId) — fetch articles for a chapter
- getArticleById(articleId) — fetch single article with full content
- getQuizByArticle(articleId) — fetch quiz for an article

Use GROQ queries. Import sanity client from lib/sanityClient.ts

### 4. Create services/supabaseService.ts
Functions for user data:
- signUp(email, password) — create account
- signIn(email, password) — login
- signOut() — logout
- getSession() — get current session
- markArticleComplete(articleId) — insert/update progress
- getProgress(userId) — get all completed articles for user
- updateStreak(userId) — update streak on daily visit
- getStreak(userId) — get current streak

Import supabase client from lib/supabase.ts

### 5. Create App.tsx with routing
Set up React Router with these routes:
- / → HomePage
- /course/:courseId → CoursePage
- /login → LoginPage
- /signup → SignupPage

Create empty placeholder components for each page in pages/ folder.

### 6. Update main.tsx
Wrap app with BrowserRouter.

## Verification
- npm run dev runs without errors
- All routes exist (even if pages are empty)
- No TypeScript errors in services files

## After completion
Update context/tracker.md:
- Mark Spec 01 complete
- Next: Spec 02 — Homepage