import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "./Header";

export const TripListSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Vos voyages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card
                  // biome-ignore lint/suspicious/noArrayIndexKey: nothing better
                  key={index}
                  className="hover:shadow-md transition-shadow h-50"
                >
                  <div className="flex h-full">
                    <div className="flex-1 flex flex-col gap-2">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <Skeleton className="w-32 h-6" />
                            <Skeleton className="w-40 h-4" />
                          </div>
                          <Skeleton className="w-8 h-8 rounded" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1">
                          <Skeleton className="w-16 h-5 rounded-full" />
                          <Skeleton className="w-20 h-5 rounded-full" />
                          <Skeleton className="w-14 h-5 rounded-full" />
                          <Skeleton className="w-12 h-5 rounded-full" />
                        </div>
                      </CardContent>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="relative w-32 h-20">
                        <Skeleton className="w-32 h-20 rounded-md" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
