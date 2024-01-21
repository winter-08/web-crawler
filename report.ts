import type { Pages } from "./types";

export function printReport(pages: Pages): void {
  Object.entries(pages)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .forEach(([key, value]) => {
      console.log(`Found ${ value } internal links to ${ key }`);
    });
}
