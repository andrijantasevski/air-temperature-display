import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export type TemperatureData = {
  location: number;
  time: number;
  temperature: number;
  city: {
    city_name: string;
  };
};

export type TemperatureDataInputs = Omit<TemperatureData, "city">;

export default function useAddTemperatureData() {
  const queryClient = useQueryClient();

  async function postTemperatureData(data: TemperatureDataInputs) {
    const response = await fetch("https://server.andrijantasevski.workers.dev/api/temperatures", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataResponse = await response.json();

    return dataResponse;
  }

  return useMutation<TemperatureDataInputs, Error, TemperatureDataInputs>({
    mutationFn: (data) => postTemperatureData(data),
    onSuccess: () => {
      toast.success("Temperature data added successfully!", {
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#1F2937",
          color: "#f9fafb",
        },
        duration: 1500,
      });

      queryClient.invalidateQueries(["temperature"]);
    },
    onError: () => {
      toast.error("There was an error while adding the temperature!", {
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#1F2937",
          color: "#f9fafb",
        },
        duration: 1500,
      });
    },
  });
}
