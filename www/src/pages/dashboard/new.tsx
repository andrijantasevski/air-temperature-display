import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import useAddTemperatureData from "../../utils/useAddTemperatureData";
import { TemperatureData } from "../../utils/useAddTemperatureData";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import useTemperatureData from "../../utils/useTemperatureData";
import kelvinToCelsius from "../../utils/kelvinToFahrenheit";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import SearchCitiesComboBox from "../../components/SearchCitiesCombobox";
import Combobox from "../../components/ui/Combobox";

type StatisticsCardType = {
  title: string;
  value: string;
};

function StatisticsCard({ title, value }: StatisticsCardType) {
  return (
    <div className="bg-gray-800 p-4 w-full rounded-lg flex flex-col gap-2">
      <p className="text-xl">{title}</p>
      <p className="text-2xl font-medium">{value}</p>
    </div>
  );
}

export default function DashboardNew() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TemperatureData>();

  const { data, status } = useTemperatureData();

  const { mutate, isLoading } = useAddTemperatureData();

  const onSubmit: SubmitHandler<TemperatureData> = (data) => {
    const formData = {
      temperature: Number(data.temperature),
      location: Number(data.location),
      time: Math.floor(new Date(data.time).getTime() / 1000),
    };

    mutate(formData, { onSuccess: () => reset() });
  };

  const averageTemperature = data ? data?.reduce((acc, curr) => acc + curr.temperature, 0) / data.length : 0;

  const averageTemperatureToCelsisus = averageTemperature ? kelvinToCelsius(averageTemperature) : 0;

  // TODO
  // REFACTOR CODE

  let coldDays = 0;
  let warmDays = 0;

  data?.forEach((day) => {
    if (day.temperature <= averageTemperature) {
      coldDays++;
    } else {
      warmDays++;
    }
  });

  let daysAboveAverage = data ? data.filter((day) => kelvinToCelsius(day.temperature) >= averageTemperatureToCelsisus).length : 0;

  [
    { id: 1, temperature: 288 },
    { id: 2, temperature: 288 },
  ];

  const countTemperatures: { [key: string]: number } = {};

  data?.forEach((day) => {
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

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Add new weather data</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <Input intent={errors.location ? "error" : "primary"} {...register("location", { required: true })} fullWidth id="locationInput" type="text" errorMessage="Location is required" placeholder="Celje">
              Location
            </Input>

            <Input intent={errors.time ? "error" : "primary"} {...register("time", { required: true })} fullWidth id="locationInput" type="date" errorMessage="Date is required" placeholder="2022-05-25">
              Date
            </Input>

            <Input intent={errors.temperature ? "error" : "primary"} {...register("temperature", { required: true })} fullWidth id="locationInput" type="text" errorMessage="Temperature is required" placeholder="32.5">
              Temperature
            </Input>
            {/* <Combobox /> */}
          </div>

          <div>
            <Button disabled={isLoading} intent={isLoading ? "loading" : "primary"} size="l" type="submit" fullWidth>
              <div className="flex items-center gap-2">
                {isLoading && <LoadingSpinner />}
                {isLoading ? "Adding..." : "Add data"}
              </div>
            </Button>
          </div>
        </form>
      </div>
      {status === "loading" && <LoadingSkeleton size={5} />}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StatisticsCard title="Average temperature" value={`${averageTemperatureToCelsisus}°C`} />
          <StatisticsCard title="Cold days" value={`${coldDays}`} />
          <StatisticsCard title="Warm days" value={`${warmDays}`} />
          <StatisticsCard title="Days above average" value={`${daysAboveAverage}`} />
          <StatisticsCard title="Most common temperature" value={`${kelvinToCelsius(Number(mostCommonTemperature))}°C`} />
        </div>
      )}
    </div>
  );
}
