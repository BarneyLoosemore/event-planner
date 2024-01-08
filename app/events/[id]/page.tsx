export default function EventDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <main>
      <h1>Event {id}</h1>
    </main>
  );
}

// export const generateStaticParams = async () => {};
