import { cn } from "@/lib/utils";

interface ZenodeLogoProps {
  className?: string;
}

export function ZenodeLogo({ className }: ZenodeLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Z icon mark */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="z-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#12AB8D" />
            <stop offset="100%" stopColor="#0D9A7E" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#z-grad)" opacity="0.15" />
        <rect width="32" height="32" rx="8" stroke="url(#z-grad)" strokeWidth="1" fill="none" />
        <path
          d="M8 9h16l-13 14h13"
          stroke="url(#z-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-bold text-base tracking-tight gradient-text">
        Zenode
      </span>
    </div>
  );
}
