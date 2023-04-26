import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        <img src="/404.svg" className="w-56" alt="Page not found" />
        <h1 className="text-4xl font-bold">Page not found!</h1>
        <Button href="/">Go to home</Button>
      </div>
    </main>
  );
}
