import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import useAddTemperatureData, {
  TemperatureDataInputs,
} from "../../utils/useAddTemperatureData";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import useTemperatureData from "../../utils/useTemperatureData";
import kelvinToCelsius from "../../utils/kelvinToCelsius";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import calculateWarmAndColdDays from "../../utils/calculateWarmAndColdDays";
import calculateMode from "../../utils/calculateMode";
import Select from "../../components/ui/Select";
import useCitiesData from "../../utils/useCitiesData";
import celsiusToKelvin from "../../utils/celsiusToKelvin";

import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
import { useState } from "react";

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
  } = useForm<TemperatureDataInputs>();

  const { data: temperatureData, status } = useTemperatureData();

  const { data: citiesData } = useCitiesData();

  const { mutate, isLoading } = useAddTemperatureData();

  const onSubmit: SubmitHandler<TemperatureDataInputs> = (data) => {
    const formData = {
      temperature: celsiusToKelvin(Number(data.temperature)),
      location: Number(data.location),
      time: Math.floor(new Date(data.time).getTime()),
    };

    mutate(formData, { onSuccess: () => reset() });
  };

  const averageTemperature = temperatureData
    ? temperatureData.reduce((acc, curr) => acc + curr.temperature, 0) /
      temperatureData.length
    : 0;

  const averageTemperatureToCelsisus = averageTemperature
    ? kelvinToCelsius(averageTemperature)
    : 0;

  const { coldDays, warmDays } = calculateWarmAndColdDays({ temperatureData });

  let daysAboveAverage = temperatureData
    ? temperatureData.filter((day) => day.temperature >= averageTemperature)
        .length
    : 0;

  const mostCommonTemperature = calculateMode({ temperatureData });

  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Add new weather data</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Select
              intent={errors.location ? "error" : "primary"}
              {...register("location", { required: true })}
              placeholder="Select a city"
              id="citySelect"
              errorMessage="City is required"
              label="Location"
              fullWidth
            >
              {citiesData?.map((city) => (
                <option
                  className="bg-gray-800 text-gray-50"
                  value={city.id}
                  key={city.id}
                >
                  {city.city_name}
                </option>
              ))}
            </Select>

            <Input
              intent={errors.time ? "error" : "primary"}
              {...register("time", { required: true })}
              fullWidth
              id="locationInput"
              type="date"
              errorMessage="Date is required"
              placeholder="2022-05-25"
            >
              Date
            </Input>

            <Input
              intent={errors.temperature ? "error" : "primary"}
              {...register("temperature", { required: true })}
              fullWidth
              id="locationInput"
              type="text"
              errorMessage="Temperature is required"
              placeholder="32.5°C"
            >
              Temperature
            </Input>
          </div>

          <div>
            <Button
              disabled={isLoading}
              intent={isLoading ? "loading" : "primary"}
              size="l"
              type="submit"
              fullWidth
            >
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
          <StatisticsCard
            title="Average temperature"
            value={`${averageTemperatureToCelsisus}°C`}
          />
          <StatisticsCard title="Cold days" value={`${coldDays}`} />
          <StatisticsCard title="Warm days" value={`${warmDays}`} />
          <StatisticsCard
            title="Days above average"
            value={`${daysAboveAverage}`}
          />
          <StatisticsCard
            title="Most common temperature"
            value={`${mostCommonTemperature}°C`}
          />
        </div>
      )}

      <div>
        <DayPicker
          selected={selectedDate}
          onSelect={setSelectedDate}
          mode="single"
          className="bg-gray-800 rounded-md inline-flex p-3"
          classNames={{
            months:
              "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            nav_button:
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
            day_selected:
              "bg-gray-700 text-gray-50 hover:bg-gray-800 hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-lg",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle:
              "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
        />
      </div>
    </div>
  );
}
