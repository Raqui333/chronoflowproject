export default async function Home() {
  const response = await fetch('http://localhost:5000');
  const text = response.text();

  return (
    <div className="dark:bg-background h-screen flex items-center justify-center">
      <h1 className="text-4xl">{text}</h1>
    </div>
  );
}
