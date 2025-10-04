import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CitiesListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((number) => (
        <Card
          key={number as number}
          className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full pt-0"
        >
          <div className="relative overflow-hidden aspect-video">
            <Skeleton className="w-full h-full" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-2">
              <Skeleton className="w-6 h-6 rounded" />
              <Skeleton className="w-8 h-4" />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Skeleton className="w-4 h-4 rounded" />
                  <Skeleton className="w-24 h-5" />
                </CardTitle>
                <Skeleton className="w-16 h-5 rounded-full" />
              </div>
              <CardDescription>
                <Skeleton className="w-full h-4 mb-1" />
                <Skeleton className="w-3/4 h-4" />
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col flex-1">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-4 h-4 rounded" />
                  <Skeleton className="w-20 h-4" />
                </div>

                <div className="flex flex-wrap gap-1">
                  <Skeleton className="w-16 h-5 rounded-full" />
                  <Skeleton className="w-20 h-5 rounded-full" />
                  <Skeleton className="w-14 h-5 rounded-full" />
                  <Skeleton className="w-12 h-5 rounded-full" />
                </div>
              </div>

              <Skeleton className="w-full h-10 rounded-md mt-4" />
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};
