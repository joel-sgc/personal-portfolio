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

export const getImage = (path: string): string => {
  const imageModules = import.meta.glob(
    '/src/assets/**/*.{jpeg,jpg,png,gif,webp,svg}',
    {
      query: { meta: true },
      import: 'default',
      eager: true,
    }
  );

  // Normalize path for different OS environments
  const normalizedPath = path.replace(/\\/g, '/');

  // Find the matching image in all assets
  const match = Object.entries(imageModules).find(([filePath]) =>
    filePath.includes(normalizedPath)
  );

  if (!match) {
    const availableImages = Object.keys(imageModules).map((p) =>
      p.replace('/src/assets/', '')
    );
    console.error('Image not found:', normalizedPath);
    console.error('Available images:', availableImages);
    throw new Error(`Image not found: ${normalizedPath}`);
  }

  return match[1] as string;
};
