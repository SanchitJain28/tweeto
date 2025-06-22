import { Loader2 } from "lucide-react";

interface LoadingBackdropProps {
  isVisible?: boolean;
  message?: string;
  className?: string;
}

export default function LoadingBackdrop({
  isVisible = true,
  message = "Loading...",
  className = "",
}: LoadingBackdropProps) {
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${className}`}
    >
      <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        {message && (
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
