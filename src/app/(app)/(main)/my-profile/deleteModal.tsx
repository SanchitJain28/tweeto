"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Trash2 } from "lucide-react";

interface DeleteTweetModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  tweetText?: string;
  isLoading?: boolean;
}

export function DeleteTweetModal({
  isOpen,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: DeleteTweetModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <DialogTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Delete Tweet
            </DialogTitle>
          </div>
          <DialogDescription className="text-slate-600 dark:text-slate-400 text-left">
            Are you sure you want to delete this tweet? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        {/* {tweetText && (
          <div className="my-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border-l-4 border-red-500">
            <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3">
              {tweetText}
            </p>
          </div>
        )} */}

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Tweet
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
