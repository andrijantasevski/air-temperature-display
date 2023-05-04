import { useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import kelvinToCelsius from "../../utils/kelvinToCelsius";
import { TemperatureData } from "../../utils/useAddTemperatureData";
import useTemperatureData from "../../utils/useTemperatureData";
import { useReactTable, createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";

const columnHelper = createColumnHelper<TemperatureData>();

const columns = [
  columnHelper.accessor("city.city_name", {
    cell: (info) => info.getValue(),
    header: () => <span>Location</span>,
  }),
  columnHelper.accessor("temperature", {
    cell: (info) => kelvinToCelsius(info.getValue()),
    header: () => <span>Temperature</span>,
  }),
  columnHelper.accessor("time", {
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    header: () => <span>Time</span>,
  }),
];

export default function DashboardOverview() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageIndex = searchParams.get("pageIndex");

  const { data } = useTemperatureData();

  const { getHeaderGroups, getRowModel, getPageCount, getState, previousPage, nextPage, getCanNextPage, getCanPreviousPage } = useReactTable({
    data: data ?? [],
    columns,
    initialState: {
      pagination: {
        pageIndex: Number(pageIndex) ?? 0,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  function prevTablePage() {
    setSearchParams({ pageIndex: String(getState().pagination.pageIndex - 1) });
    previousPage();
  }

  function nextTablePage() {
    setSearchParams({ pageIndex: String(getState().pagination.pageIndex + 1) });
    nextPage();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Table overview</h1>

        <div className="border border-transparent rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-500">
            <thead className="bg-gray-800">
              {getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-50" key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-500 bg-gray-700 rounded-lg">
              {getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-100" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center">
          <div>
            Page {getState().pagination.pageIndex + 1} of {getPageCount()}
          </div>

          <div className="flex items-center gap-4">
            <Button intent={!getCanPreviousPage() ? "disabled" : "primary"} disabled={!getCanPreviousPage()} onClick={prevTablePage}>
              Prev
            </Button>
            <Button intent={!getCanNextPage() ? "disabled" : "primary"} disabled={!getCanNextPage()} onClick={nextTablePage}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
