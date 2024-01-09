"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  <>
    <h2>Sorry, something went wrong creating a new event!</h2>
    <p className="text-red-800">{error.message}</p>
    <button onClick={reset}>Try submitting again</button>
  </>;
}
