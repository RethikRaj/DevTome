# Spec 04 — Quiz Component

## Goal
Build quiz component that appears after each article.

## Tasks

### 1. Create Quiz (components/Quiz.tsx)
- Fetch quiz for current article from Sanity
- If no quiz exists, render nothing
- Show "Test Your Knowledge" heading
- Show question count: "Question X of Y"
- Progress bar showing quiz progress
- Render different question types:

#### MCQ questions
- Show question text
- Show 4 options as clickable cards
- Green highlight for correct, red for wrong
- Show explanation after answering

#### True/False questions
- Show question text
- Two buttons: True, False
- Same feedback as MCQ

#### Code snippet questions
- Show question text
- Show code block using syntax highlighter
- Show options below code

### 2. Quiz completion screen
- Show score: X/Y correct
- Show percentage
- Celebration animation if score > 70%
- "Try Again" button resets quiz
- "Next Article" button navigates to next article

### 3. Quiz state management
- Track current question index
- Track answers given
- Track score
- No external state library, use useState

## Design Guidelines
- Quiz appears below article content
- Divider line between article and quiz
- Clean card design for options
- Smooth transition between questions
- Mobile friendly

## Verification
- Quiz renders after article
- All three question types work
- Score calculated correctly
- Try again resets properly

## After completion
Update context/tracker.md