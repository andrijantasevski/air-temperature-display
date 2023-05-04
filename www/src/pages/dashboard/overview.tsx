import kelvinToCelsius from "../../utils/kelvinToCelsius";
import useTemperatureData from "../../utils/useTemperatureData";

export default function DashboardOverview() {
  const { data: temperatureData } = useTemperatureData();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Table overview</h1>

        <div className="border border-transparent rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-500">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-50 sm:pl-6"></th>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-50 sm:pl-6">
                  Location
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-50">
                  Temperature
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-50">
                  Time
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500 bg-gray-700 rounded-lg">
              {temperatureData?.map((day, index) => (
                <tr key={day.time}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-100 sm:pl-6">{index + 1}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-100">{day.location}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-100">{kelvinToCelsius(day.temperature)}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-100">{new Date(day.time).toLocaleDateString()}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a href="#" className="text-primary-400 hover:text-primary-500">
                      Edit<span className="sr-only">, </span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
