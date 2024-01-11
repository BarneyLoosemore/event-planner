import { EventDetail } from "@/components/event-detail";

export default async function EventDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <EventDetail id={id} />;
}

// export const generateStaticParams = async () => {};
