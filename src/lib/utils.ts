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

  console.log(errors);

  const errorMessages = errors.split("|").map((error) => error.trim());
  errorMessages.forEach((error) => {
    toast.error(error);
  });
}

export function formatNepaliCurrency(value: number | string): string {
  // Ensure the input is a valid number
  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numericValue)) return "Invalid Number";

  const isNegative = numericValue < 0;
  const strValue = Math.abs(numericValue).toFixed(2); // Ensure two decimal places
  const [integerPart, decimalPart] = strValue.split(".");

  let nepaliFormatted = "";
  let remainingPart = integerPart;

  // Add the first group of 3 digits
  if (remainingPart.length > 3) {
    nepaliFormatted = remainingPart.slice(-3);
    remainingPart = remainingPart.slice(0, -3);
  } else {
    nepaliFormatted = remainingPart;
    remainingPart = "";
  }

  // Add groups of 2 digits separated by commas
  while (remainingPart.length > 0) {
    nepaliFormatted = remainingPart.slice(-2) + "," + nepaliFormatted;
    remainingPart = remainingPart.slice(0, -2);
  }

  // Add negative sign if the original value was negative
  if (isNegative) nepaliFormatted = "-" + nepaliFormatted;

  // Combine the formatted integer part with the decimal part
  return `Rs. ${nepaliFormatted}.${decimalPart}`;
}
