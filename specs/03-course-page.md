# Spec 03 — Course Page

## Goal
Build the course page with collapsible left sidebar and article reader.

## Tasks

### 1. Create CoursePage (pages/CoursePage.tsx)
- Two column layout: left sidebar + right content area
- Fetch course details by courseId from URL params
- Fetch all chapters and articles for this course
- Default: show first article automatically

### 2. Create Sidebar (components/Sidebar.tsx)
- Show course title at top
- Progress bar: X/Y articles completed
- Search input to filter articles
- List of chapters, each collapsible
- Each chapter shows its articles
- Article item shows: title, completion checkmark if done
- Currently active article highlighted
- Smooth collapse/expand animation
- Scrollable independently from main content

### 3. Create ArticleReader (components/ArticleReader.tsx)
- Show article title
- Show read time (X min read)
- Render Sanity portable text content
- Handle text blocks, images, code blocks
- Install: npm install @portabletext/react
- Install: npm install react-syntax-highlighter
- Install: npm install @types/react-syntax-highlighter
- Images rendered with proper captions
- Code blocks with syntax highlighting
- At bottom: "Mark as Complete" button
- If user logged in: saves to Supabase progress
- If not logged in: shows "Sign in to track progress"
- After article: render Quiz component if quiz exists

### 4. Sidebar collapse on mobile
- On mobile sidebar is hidden by default
- Hamburger menu button to show/hide sidebar
- Overlay when sidebar open on mobile

## Design Guidelines
- Sidebar width: 280px on desktop
- Sidebar background slightly different from main
- Active article has green left border accent
- Completed articles have green checkmark
- Code blocks dark themed always

## Verification
- Course page loads with sidebar
- Chapters collapse and expand
- Articles load and render rich text
- Images render correctly
- Code blocks have syntax highlighting
- Mark complete button works when logged in

## After completion
Update context/tracker.md