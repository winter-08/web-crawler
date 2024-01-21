import { crawlPage } from "./crawl";
import { printReport } from "./report";
import type { Pages } from "./types";

async function main() {
  if(Bun.argv.length != 3) {
    console.log('Please provide only 1 input');
    return
  }
  const baseURL: string = Bun.argv[2];
  console.log(`Crawling beginning at '${ baseURL }'`);
  const crawledPages: Pages | null = await crawlPage(baseURL, baseURL, {});
  if (crawledPages != null) {
    printReport(crawledPages);
  }
}

main();
