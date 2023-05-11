import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import calculateMode from "../../utils/calculateMode";
import calculateWarmAndColdDays from "../../utils/calculateWarmAndColdDays";
import kelvinToCelsius from "../../utils/kelvinToCelsius";
import useThrottle from "../../utils/useThrottle";
import useFilterTemperatureData from "../../utils/useFilterTemperatureData";
import { StatisticsCard } from "./new";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

type FormInputs = {
  startDate: string;
  endDate: string;
};

export default function DashboardStatistics() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      startDate: searchParams.get("startDate") ?? "",
      endDate: searchParams.get("endDate") ?? "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setSearchParams(data);
  };

  const throttledOnSubmit = useThrottle(onSubmit, 300);

  const { data: temperatureData, status } = useFilterTemperatureData(searchParams);

  const averageTemperature = temperatureData ? temperatureData.reduce((acc, curr) => acc + curr.temperature, 0) / temperatureData.length : 0;

  const averageTemperatureToCelsisus = averageTemperature ? kelvinToCelsius(averageTemperature) : 0;

  const { coldDays, warmDays } = calculateWarmAndColdDays({ temperatureData });

  let daysAboveAverage = temperatureData ? temperatureData.filter((day) => day.temperature >= averageTemperature).length : 0;

  const mostCommonTemperature = calculateMode({ temperatureData });

  const isSearchParams = searchParams.get("startDate") && searchParams.get("endDate");

  function clearFilters() {
    reset();
    setSearchParams("");
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Statistics</h1>

        <form onSubmit={handleSubmit(throttledOnSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input intent={errors.startDate ? "error" : "primary"} {...register("startDate", { required: true })} fullWidth id="startDateInput" type="date" errorMessage="Start date is required" placeholder="2022-05-25">
              Start date
            </Input>

            <Input intent={errors.endDate ? "error" : "primary"} {...register("endDate", { required: true })} fullWidth id="endDateInput" type="date" errorMessage="End date is required" placeholder="2022-05-26">
              End date
            </Input>
          </div>

          <div className="flex gap-6">
            <Button size="l" type="submit" fullWidth>
              <div className="flex items-center gap-2">Filter by dates</div>
            </Button>

            <Button intent={isSearchParams ? "primary" : "disabled"} disabled={!isSearchParams} onClick={clearFilters} size="l" type="button" fullWidth>
              Clear filters
            </Button>
          </div>
        </form>
      </div>

      {status === "loading" && <LoadingSkeleton size={5} />}

      {temperatureData && temperatureData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StatisticsCard title="Average temperature" value={`${averageTemperatureToCelsisus}°C`} />
          <StatisticsCard title="Cold days" value={`${coldDays}`} />
          <StatisticsCard title="Warm days" value={`${warmDays}`} />
          <StatisticsCard title="Days above average" value={`${daysAboveAverage}`} />
          <StatisticsCard title="Most common temperature" value={`${mostCommonTemperature}°C`} />
        </div>
      )}

      {temperatureData && temperatureData?.length === 0 && <div>No dates for the selected range.</div>}
    </div>
  );
}
