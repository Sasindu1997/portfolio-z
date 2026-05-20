import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background bg-grid flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6">
          <p className="text-8xl font-bold gradient-text">404</p>
          <h1 className="text-2xl font-bold">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-10 px-6 text-sm font-medium rounded-xl bg-zenode-cyan text-black hover:bg-zenode-teal transition-all duration-200"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
