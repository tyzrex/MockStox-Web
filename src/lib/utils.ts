import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeKeyCleaner(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function showErrorToasts(errors: string) {
  if (!errors) {
    return;
  }

  const errorMessages = errors.split("|").map((error) => error.trim());
  errorMessages.forEach((error) => {
    toast.error(error);
  });
}
