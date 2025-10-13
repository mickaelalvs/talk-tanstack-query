import { useQuery } from "@tanstack/react-query";
import { listAppointments } from "../_services/list-appointments";

export const useAppointmentQuery = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: listAppointments,
  });
};
