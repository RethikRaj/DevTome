import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,200,150,0.05),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center animate-in fade-in duration-1000">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Master Software Engineering
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl md:text-2xl">
            Structured learning paths with quizzes, progress tracking and daily streaks for every software engineer
          </p>
          {/* <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/courses">
              <Button size="lg" className="w-full sm:w-auto">
                Start Learning
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Courses
              </Button>
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  )
}
