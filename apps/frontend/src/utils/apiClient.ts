
export const BASE_URL = 'http://localhost:3000/api';
export const NEO4J_URL = 'http://localhost:3001/api';


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
): Promise<TResponse | null> {
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

  try {
    const response = await fetch(`${base}${endpoint}`, fetchOptions);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    return null;
  }
}

