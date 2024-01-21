export function normalizeURL(url: string): string {
 //var normalizedURL = "";
 const address = new URL(url);
 console.log(address.host);
 console.log(address.pathname);
 //console.log(address.pathname.slice(-1));
 //console.log(address.pathname.slice(0, -1));
 const path = address.pathname.slice(-1) == "/" ? address.pathname.slice(0, -1) : address.pathname;
 console.log(path);
 return `${ address.host }${ path }`;
 /*address.
 if(url.slice(-1) == "/") {
   normalizedURL = url.slice(0, -1);
 } else {
   normalizedURL = url;
 }
 return normalizedURL;
 */
}


