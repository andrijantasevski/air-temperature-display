import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import DashboardStatistics from "./statistics";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("https://server.andrijantasevski.workers.dev/api/temperatures", async (req, res, ctx) => {
    if (req.url.searchParams.has("startDate") && req.url.searchParams.has("endDate")) {
      return res(ctx.delay(1000), ctx.status(200), ctx.json([]));
    }

    return res(
      ctx.delay(0),
      ctx.status(200),
      ctx.json([
        { id: 181, temperature: 288, location: 1, time: 1571176800000, city: { city_name: "Maribor" } },
        { id: 182, temperature: 286.5, location: 1, time: 1571263200000, city: { city_name: "Maribor" } },
        { id: 183, temperature: 287.6, location: 1, time: 1571349600000, city: { city_name: "Maribor" } },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("statistics", () => {
  it("clear filters button is disabled", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <DashboardStatistics />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const clearFiltersButton = screen.getByRole("button", { name: /clear filters/i });

    expect(clearFiltersButton).toHaveAttribute("disabled");

    queryClient.unmount();
  });

  it("should submit data from inputs", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <DashboardStatistics />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const startDate = "2022-04-01";
    const endDate = "2022-04-30";

    const startDateInput = screen.getByLabelText(/start date/i);
    const endDateInput = screen.getByLabelText(/end date/i);

    const filterByDatesButton = screen.getByRole("button", { name: /filter by dates/i });

    await waitForElementToBeRemoved(() => screen.getByRole("status"));

    await userEvent.type(startDateInput, startDate);
    await userEvent.type(endDateInput, endDate);

    expect(startDateInput).toHaveValue(startDate);
    expect(endDateInput).toHaveValue(endDate);

    await userEvent.click(filterByDatesButton);

    await waitForElementToBeRemoved(() => screen.getByRole("status"));

    queryClient.unmount();
  });
});
