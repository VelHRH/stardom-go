export const fetcher = (url: string) =>
 fetch(`${import.meta.env.VITE_API_HOST}${url}`, {
  method: "GET",
  credentials: "include",
 }).then((r) => r.json());

export function createColors() {
 const nColors = 20;
 const data = [];
 const backgroundColors = [];
 for (let i = nColors; i >= 0; i--) {
  const green = Math.round((i / nColors) * 255);
  const red = Math.round(((nColors - i) / nColors) * 255);

  data.push(i);
  backgroundColors.push(`rgb(${red}, ${green}, 50)`);
 }

 return backgroundColors;
}

export function ratingColor({ rating }: { rating: number }) {
 return createColors()[20 - rating * 4];
}
