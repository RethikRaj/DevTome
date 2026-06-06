# DevTome Progress Tracker

## Completed Specs
- ✅ Spec 01 — Project Foundation
- ✅ Spec 02 — Homepage
- ✅ Spec 03 — Course Page
- ✅ Spec 04 — Quiz Component
- ✅ Spec 05 — Authentication
- ✅ Spec 06 — Streak and Progress
- ✅ Spec 07 — Dark Mode, Animations and Polish

## Current Work
- **PROJECT COMPLETE** — All specs implemented and ready for submission

## Important Decisions
- Sanity CMS handles all content (courses, chapters, articles, quizzes)
- Supabase handles user auth + progress + streak only
- article_id in progress table is text type (not uuid) because IDs come from Sanity
- Dark mode uses next-themes with class-based strategy (Tailwind v4)
- shadcn/ui components copied from @ alias to src/ for proper TypeScript resolution
- Course page uses two-column layout with collapsible sidebar (280px width on desktop)
- Mobile sidebar has hamburger menu with overlay when open
- Article reader uses @portabletext/react for rich text rendering
- Code blocks use react-syntax-highlighter with vscDarkPlus theme (always dark)
- Quiz component is standalone with one-question-at-a-time flow
- Quiz shows progress bar and question count (Question X of Y)
- Quiz supports MCQ, True/False, and Code snippet question types
- Code snippet questions use syntax highlighting with vscDarkPlus theme
- Quiz completion screen shows score, percentage, and celebration animation for scores >70%
- Quiz has Try Again and Next Article buttons
- Auth context provides user, session, loading, signIn, signUp, signOut
- Session persists on refresh via onAuthStateChange listener
- Navbar conditionally shows user email + logout when logged in, login/signup buttons when not
- Mark as complete button shows "Sign in to track progress" prompt when not logged in (no hard redirect)
- Login and signup pages use centered card design with DevTome logo
- Signup requires password confirmation and minimum 6 characters
- useProgress hook fetches completed articles for current user and provides markComplete function
- useStreak hook updates streak on mount: increments if yesterday, resets if older, does nothing if today
- Streak widget shows fire emoji + current streak with orange/fire color
- Streak widget only renders when user is logged in
- Streak widget tooltip shows longest streak
- ArticleReader and Sidebar use useProgress hook instead of manual Supabase calls
- Completed articles show green checkmark in sidebar
- Progress bar in sidebar shows green fill based on completed count
- Smooth theme transitions (0.3s duration) on all color changes
- Page transition animations: fade-in, slide-in, scale-in with staggered delays
- Course cards have hover effects with scale (1.05) and shadow
- Buttons have press animation (scale 0.95 on active)
- Quiz options have hover effects with scale and shadow
- Checkmark animation (pop effect) when marking article complete
- Skeleton loader component for loading states
- Loading states present on HomePage and CoursePage
- Empty states for courses ("No courses yet") and articles
- Mobile responsiveness: sidebar toggle, full-width article reader, stacked quiz options
- Favicon uses book emoji (📖)
- Page titles update per article in ArticleReader
- Smooth scroll behavior enabled globally
- Focus states for accessibility (outline-ring/50 on all elements)

## Known Issues
- None

## Project Status
- All specs completed
- Application is polished and production ready
- Ready for submission
