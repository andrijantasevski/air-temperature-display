import { useQuery } from "@tanstack/react-query";

type City = {
  id: number;
  city_name: string;
};

export default function useCitiesData() {
  async function fetchCitiesData() {
    const res = await fetch("https://server.andrijantasevski.workers.dev/api/cities");

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    return res.json();
  }

  return useQuery<City[]>({ queryFn: fetchCitiesData, queryKey: ["city"] });
}
