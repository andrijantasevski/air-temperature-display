import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function DashboardNew() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Add new weather data</h1>

      <form className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-6">
          <Input fullWidth id="locationInput" type="text" errorMessage="Location is required" placeholder="Celje">
            Location
          </Input>

          <Input fullWidth id="locationInput" type="date" errorMessage="Date is required" placeholder="2022-05-25">
            Date
          </Input>

          <Input fullWidth id="locationInput" type="text" errorMessage="Temperature is required" placeholder="32.5">
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
