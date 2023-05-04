import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import Dashboard from "./pages/dashboard";
import DashboardNew from "./pages/dashboard/new";
import DashboardStatistics from "./pages/dashboard/statistics";
import DashboardOverview from "./pages/dashboard/overview";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-950 text-gray-50">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="new" element={<DashboardNew />} />
                <Route path="statistics" element={<DashboardStatistics />} />
                <Route path="overview" element={<DashboardOverview />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default App;
