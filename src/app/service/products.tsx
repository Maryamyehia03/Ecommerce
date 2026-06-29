const getApiBaseUrl = () => process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://ecommerce.routemisr.com";

export async function getProducts() {
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/v1/products`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      return [];
    }

    const { data } = await res.json();
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getSpecficProducts(id: string) {
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/v1/products/${id}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      return null;
    }

    const { data } = await res.json();
    return data ?? null;
  } catch {
    return null;
  }
}


