import { useQuery } from "@tanstack/react-query";
import { TemperatureData } from "./useAddTemperatureData";

export default function useTemperatureData() {
  async function fetchTemperatureData() {
    const res = await fetch("https://server.andrijantasevski.workers.dev/api/temperatures");

    if (!res.ok) {
      throw new Error("There was an error fetching the data!");
    }

    return res.json();
  }

  return useQuery<TemperatureData[]>({ queryFn: fetchTemperatureData, queryKey: ["temperature"] });
}
