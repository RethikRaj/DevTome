# Spec 02 — Homepage

## Goal
Build a stunning homepage for DevTome that looks like AlgoMaster.
Clean editorial style, dark mode default.

## Reference
- AlgoMaster homepage style
- Dark background, bold hero text, course cards below
- Navbar with logo, dark/light mode toggle, login/signup buttons

## Tasks

### 1. Create Navbar component (components/Navbar.tsx)
- Left: DevTome logo text (bold, with a subtle accent color)
- Right: Dark/light mode toggle button, Login button, Sign Up button
- Sticky at top
- Clean minimal border at bottom
- Use shadcn Button component
- Dark mode toggle uses localStorage to persist preference
- Add class to html element for dark mode (class="dark")

### 2. Set up dark mode
- Install next-themes: npm install next-themes
- Wrap App with ThemeProvider in main.tsx
- Default theme: dark
- Toggle between dark and light

### 3. Create Hero section (components/Hero.tsx)
- Large bold headline: "Master Software Engineering"
- Subtitle: "Structured learning paths with quizzes, 
  progress tracking and daily streaks 
  for every software engineer"
- Two CTA buttons: "Start Learning" (primary) and 
  "View Courses" (secondary)
- Subtle animated background (CSS only, 
  no heavy libraries)
- Fade in animation on load

### 4. Create CourseCard component (components/CourseCard.tsx)
- Shows course icon (emoji), title, description
- Shows number of chapters
- Hover animation (scale up slightly)
- Click navigates to /course/:courseId
- Use shadcn Card component
- Accent color from course.color field

### 5. Create HomePage (pages/HomePage.tsx)
- Renders Navbar
- Renders Hero section
- Section title: "Available Courses"
- Fetches courses from Sanity using getCourses() 
  from sanityService
- Renders CourseCard for each course
- Show loading skeleton while fetching
- Show "No courses yet" if empty

### 6. Update tailwind for dark mode
In client/tailwind.config.js make sure:
darkMode: 'class'

## Design Guidelines
- Dark mode: background #0a0a0a, text white
- Light mode: background white, text #0a0a0a
- Accent color: #00c896 (green, like AlgoMaster)
- Font: use system font stack
- Smooth transitions on theme toggle
- Mobile responsive

## Verification
- npm run dev shows homepage at http://localhost:5173
- Dark mode toggle works
- Courses load from Sanity (will be empty for now, 
  that is fine)
- No TypeScript errors
- Mobile responsive

## After completion
Update context/tracker.md:
- Mark Spec 02 complete
- Next: Spec 03 — Course Page