import prisma from "@/lib/prisma";
import { eventSchema } from "@/lib/schemas/event";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const body = await request.formData();

  const eventBody = Object.fromEntries(body.entries());
  const parsedEvent = eventSchema.safeParse(eventBody);

  if (!parsedEvent.success) {
    return new Response(JSON.stringify(parsedEvent.error), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const event = await prisma.event.create({
    data: parsedEvent.data,
  });

  revalidateTag("events");

  return new Response(JSON.stringify(event), {
    status: 201,
    headers: { "content-type": "application/json" },
  });
}
