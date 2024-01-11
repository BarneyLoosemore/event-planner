import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const dates = [2021, 2022, 2023, 2024, 1999, 2000, 2001];
const locations = ["London", "Paris", "New York", "Berlin", "Tokyo", "Beijing"];
const titles = [
  "Crazy Event",
  "Eventy Opening Party",
  // "Eventy Launch",
  // "Eventy After Party",
  // "Friday Drinks",
];
const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

const main = async () => {
  for (const date of [2024, 2001]) {
    for (const location of locations.slice(0, 1)) {
      for (const title of titles) {
        await prisma.event.create({
          data: {
            date: new Date(
              date,
              Math.random() * 12 + 1,
              Math.random() * 28 + 1,
            ),
            description,
            location,
            title,
          },
        });
      }
    }
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
