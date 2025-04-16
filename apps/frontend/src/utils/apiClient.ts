
const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000/api';
const NEO4J_URL = import.meta.env.VITE_RCMND_API_URL || 'http://localhost:3001/api';


type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions<T = unknown> {
  method?: HttpMethod;
  body?: T;
  headers?: Record<string, string>;
  authToken?: string;
}

export async function apiRequest<TResponse = any, TBody = any>(
  endpoint: string,
  options: RequestOptions<TBody> = {},
  isNeo4j = false,
): Promise<TResponse> {
  const { method = 'GET', body, headers = {}, authToken } = options;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const base = isNeo4j ? NEO4J_URL : BASE_URL;

  const response = await fetch(`${base}${endpoint}`, fetchOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Request failed');
  }

  return response.json();
}
