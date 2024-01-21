import { test, expect } from "bun:test";
import { normalizeURL } from "../crawl.ts";
import { getURLsFromHTML } from "../crawl.ts";

const urlCases = [['https://blog.boot.dev/path/', 'blog.boot.dev/path'], ['https://blog.boot.dev/path', 'blog.boot.dev/path'], 
['http://blog.boot.dev/path/', 'blog.boot.dev/path'], ['http://blog.boot.dev/path', 'blog.boot.dev/path']];


test.each(urlCases)('normalise the url %s to %s', (input: string, expected: string) => {
  expect(normalizeURL(input)).toBe(expected);
});

const htmlCases: [string, string, string[]][] = [];
htmlCases.push([`<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
</html>
`, 'https://blog.boot.dev', ['https://blog.boot.dev/']]);

test.each(htmlCases)('parse html urls', (html: string, url: string, expected: string[]) => {
  expect(getURLsFromHTML(html, url)).toEqual(expected);
})
