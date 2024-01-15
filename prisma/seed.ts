import { Event, PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

const EVENT_COUNT = 40;
const USER_COUNT = 10;
const EVENT_ATTENDANCES_COUNT = 40;

const USER_NAMES = ["Bob", "Barney", "Xavier", "Sola", "Tilly", "Rosa"];
const DATES = [2021, 2022, 2023, 2024, 2001];
const LOCATIONS = ["London", "Paris", "New York", "Berlin", "Tokyo", "Beijing"];
const TITLES = [
  "Crazy Event",
  "Eventy Opening Party",
  "Eventy Launch",
  "Eventy After Party",
  "Friday Drinks",
];
const DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const pickRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const createUser = async () => {
  const name = pickRandom(USER_NAMES);
  return prisma.user.upsert({
    where: {
      name,
    },
    update: {
      name,
    },
    create: {
      name,
    },
  });
};

const createEvent = async (user: User) => {
  const date = pickRandom(DATES);
  const location = pickRandom(LOCATIONS);
  const title = pickRandom(TITLES);
  return prisma.event.create({
    data: {
      creatorId: user.id,
      date: new Date(date, Math.random() * 12 + 1, Math.random() * 28 + 1),
      description: DESCRIPTION,
      location,
      title,
      image: `https://picsum.photos/id/${Math.floor(
        Math.random() * 50,
      )}/600/400`,
    },
  });
};

const createAttendance = async (user: User, event: Event) => {
  await prisma.eventAttendance.upsert({
    where: {
      eventId_attendeeId: {
        attendeeId: user.id,
        eventId: event.id,
      },
    },
    update: {
      attendeeId: user.id,
      eventId: event.id,
    },
    create: {
      attendeeId: user.id,
      eventId: event.id,
    },
  });
};

const createEvents = async (count: number, users: User[]) =>
  await Promise.all(
    Array(count)
      .fill(null)
      .map(() => createEvent(pickRandom(users))),
  );

const createUsers = async (count: number) =>
  await Promise.all(Array(count).fill(null).map(createUser));

const createAttendances = async (
  count: number,
  users: User[],
  events: Event[],
) =>
  await Promise.all(
    Array(count)
      .fill(null)
      .map(() => createAttendance(pickRandom(users), pickRandom(events))),
  );

const main = async () => {
  const users = await createUsers(USER_COUNT);
  const events = await createEvents(EVENT_COUNT, users);
  await createAttendances(EVENT_ATTENDANCES_COUNT, users, events);
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
