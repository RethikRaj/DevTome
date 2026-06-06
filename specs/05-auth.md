# Spec 05 — Authentication

## Goal
Build login and signup pages using Supabase auth.

## Tasks

### 1. Create AuthContext (hooks/useAuth.tsx)
- React context for auth state
- Provides: user, session, loading, signIn, signUp, signOut
- On mount: getSession() to restore session
- Listen to onAuthStateChange
- Wrap App with AuthProvider in main.tsx

### 2. Create LoginPage (pages/LoginPage.tsx)
- Email + password form
- Submit calls signIn from supabaseService
- On success: redirect to previous page or homepage
- Show error messages
- Link to signup page
- Clean centered card design

### 3. Create SignupPage (pages/SignupPage.tsx)
- Email + password + confirm password form
- Validate passwords match
- Submit calls signUp from supabaseService
- On success: show "Check your email to confirm"
- Link to login page
- Same design as login page

### 4. Update Navbar
- If user logged in: show user email + logout button
- If not logged in: show Login + Sign Up buttons
- Use useAuth hook

### 5. Protected behavior
- Mark as complete only works when logged in
- Streak only tracked when logged in
- No hard redirect, just show prompt

## Design Guidelines
- Centered card on full page
- DevTome logo above form
- Clean minimal form design
- Error states in red
- Success states in green

## Verification
- Can sign up with email
- Can log in
- Can log out
- Session persists on refresh
- Navbar updates based on auth state

## After completion
Update context/tracker.md