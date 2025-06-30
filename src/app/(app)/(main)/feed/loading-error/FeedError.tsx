import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface FeedErrorStateProps {
  onRetry?: () => void
  error?: string
}

export default function FeedErrorState({ onRetry, error }: FeedErrorStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-16 w-16 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-slate-600 mb-6">
            {error || "We're having trouble loading your feed. Please try again."}
          </p>
          {onRetry && (
            <Button 
              onClick={onRetry}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}