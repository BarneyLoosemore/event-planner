export default function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // TODO: replace with db call
  return <h2>Event {params.id}</h2>;
}

// export const generateStaticParams = async () => {};
