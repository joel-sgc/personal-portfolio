import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export function parseBoldText(input: string) {
  const result = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(input)) !== null) {
    // Add the non-highlighted part before the current match
    if (match.index > lastIndex) {
      result.push({
        string: input.slice(lastIndex, match.index),
        bold: false,
      });
    }

    // Add the highlighted part from the match
    result.push({
      string: match[1], // Content inside `||...||`
      bold: true,
    });

    // Update lastIndex to the end of the current match
    lastIndex = regex.lastIndex;
  }

  // Add any remaining non-highlighted part after the last match
  if (lastIndex < input.length) {
    result.push({
      string: input.slice(lastIndex),
      bold: false,
    });
  }

  return result;
}
