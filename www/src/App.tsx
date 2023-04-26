import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <head>
        <title>Air temperature</title>
      </head>

      <QueryClientProvider client={queryClient}>
        <div className="text-4xl font-bold">Hello World!</div>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default App;
