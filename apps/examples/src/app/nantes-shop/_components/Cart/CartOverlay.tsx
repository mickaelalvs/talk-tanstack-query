"use client";

interface CartOverlayProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const CartOverlay = ({ setIsOpen }: CartOverlayProps) => {
  return (
    <button
      type="button"
      className="fixed inset-0 z-40"
      onClick={() => setIsOpen(false)}
    />
  );
};
