# Spec 06 — Streak and Progress

## Goal
Implement streak tracking and article progress for logged in users.

## Tasks

### 1. Create useProgress hook (hooks/useProgress.ts)
- Fetch all completed articles for current user
- Returns: completedArticleIds (string[])
- Returns: markComplete(articleId) function
- markComplete calls supabaseService.markArticleComplete
- Only works when user is logged in
- Refresh progress after marking complete

### 2. Create useStreak hook (hooks/useStreak.ts)
- On mount: call updateStreak if user logged in
- updateStreak logic:
  - Get current streak from Supabase
  - If last_visit is today: do nothing
  - If last_visit is yesterday: increment streak
  - If last_visit is older: reset streak to 1
  - Update last_visit to today
- Returns: currentStreak, longestStreak

### 3. Create StreakWidget (components/StreakWidget.tsx)
- Show fire emoji + current streak number
- Show "X day streak" text
- Tooltip showing longest streak
- Only render when user logged in
- Add to Navbar

### 4. Update ArticleReader
- Use useProgress hook
- Mark as Complete button calls markComplete
- Button shows "Completed" with checkmark if done
- Disable button if already completed

### 5. Update Sidebar
- Use useProgress hook
- Show checkmark on completed articles
- Update progress bar based on completed count

## Design Guidelines
- Streak widget: orange/fire color
- Completed articles: green checkmark
- Progress bar: green fill
- Smooth animation when marking complete

## Verification
- Streak increments on daily visit
- Streak resets if day skipped
- Articles show as complete after marking
- Progress bar updates correctly
- Works across page refreshes

## After completion
Update context/tracker.md