import { test, expect } from "bun:test";
import { normalizeURL } from "../crawl.ts";

const cases = [['https://blog.boot.dev/path/', 'blog.boot.dev/path'], ['https://blog.boot.dev/path', 'blog.boot.dev/path'], 
['http://blog.boot.dev/path/', 'blog.boot.dev/path'], ['http://blog.boot.dev/path', 'blog.boot.dev/path']];


test.each(cases)('normalise the url %s to %s', (input: string, expected: string) => {
  expect(normalizeURL(input)).toBe(expected);
});

