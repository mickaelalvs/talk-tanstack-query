import { Button } from "@/components/ui/button";
import { SortField } from "../page";

interface SortButtonProps {
  field: SortField;
  children: React.ReactNode;
  handleSort: (field: SortField) => void;
}

export const SortButton = ({ field, children, handleSort }: SortButtonProps) => (
  <Button
    variant="ghost"
    size="sm"
    className="h-8 px-2 lg:px-3 cursor-pointer justify-start"
    onClick={() => handleSort(field)}
  >
    {children}
  </Button>
);

