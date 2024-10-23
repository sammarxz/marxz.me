import { Loader2 } from "lucide-react";

export function Loading() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="animate-spin text-primary" aria-label="Loading">
        <Loader2 className="h-8 w-8" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
