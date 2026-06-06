import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Trophy, RotateCcw, ArrowRight } from 'lucide-react'
import type { Quiz } from '@/types'

interface QuizProps {
  quiz: Quiz
  onNextArticle?: () => void
}

export default function Quiz({ quiz, onNextArticle }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  const [score, setScore] = useState(0)

  if (!quiz || quiz.questions.length === 0) {
    return null
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  const handleAnswer = (answer: string) => {
    if (showExplanation) return

    setSelectedAnswer(answer)

    if (answer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1)
    }

    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setIsQuizComplete(true)
    }
  }

  const handleTryAgain = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setIsQuizComplete(false)
    setScore(0)
  }

  const percentage = Math.round((score / quiz.questions.length) * 100)
  const isHighScore = percentage > 70

  if (isQuizComplete) {
    return (
      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-8">
        {isHighScore && (
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Trophy className="h-16 w-16 text-yellow-500 animate-bounce" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">🎉</span>
              </div>
            </div>
          </div>
        )}
        
        <h3 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-4">
          Quiz Complete!
        </h3>
        
        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-green-500 mb-2">
            {score}/{quiz.questions.length}
          </p>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {percentage}% Correct
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleTryAgain}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg font-medium transition-all"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
          
          {onNextArticle && (
            <button
              onClick={onNextArticle}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all"
            >
              Next Article
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Test Your Knowledge
        </h3>
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question card */}
      <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg">
        <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-6">
          {currentQuestion.question}
        </h4>

        {/* Code snippet for code questions */}
        {currentQuestion.type === 'code' && currentQuestion.codeSnippet && (
          <div className="mb-6">
            <SyntaxHighlighter
              language={currentQuestion.codeLanguage || 'javascript'}
              style={vscDarkPlus}
              customStyle={{
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              {currentQuestion.codeSnippet}
            </SyntaxHighlighter>
          </div>
        )}

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.type === 'mcq' && currentQuestion.options && (
            currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option
              const isCorrect = option === currentQuestion.correctAnswer
              const isIncorrect = isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={showExplanation}
                  className={`
                    w-full text-left p-4 rounded-lg transition-all duration-200 border-2 button-press
                    ${isSelected && !showExplanation
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 scale-105'
                      : showExplanation && isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : showExplanation && isIncorrect
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-[1.02] hover:shadow-md'
                    }
                  `}
                >
                  <span className="font-medium">{option}</span>
                </button>
              )
            })
          )}

          {currentQuestion.type === 'truefalse' && (
            ['True', 'False'].map((option) => {
              const isSelected = selectedAnswer === option
              const isCorrect = option === currentQuestion.correctAnswer
              const isIncorrect = isSelected && !isCorrect

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={showExplanation}
                  className={`
                    w-full text-left p-4 rounded-lg transition-all border-2
                    ${isSelected && !showExplanation
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : showExplanation && isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : showExplanation && isIncorrect
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }
                  `}
                >
                  <span className="font-medium">{option}</span>
                </button>
              )
            })
          )}

          {currentQuestion.type === 'code' && currentQuestion.options && (
            currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option
              const isCorrect = option === currentQuestion.correctAnswer
              const isIncorrect = isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={showExplanation}
                  className={`
                    w-full text-left p-4 rounded-lg transition-all duration-200 border-2 button-press
                    ${isSelected && !showExplanation
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 scale-105'
                      : showExplanation && isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : showExplanation && isIncorrect
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-[1.02] hover:shadow-md'
                    }
                  `}
                >
                  <span className="font-medium">{option}</span>
                </button>
              )
            })
          )}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              <strong className="text-zinc-900 dark:text-zinc-100">Explanation:</strong> {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Next button */}
      {showExplanation && (
        <button
          onClick={handleNext}
          className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all"
        >
          {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  )
}
