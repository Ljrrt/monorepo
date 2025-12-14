type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function backendRequest<T>(method: HttpMethod, path: string, body?: any, signal?: AbortSignal): Promise<T>  {
  const baseUrl: string = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '');

  if (!baseUrl) {
    throw new Error('Backend API base URL not configured (VITE_BACKEND_URL)');
  }

  const url = `${baseUrl}${path}`;

  const response = await fetch(url, {
    method:  method,
    headers: { 'Content-Type': 'application/json' },
    body:    body ? JSON.stringify(body) : undefined,
    signal:  signal,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error((json?.message || json?.error) || response.statusText);
  }

  return json as T;
}
