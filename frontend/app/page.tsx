export default async function Home() {
  const res = await fetch("http://127.0.0.1:8000/health", { cache: "no-store" });
  const data = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">AquilaSE Dashboard</h1>
      <p className="mt-4">API Status: {data.status}</p>
    </main>
  );
}
