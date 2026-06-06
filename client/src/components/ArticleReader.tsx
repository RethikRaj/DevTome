import { PortableText } from '@portabletext/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { urlFor } from '@/lib/sanityClient'
import { Clock, CheckCircle } from 'lucide-react'
import type { Article, Quiz as QuizType } from '@/types'
import Quiz from '@/components/Quiz'
import { useProgress } from '@/hooks/useProgress'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

interface ArticleReaderProps {
  article: Article
  quiz?: QuizType
  onArticleComplete?: () => void
}

const components = {
  types: {
    image: ({ value }: any) => (
      <figure className="my-6">
        <img
          src={urlFor(value).url()}
          alt={value.alt || ''}
          className="rounded-lg w-full"
        />
        {value.caption && (
          <figcaption className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-2">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    code: ({ value }: any) => (
      <div className="my-6">
        <SyntaxHighlighter
          language={value.language || 'javascript'}
          style={vscDarkPlus}
          customStyle={{
            borderRadius: '0.5rem',
            fontSize: '0.875rem'
          }}
        >
          {value.code}
        </SyntaxHighlighter>
      </div>
    )
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mb-2">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold mb-2">{children}</h4>,
    h5: ({ children }: any) => <h5 className="text-base font-bold mb-2">{children}</h5>,
    h6: ({ children }: any) => <h6 className="text-sm font-bold mb-2">{children}</h6>,
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-green-500 pl-4 py-1 mb-4 italic text-gray-400 bg-gray-800/50 rounded-r">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc ml-6 mb-4 space-y-1">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal ml-6 mb-4 space-y-1">{children}</ol>
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => <code className="bg-gray-800 px-1 rounded text-sm font-mono">{children}</code>,
    link: ({ children, value }: any) => (
      <a href={value.href} className="text-blue-500 underline">
        {children}
      </a>
    )
  }
}

export default function ArticleReader({ article, quiz, onArticleComplete }: ArticleReaderProps) {
  const { user } = useAuth()
  const { completedArticleIds, markComplete } = useProgress()

  const isCompleted = completedArticleIds.includes(article._id)

  useEffect(() => {
    document.title = `${article.title} - DevTome`
  }, [article.title])

  const handleMarkComplete = async () => {
    if (!user) {
      alert('Please sign in to track progress')
      return
    }

    await markComplete(article._id)
    onArticleComplete?.()
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-8">
      {/* Article header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          {article.title}
        </h1>
        {article.readTime && (
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Clock className="h-4 w-4" />
            <span>{article.readTime} min read</span>
          </div>
        )}
      </header>

      {/* Article content */}
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <PortableText value={article.content} components={components} />
      </div>

      {/* Mark complete button */}
      <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        {user ? (
          <button
            onClick={handleMarkComplete}
            disabled={isCompleted}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
              ${isCompleted
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 cursor-default'
                : 'bg-green-500 hover:bg-green-600 text-white'
              }
            `}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="h-5 w-5 animate-checkmark" />
                Completed
              </>
            ) : (
              'Mark as Complete'
            )}
          </button>
        ) : (
          <p className="text-zinc-600 dark:text-zinc-400">
            <a href="/login" className="text-green-500 hover:underline">Sign in</a> to track progress
          </p>
        )}
      </div>

      {/* Quiz section */}
      {quiz && quiz.questions.length > 0 && (
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <Quiz quiz={quiz} />
        </div>
      )}
    </article>
  )
}
