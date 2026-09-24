const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function buildUrl(path) {
  if (!path) return path;
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  return `${API_BASE_URL}${path}`;
}

function normalizePayload(payload) {
  if (payload && typeof payload === "object" && "data" in payload && payload.data !== undefined) {
    return payload.data;
  }

  return payload;
}

export async function apiRequest(path, options = {}) {
  const { method = "GET", body, headers = {}, ...rest } = options;
  const token = typeof window !== "undefined" ? sessionStorage.getItem("goaltrack-token") : null;
  const finalHeaders = { Accept: "application/json", ...headers };
  if (token && !finalHeaders.Authorization) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  const requestBody = body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined;

  if (requestBody && !(body instanceof FormData) && !finalHeaders["Content-Type"]) {
    finalHeaders["Content-Type"] = "application/json";
  }

  const response = await fetch(buildUrl(path), {
    method,
    credentials: "include",
    headers: finalHeaders,
    body: requestBody,
    cache: "no-store",
    ...rest,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    const errorMessage =
      payload && typeof payload === "object" && payload.message
        ? payload.message
        : "Something went wrong. Please try again.";

    const fieldErrors = payload && typeof payload === "object" && payload.errors
      ? Object.values(payload.errors).join(" ").trim()
      : "";
    const error = new Error(fieldErrors ? `${errorMessage} ${fieldErrors}` : errorMessage);
    error.status = response.status;
    throw error;
  }

  return normalizePayload(payload);
}

export const api = {
  get: (path, options) => apiRequest(path, { ...options, method: "GET" }),
  post: (path, body, options) => apiRequest(path, { ...options, method: "POST", body }),
  put: (path, body, options) => apiRequest(path, { ...options, method: "PUT", body }),
  patch: (path, body, options) => apiRequest(path, { ...options, method: "PATCH", body }),
  del: (path, options) => apiRequest(path, { ...options, method: "DELETE" }),
};
