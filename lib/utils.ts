import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { digitsFaToEn } from "@persian-tools/persian-tools"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCardNumber(value: string | number) {
  const en = digitsFaToEn(String(value))
  const digits = en.replace(/\D/g, "")
  return digits.replace(/(.{4})/g, "$1 ").trim();
}
