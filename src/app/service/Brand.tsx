export async function gatAllBrand() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseUrl ?? "https://ecommerce.routemisr.com"}/api/v1/brands`;

  if (!baseUrl) {
    console.warn("NEXT_PUBLIC_API_BASE_URL is not defined. Falling back to the public Routemisr API for build/prerender.");
  }

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    return { data: [] };
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return { data: [] };
  }

  const data = await res.json();
  return data;
}