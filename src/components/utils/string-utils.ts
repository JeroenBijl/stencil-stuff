
/**
 * Pad the end of {string} with {filler} up to {length} characters
 */
export function padEnd(value: string = '', length: number = 0, filler: string): string {
  let padded = value;

  while (padded.length < length) {
    padded = `${padded}${filler}`;
  }

  return padded;
}

/**
 * Pad the start of {string} with {filler} up to {length} characters
 */
export function padStart(value: string = '', length: number = 0, filler: string): string {
  let padded = value;

  while (padded.length < length) {
    padded = `${filler}${padded}`;
  }

  return padded;
}
