import { TemperatureData } from "./useAddTemperatureData";
import kelvinToCelsius from "./kelvinToCelsius";

export default function calculateMode(args: { temperatureData: TemperatureData[] | undefined }) {
  const { temperatureData } = args;

  const countTemperatures: { [key: string]: number } = {};

  temperatureData?.forEach((day) => {
    if (countTemperatures[day.temperature]) {
      countTemperatures[day.temperature]++;
    } else {
      countTemperatures[day.temperature] = 1;
    }
  });

  let mostCommonTemperature = "";

  for (const temperature in countTemperatures) {
    if (mostCommonTemperature === "") {
      mostCommonTemperature = temperature;
    }

    if (countTemperatures[temperature] > countTemperatures[mostCommonTemperature]) {
      mostCommonTemperature = temperature;
    }
  }

  return kelvinToCelsius(Number(mostCommonTemperature));
}
