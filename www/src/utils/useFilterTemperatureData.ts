import { useQuery } from "@tanstack/react-query";
import { TemperatureData } from "./useAddTemperatureData";

export default function useFilterTemperatureData(searchParams: URLSearchParams) {
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const searchQuery = startDate && endDate ? `?startDate=${startDate}&endDate=${endDate}` : "";

  async function fetchCitiesData() {
    const res = await fetch(`https://server.andrijantasevski.workers.dev/api/temperatures${searchQuery}`);

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    return res.json();
  }

  return useQuery<TemperatureData[]>({ queryFn: fetchCitiesData, queryKey: ["city", startDate, endDate] });
}
