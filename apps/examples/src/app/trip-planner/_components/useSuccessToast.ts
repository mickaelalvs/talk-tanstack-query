import { useToast } from "../../../lib/use-toast";

export const useSuccessToast = () => {
  const { toast } = useToast();

  const addToast = (tripName: string, cityCount: number) => {
    toast({
      title: `Voyage créé avec succès !`,
      description: `Le voyage "${tripName}" a été créé avec ${cityCount} ville${cityCount > 1 ? "s" : ""}.`,
      variant: "success",
    });
  };

  return { addToast };
};
