import type { Pages } from "./types";

export function printReport(pages: Pages): void {
  console.log('~~~~~~~~~~~~~~~~~~~~~');
  console.log('REPORT');
  console.log('~~~~~~~~~~~~~~~~~~~~~');
  Object.entries(pages)
    .sort(([a], [b]) => pages[b] - pages[a])
    .forEach(([key, value]) => {
      console.log(`Found ${ value } internal links to ${ key }`);
    });
}
