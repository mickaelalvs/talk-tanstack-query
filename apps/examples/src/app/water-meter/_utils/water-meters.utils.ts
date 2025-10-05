export const getPeriodLabel = (period: string) => {
  switch (period) {
    case "today":
      return "Aujourd'hui";
    case "week":
      return "Cette Semaine";
    case "month":
      return "Ce Mois";
    case "semester":
      return "Ce Semestre";
    default:
      return "Période";
  }
};

export const getUnit = (period: string) => {
  switch (period) {
    case "today":
      return "L/h";
    case "week":
      return "L/jour";
    case "month":
      return "L/jour";
    case "semester":
      return "L/mois";
    default:
      return "L";
  }
};
