import { clsx } from 'clsx';
import { twMerge } from 'tailwindcss-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
