import { useMutation } from "@tanstack/react-query";
import { createAppointment } from "../../itinerant-healthcare/_services/create-appointment";
import { Appointment } from "../../../lib/database";

export const useCreateAppointmentMutation = () => {
  return useMutation({
    mutationFn: createAppointment,
    onSuccess: (data, _variables, _result, context) => {
      context.client.setQueryData(
        ["appointments"],
        (old: Appointment[] | undefined) => {
          if (!old) return [data];

          const filteredOld = old.filter((apt) => !apt.id.startsWith("temp-"));
          const updated = [...filteredOld, data];
          return updated;
        },
      );
    },
    onError: (_err, _data, result, context) => {
      if (
        result &&
        typeof result === "object" &&
        "previousAppointments" in result &&
        result.previousAppointments
      ) {
        context.client.setQueryData(
          ["appointments"],
          result.previousAppointments as Appointment[],
        );
      }
    },
    onMutate: async (variables, context) => {
      await context.client.cancelQueries({ queryKey: ["appointments"] });
      const previousAppointments = context.client.getQueryData([
        "appointments",
      ]);

      const optimisticAppointment = {
        patient: variables.patient,
        location: variables.location,
        date: variables.date,
        time: variables.time,
        type: variables.type as Appointment["type"],
        status: "confirmed",
        notes: variables.notes,
      };

      context.client.setQueryData(
        ["appointments"],
        (old: Appointment[] | undefined) => {
          const updated = old
            ? [...old, optimisticAppointment]
            : [optimisticAppointment];
          console.log("Optimistic update applied:", updated);
          return updated;
        },
      );

      return { previousAppointments };
    },
  });
};
