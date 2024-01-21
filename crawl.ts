import { JSDOM } from "jsdom"
import type { Pages } from "./types";

export function normalizeURL(url: string): string { 
  const address = new URL(url);
  const path = address.pathname.slice(-1) == "/" ? address.pathname.slice(0, -1) : address.pathname;
  return `${ address.host }${ path }`;
}

export function getURLsFromHTML(htmlBody: string, baseURL: string): string[] {
  var urls:string[] = [];
  const dom = new JSDOM(htmlBody);
  const aTags: NodeListOf<HTMLAnchorElement> = dom.window.document.querySelectorAll("a");
  aTags.forEach(e => {
    if(e.href.indexOf('://') > 0 || e.href.indexOf('//') === 0) {
      urls.push(e.href);
    } else {
      urls.push(`${ baseURL }${ e.href }`);
    }
  });
  dom.window.close();
  return urls;
}

//export type Pages = {
//  [key: string]: number;
//}


export async function crawlPage(baseURL: string, currentURL: string, pages: Pages): Promise<Pages | null> {
  const currentBase = new URL(currentURL);
  const normalizedURL = normalizeURL(currentURL);
  if (currentBase.origin != baseURL) {
    console.log('gone off site');
    return pages;
  }
  if (pages[normalizedURL]) {
    pages[normalizedURL]++;
    return pages;
  }
  if (normalizedURL == baseURL) {
    pages[normalizedURL] = 0;
  } else {
    pages[normalizedURL] = 1;
  }
  try {
    const response = await fetch(currentURL);
    if (!response.ok) {
      console.error(`http error: $ { response.status }`);
      return null;
    }
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('text/html')) {
      console.error('Invalid content-type:', contentType);
      return null;
    }

    try {
      const htmlBody = await response.text();
      const urls  = getURLsFromHTML(htmlBody, baseURL);
      for (const url of urls) {
        const newPages: Pages | null = await crawlPage(baseURL, url, pages);
        if (newPages) {
          pages = Object.assign(pages, newPages);
        }
      };
      //console.log(htmlBody);
    } catch (error) {
      console.error('Error reading response body:', error);
      return null;
    }
  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
  //console.log(pages);
  return pages;
}


