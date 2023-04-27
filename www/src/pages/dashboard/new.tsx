import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormInputs {
  location: string;
  date: Date;
  temperature: string;
}

export default function DashboardNew() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Add new weather data</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-6">
          <Input intent={errors.location ? "error" : "primary"} {...register("location", { required: true })} fullWidth id="locationInput" type="text" errorMessage="Location is required" placeholder="Celje">
            Location
          </Input>

          <Input intent={errors.date ? "error" : "primary"} {...register("date", { required: true })} fullWidth id="locationInput" type="date" errorMessage="Date is required" placeholder="2022-05-25">
            Date
          </Input>

          <Input intent={errors.temperature ? "error" : "primary"} {...register("temperature", { required: true })} fullWidth id="locationInput" type="text" errorMessage="Temperature is required" placeholder="32.5">
            Temperature
          </Input>
        </div>

        <div>
          <Button size="l" type="submit" fullWidth>
            Add data
          </Button>
        </div>
      </form>
    </div>
  );
}
