
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function FeedLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Skeleton */}
      <div className="h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200 mb-4">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Skeleton className="h-8 w-32" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex gap-6 p-4">
        {/* Desktop Sidebar Skeleton */}
        <div className="hidden lg:block w-64 sticky top-4 h-fit">
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-3">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
          {/* Desktop Header Skeleton */}
          <div className="hidden lg:block mb-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
            </Card>
          </div>

          {/* Post Tweet Button Skeleton */}
          <Skeleton className="w-full h-12 my-2 rounded-lg" />

          {/* Posts Feed Skeleton */}
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex space-x-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <div className="flex space-x-4 mt-3">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar Skeleton */}
        <div className="hidden xl:block w-80 sticky top-4 h-fit space-y-6">
          {/* Search Skeleton */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <Skeleton className="w-full h-10 rounded-lg" />
            </CardContent>
          </Card>

          {/* Trending Skeleton */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Suggestions Skeleton */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-7 w-16 rounded" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Bottom Navigation Skeleton */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-slate-200 p-2">
        <div className="flex items-center justify-around">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-1 p-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-3 w-8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
