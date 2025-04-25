import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Updated apiRequest to support both string and object parameters
export async function apiRequest(
  urlOrConfig: string | { url: string; method?: string; data?: any },
  options?: { method?: string; data?: any }
): Promise<Response> {
  let url: string;
  let method: string = 'GET';
  let data: any = undefined;

  // Handle string or object parameter
  if (typeof urlOrConfig === 'string') {
    url = urlOrConfig;
    if (options) {
      method = options.method || 'GET';
      data = options.data;
    }
  } else {
    // Handle object parameter
    url = urlOrConfig.url;
    method = urlOrConfig.method || 'GET';
    data = urlOrConfig.data;
  }

  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
