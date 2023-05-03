import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import useAddTemperatureData from "../../utils/useAddTemperatureData";
import { TemperatureData } from "../../utils/useAddTemperatureData";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import useTemperatureData from "../../utils/useTemperatureData";
import kelvinToCelsius from "../../utils/kelvinToCelsius";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import calculateWarmAndColdDays from "../../utils/calculateWarmAndColdDays";
import calculateMode from "../../utils/calculateMode";
import Select from "../../components/ui/Select";
import useCitiesData from "../../utils/useCitiesData";
import celsiusToKelvin from "../../utils/celsiusToKelvin";

type StatisticsCardType = {
  title: string;
  value: string;
};

export function StatisticsCard({ title, value }: StatisticsCardType) {
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

  const { data: temperatureData, status } = useTemperatureData();

  const { data: citiesData } = useCitiesData();

  const { mutate, isLoading } = useAddTemperatureData();

  const onSubmit: SubmitHandler<TemperatureData> = (data) => {
    const formData = {
      temperature: celsiusToKelvin(Number(data.temperature)),
      location: Number(data.location),
      time: Math.floor(new Date(data.time).getTime()),
    };

    mutate(formData, { onSuccess: () => reset() });
  };

  const averageTemperature = temperatureData ? temperatureData.reduce((acc, curr) => acc + curr.temperature, 0) / temperatureData.length : 0;

  const averageTemperatureToCelsisus = averageTemperature ? kelvinToCelsius(averageTemperature) : 0;

  const { coldDays, warmDays } = calculateWarmAndColdDays({ temperatureData });

  let daysAboveAverage = temperatureData ? temperatureData.filter((day) => day.temperature >= averageTemperature).length : 0;

  const mostCommonTemperature = calculateMode({ temperatureData });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Add new weather data</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Select intent={errors.location ? "error" : "primary"} {...register("location", { required: true })} placeholder="Select a city" id="citySelect" errorMessage="City is required" label="Location" fullWidth>
              {citiesData?.map((city) => (
                <option className="bg-gray-800 text-gray-50" value={city.id} key={city.id}>
                  {city.city_name}
                </option>
              ))}
            </Select>

            <Input intent={errors.time ? "error" : "primary"} {...register("time", { required: true })} fullWidth id="locationInput" type="date" errorMessage="Date is required" placeholder="2022-05-25">
              Date
            </Input>

            <Input intent={errors.temperature ? "error" : "primary"} {...register("temperature", { required: true })} fullWidth id="locationInput" type="text" errorMessage="Temperature is required" placeholder="32.5°C">
              Temperature
            </Input>
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
      {temperatureData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StatisticsCard title="Average temperature" value={`${averageTemperatureToCelsisus}°C`} />
          <StatisticsCard title="Cold days" value={`${coldDays}`} />
          <StatisticsCard title="Warm days" value={`${warmDays}`} />
          <StatisticsCard title="Days above average" value={`${daysAboveAverage}`} />
          <StatisticsCard title="Most common temperature" value={`${mostCommonTemperature}°C`} />
        </div>
      )}
    </div>
  );
}
