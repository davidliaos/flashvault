/** Same-origin proxy path so Ruffle can fetch archive.org SWFs without CORS. */
export function getPlayableSwfUrl(swfUrl: string): string {
  try {
    const { hostname } = new URL(swfUrl);
    if (hostname === "archive.org" || hostname.endsWith(".archive.org")) {
      return `/api/swf/?url=${encodeURIComponent(swfUrl)}`;
    }
  } catch {
    // Keep original URL if parsing fails.
  }
  return swfUrl;
}
