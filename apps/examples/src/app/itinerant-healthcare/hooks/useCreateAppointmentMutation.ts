import { useMutation } from "@tanstack/react-query";
import { createAppointment } from "../_services/create-appointment";

export const useCreateAppointmentMutation = () => {
  return useMutation({
    mutationFn: createAppointment,
    mutationKey: ["createAppointment"],
    onSuccess: (_data, _variables, _result, context) => {
      context.client.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};
