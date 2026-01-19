// src/lib/api.ts
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export function getToken() {
  return localStorage.getItem("acc_token");
}

export function setToken(token: string) {
  localStorage.setItem("acc_token", token);
}

export function clearToken() {
  localStorage.removeItem("acc_token");
}

export async function devLogin(email: string, name: string) {
  const res = await fetch(`${API_BASE}/api/auth/dev-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`dev-login failed: ${text}`);
  }

  const data = await res.json();
  if (data?.token) setToken(data.token);
  return data;
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }

  return res.json();
}
