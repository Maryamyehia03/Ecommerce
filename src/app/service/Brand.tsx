export async function gatAllBrand() {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/brands`;
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    // Provide a clear error during build so you can set the env var in Vercel
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined. Set it in your environment or Vercel project settings.');
  }

  const res = await fetch(url, {
    // ensure this request runs at build/prerender time
    cache: 'no-store',
  });

  // If response is not ok, collect text to include in the thrown error (may be HTML from an error page)
  if (!res.ok) {
    const text = await res.text();
    // If the server returned HTML (starts with '<'), surface a helpful message
    if (text.trim().startsWith('<')) {
      throw new Error(`Failed to fetch brands from ${url}. Server returned HTML (likely an error page). Ensure the API endpoint is reachable during build. HTML snippet: ${text.slice(0, 200)}`);
    }
    // otherwise try to parse JSON error body
    let jsonErr = null;
    try {
      jsonErr = JSON.parse(text);
    } catch (error) {
      console.error(error);
    }
    throw new Error(`Failed to fetch brands from ${url}. Status: ${res.status}. ${jsonErr ? JSON.stringify(jsonErr) : 'Response: ' + text}`);
  }

  // Verify content-type before parsing as JSON to avoid 'Unexpected token <' errors
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await res.text();
    throw new Error(`Expected JSON response from ${url} but received '${contentType}'. Response snippet: ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  return data;
}