"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section>
      <h2>Sorry, something went wrong :(</h2>
      <p className="text-red-800">{error.message}</p>
      <button onClick={reset}>Try again</button>
    </section>
  );
}
