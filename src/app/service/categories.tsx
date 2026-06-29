const getApiBaseUrl = () => process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://ecommerce.routemisr.com";

export async function getCategories() {
    try {
        const res = await fetch(`${getApiBaseUrl()}/api/v1/categories`, { cache: 'no-store' });
        if (!res.ok) {
            return { data: [] };
        }

        const payload = await res.json();
        const data = Array.isArray(payload) ? payload : payload?.data ?? [];

        return { data };
    } catch {
        return { data: [] };
    }
}
