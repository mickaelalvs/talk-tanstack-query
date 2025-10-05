import { useMutation } from "@tanstack/react-query";
import { deleteAppointment } from "@/app/itinerant-healthcare/_services/delete-appointment";
import type { Appointment } from "@/lib/database";

export const useDeleteAppointmentMutation = () => {
  return useMutation({
    mutationFn: deleteAppointment,
    onSuccess: (_data, variables, _result, context) => {
      // Remove the deleted appointment from the cache
      context.client.setQueryData(
        ["appointments"],
        (old: Appointment[] | undefined) => {
          if (!old) return [];
          return old.filter((apt) => apt.id !== variables);
        },
      );
    },
    onError: (_err, _data, result, context) => {
      // Restore the previous appointments on error
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
      // Cancel any outgoing refetches
      await context.client.cancelQueries({ queryKey: ["appointments"] });

      // Snapshot the previous value
      const previousAppointments = context.client.getQueryData([
        "appointments",
      ]);

      // Optimistically update to the new value
      context.client.setQueryData(
        ["appointments"],
        (old: Appointment[] | undefined) => {
          if (!old) return [];
          return old.filter((apt) => apt.id !== variables);
        },
      );

      // Return a context object with the snapshotted value
      return { previousAppointments };
    },
  });
};
