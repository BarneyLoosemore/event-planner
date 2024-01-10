import type { Event } from "@prisma/client";

export const EventCard = ({
  title,
  // image,
  description,
  location,
  date,
}: Event) => (
  <article className="border-white border-2 p-8">
    <h3>{title}</h3>
    {/* <Image src={image} alt={title} width={500} height={500} /> */}
    <p>{description.slice(0, 10)}...</p>
    <p>{location}</p>
    <p>{date.toDateString()}</p>
  </article>
);
