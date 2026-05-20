"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md">
        <p className="text-5xl font-bold gradient-text">Oops</p>
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="text-sm text-muted-foreground">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 h-10 px-6 text-sm font-medium rounded-xl bg-zenode-cyan text-black hover:bg-zenode-teal transition-all duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
