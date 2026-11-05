const API_BASE = "http://localhost:5000/api";
const SESSION_KEY = "nature_holidays_admin";

export function getAdminSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function saveAdminSession(data) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

export function clearAdminSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export async function adminRequest(path, options = {}) {
  const session = getAdminSession();

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(session?.token
        ? { Authorization: `Bearer ${session.token}` }
        : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) clearAdminSession();
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}
