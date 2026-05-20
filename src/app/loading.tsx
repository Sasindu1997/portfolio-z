import { Skeleton, ProjectCardSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="container-custom space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-14 w-2/3" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
