export default function EventDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <h2>Event {id}</h2>;
}

// export const generateStaticParams = async () => {};
