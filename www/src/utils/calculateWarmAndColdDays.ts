import { TemperatureData } from "./useAddTemperatureData";

type Arguments = {
  temperatureData: TemperatureData[] | undefined;
};

export default function calculateWarmAndColdDays(args: Arguments) {
  const { temperatureData } = args;

  const warmTemperature = 290;

  let coldDays = 0;
  let warmDays = 0;

  temperatureData?.forEach((day) => {
    if (day.temperature <= warmTemperature) {
      coldDays++;
    } else {
      warmDays++;
    }
  });

  return {
    coldDays,
    warmDays,
  };
}
