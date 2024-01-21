export function normalizeURL(url: string): string {
 const address = new URL(url);
 const path = address.pathname.slice(-1) == "/" ? address.pathname.slice(0, -1) : address.pathname;
 return `${ address.host }${ path }`;
}


