import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import DashboardStatistics from "./statistics";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    const endDate = "2022-04-31";

    const startDateInput = screen.getByLabelText("Start date");
    const endDateInput = screen.getByLabelText("End date");

    const filterByDatesButton = screen.getByRole("button", { name: /filter by dates/i });

    await waitForElementToBeRemoved(() => screen.getByRole("status"));

    await userEvent.type(startDateInput, startDate);
    await userEvent.type(endDateInput, endDate);

    await userEvent.click(filterByDatesButton);

    queryClient.unmount();
  });
});
