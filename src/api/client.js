const BASE_URL =  import.meta.env.VITE_API_BASE_URL ?? "https://api.artic.edu/api/v1";

const USER_AGENT = import.meta.env.VITE_AIC_USER_AGENT ?? "ctd-pre-work (exampel@example.com)";

const HTTP_ERROR_MESSAGE = {
    404: "Not found",
    429: "Too many requests",
};

function buildQuery(params) {
    if (!params) return "";
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null || value === "") continue;
        search.append(key, String(value));
    }
    const str = search.toString();
    return str ? `?${str}` : "";
}

export function buildUrl(path, params) {
    return `${BASE_URL}${path}${buildQuery(params)}`;
}

export async function fetchJson(path, { params, signal }) {
    const url = buildUrl(path, params);

    let response;
    try {
        response = await fetch(url, {
            signal,
            headers: { "AIC-User-Agent": USER_AGENT },
        });
    } catch (cause) {
        if (cause?.name === "AbortError") throw cause;
        throw new Error("Network error", { cause });
    }

    if (!response.ok) {
        const message =
            HTTP_ERROR_MESSAGE[response.status] ??
            `Request failed: ${response.status}`;
        throw new Error(message);
    }

    return response.json();
}

