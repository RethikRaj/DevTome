# Spec 07 — Dark Mode, Animations and Polish

## Goal
Final polish pass. Animations, transitions, dark mode refinement.

## Tasks

### 1. Dark mode refinement
- Ensure all components respect dark/light mode
- Smooth transition on theme toggle (transition: all 0.3s)
- Sidebar, article, quiz all themed correctly
- Code blocks always dark regardless of theme

### 2. Page transition animations
- Fade in on page load for all pages
- Use CSS keyframes, no external library
- Staggered fade in for course cards on homepage
- Smooth slide in for sidebar

### 3. Micro interactions
- Hover effects on course cards (scale + shadow)
- Smooth highlight on active article in sidebar
- Button press animations
- Quiz option hover effects
- Checkmark animation when marking article complete

### 4. Loading states
- Skeleton loaders for course cards
- Skeleton for article content while loading
- Spinner for quiz loading

### 5. Empty states
- "No courses yet" on homepage
- "No articles yet" in sidebar
- "No quiz for this article" gracefully hidden

### 6. Mobile responsiveness
- Navbar collapses on mobile
- Sidebar hidden on mobile, toggle with button
- Article reader full width on mobile
- Quiz options stack on mobile

### 7. Final touches
- Favicon (use a book emoji favicon)
- Page title updates per article
- Smooth scroll behavior
- Focus states for accessibility

## Verification
- Dark mode works perfectly on all pages
- Animations are smooth not janky
- Mobile layout works
- No console errors
- App feels polished and production ready

## After completion
Update context/tracker.md
- Mark all specs complete
- Project ready for submission