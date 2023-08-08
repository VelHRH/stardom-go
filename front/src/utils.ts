export const fetcher = (url: string) =>
 fetch(`${import.meta.env.VITE_API_HOST}${url}`).then((r) => r.json());
