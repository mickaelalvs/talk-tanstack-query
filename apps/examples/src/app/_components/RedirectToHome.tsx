"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RedirectToHome = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "@") {
        router.push("/");
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [router]);

  return null;
};
