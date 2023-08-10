export const fetcher = (url: string) =>
 fetch(`${import.meta.env.VITE_API_HOST}${url}`, {
  method: "GET",
  credentials: "include",
 }).then((r) => r.json());
