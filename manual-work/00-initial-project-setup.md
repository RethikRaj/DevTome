# Manual Work 00 — Initial Project Setup

## Status
✅ Completed

## What was done manually

### 1. React + Vite client setup
cd devtome
npm create vite@latest client -- --template react-ts
cd client
npm install

### 2. Tailwind CSS v4 setup
npm install -D tailwindcss @tailwindcss/vite
Added tailwindcss plugin to vite.config.ts
Replaced index.css with @import "tailwindcss"

### 3. Path alias setup
Added to client/tsconfig.app.json:
  "baseUrl": "."
  "paths": { "@/*": ["./src/*"] }

Added to client/vite.config.ts:
  resolve.alias: { "@": path.resolve(__dirname, "./src") }

npm install -D @types/node

### 4. shadcn/ui setup
npx shadcn@4.9.0 init --preset bddBUJGq --template vite
Style: New York
Base color: Zinc
CSS variables: Yes
Created: src/components/ui/button.tsx, src/lib/utils.ts

### 5. React Router DOM
npm install react-router-dom

### 6. Supabase setup
Created project at supabase.com
Project name: DevTome
Region: Southeast Asia (Singapore)
npm install @supabase/supabase-js
Created client/src/lib/supabase.ts

Added to client/.env.local:
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

Created tables via SQL Editor:
- progress (with RLS enabled)
- streaks (with RLS enabled)

RLS policies added:
- Users can manage their own progress
- Users can manage their own streak

### 7. Sanity CMS setup
From devtome root:
npm create sanity@latest
Project name: devtome
Dataset: production (default)
Output path: studio
Template: Clean project

cd studio
npm install @sanity/code-input

Created schema files:
- studio/schemaTypes/course.ts
- studio/schemaTypes/chapter.ts
- studio/schemaTypes/article.ts
- studio/schemaTypes/quiz.ts
- studio/schemaTypes/index.ts (registers all schemas)

Updated studio/sanity.config.ts to include codeInput() plugin

npm install @sanity/client @sanity/image-url (in client folder)
Created client/src/lib/sanityClient.ts

Added to client/.env.local:
VITE_SANITY_PROJECT_ID=ifcjyhof

Sanity studio runs at http://localhost:3333

## Folder structure created
devtome/
├── client/          ← React + Vite frontend
├── studio/          ← Sanity CMS
├── server/          ← Empty, for future custom backend
├── specs/           ← Build specs
├── prompts/         ← Windsurf prompts
├── manual-work/     ← This folder
├── context/
│   └── tracker.md
├── .windsurf/
│   └── rules/
│       ├── 00-core.mdc
│       ├── 10-frontend.mdc
│       ├── 20-backend.mdc
│       └── 30-spec-workflow.mdc
└── AGENTS.md

## Notes
- server/ folder is empty for now, will be used when migrating from Supabase to custom backend
- Sanity handles all content (courses, chapters, articles, quizzes)
- Supabase handles user auth + progress + streak only
- article_id in progress table is text type (not uuid) because IDs come from Sanity