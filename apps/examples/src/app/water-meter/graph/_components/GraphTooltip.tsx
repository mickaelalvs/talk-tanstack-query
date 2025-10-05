import { getUnit } from "../../_utils/water-meters.utils";

// biome-ignore lint/suspicious/noExplicitAny: I know it's bad
export const GraphTooltip = ({ active, payload, period }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const date = new Date(data.date);

    let dateLabel = "";
    let timeLabel = "";

    switch (period) {
      case "today":
        dateLabel = date.toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        timeLabel = `${date.getHours()}h00`;
        break;
      case "week":
        dateLabel = date.toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        break;
      case "month":
        dateLabel = date.toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        break;
      case "semester":
        dateLabel = date.toLocaleDateString("fr-FR", {
          month: "long",
          year: "numeric",
        });
        break;
    }

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg min-w-[250px] z-50">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <p className="font-semibold text-gray-900">{dateLabel}</p>
        </div>

        {timeLabel && (
          <div className="mb-3">
            <p className="text-sm text-gray-600">
              Heure:{" "}
              <span className="font-medium text-gray-900">{timeLabel}</span>
            </p>
          </div>
        )}

        <div className="space-y-3">
          <div className="bg-primary/5 p-3 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm font-medium text-primary">
                Consommation d'eau
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Volume consommé:</span>
              <span className="font-bold text-primary text-lg">
                {payload[0].value.toLocaleString("fr-FR")} {getUnit(period)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-gray-600">vs moyenne:</span>
              <span
                className={`text-sm font-medium ${
                  payload[0].value > data.moyenne
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {payload[0].value > data.moyenne ? "+" : ""}
                {(
                  ((payload[0].value - data.moyenne) / data.moyenne) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Moyenne période:</span>
              <span className="font-medium text-gray-900">
                {data.moyenne.toLocaleString("fr-FR")} {getUnit(period)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
