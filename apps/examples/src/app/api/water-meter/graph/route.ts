import { type NextRequest, NextResponse } from "next/server";

export type ConsumptionData = {
  period: string;
  consommation: number;
  moyenne: number;
  date: string;
};

const generateMockData = (period: string): ConsumptionData[] => {
  const now = new Date();

  switch (period) {
    case "today":
      return Array.from({ length: 24 }, (_, i) => ({
        period: `${i}h`,
        consommation: Math.floor(Math.random() * 50) + 20,
        moyenne: 35,
        date: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          i,
        ).toISOString(),
      }));

    case "week":
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - (6 - i));
        return {
          period: date.toLocaleDateString("fr-FR", { weekday: "short" }),
          consommation: Math.floor(Math.random() * 200) + 100,
          moyenne: 150,
          date: date.toISOString(),
        };
      });

    case "month":
      return Array.from({ length: 30 }, (_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - (29 - i));
        return {
          period: `${date.getDate()}`,
          consommation: Math.floor(Math.random() * 300) + 150,
          moyenne: 225,
          date: date.toISOString(),
        };
      });

    case "semester":
      return Array.from({ length: 6 }, (_, i) => {
        const date = new Date(now);
        date.setMonth(date.getMonth() - (5 - i));
        return {
          period: date.toLocaleDateString("fr-FR", { month: "short" }),
          consommation: Math.floor(Math.random() * 2000) + 1000,
          moyenne: 1500,
          date: date.toISOString(),
        };
      });

    default:
      return [];
  }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "month";

    // Validate period parameter
    const validPeriods = ["today", "week", "month", "semester"];
    if (!validPeriods.includes(period)) {
      return NextResponse.json(
        { error: `Invalid period. Must be one of: ${validPeriods.join(", ")}` },
        { status: 400 },
      );
    }

    // Generate mock data based on period
    const data = generateMockData(period);

    // Calculate summary statistics
    const totalConsumption = data.reduce(
      (sum, item) => sum + item.consommation,
      0,
    );
    const averageConsumption = totalConsumption / data.length;
    const previousPeriodAverage =
      data.reduce((sum, item) => sum + item.moyenne, 0) / data.length;
    const trend = averageConsumption > previousPeriodAverage ? "up" : "down";
    const trendPercentage = Math.abs(
      ((averageConsumption - previousPeriodAverage) / previousPeriodAverage) *
        100,
    );

    return NextResponse.json({
      data,
      summary: {
        totalConsumption,
        averageConsumption,
        previousPeriodAverage,
        trend,
        trendPercentage,
        period,
      },
    });
  } catch (error) {
    console.error("Error fetching graph data:", error);
    return NextResponse.json(
      { error: "Failed to fetch graph data" },
      { status: 500 },
    );
  }
}
