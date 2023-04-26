import Button from "../components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        <img src="/logo.svg" className="w-24" alt="Logo" />
        <h1 className="text-4xl font-bold">Breeze</h1>
        <p className="text-gray-400">Air temperature display</p>
        <Button href="/dashboard">Get started</Button>
      </div>
    </main>
  );
}
