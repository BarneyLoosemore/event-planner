## NextJS 14 Event Planner 

A Next14 "event planner" site, with the ability to create, view, filter and search for events. Deployed to Vercel at https://event-planner-three.vercel.app/events

**FE**: Next, Typescript, Tailwind

**BE/db**: Prisma, Postgres, Zod

**Testing**: Jest, React Testing Library, Cypress

---

This was a chance to try out some of the new React APIs (`useTransition`, `useOptimistic`, `useFormStatus`), as well as see if it's possible to fully embrace _progressive enhancement_ using modern Next. Form actions (server actions) can be 'enhanced' via `useFormState`/`useFormStatus`, and `next/link`'s `Link` component provides a client-router enhancement atop native `<a>` links.

Creating an event, as well as filtering and searching for events, all work with JS disabled. Submitting the search form without JS triggers a full page reload, but with JS the form is _enhanced_, and does not require a submission to start showing matching events - instead they are shown in response to debounced user input.


## Search functionality
|JS disabled|JS enabled|
|--|--|
|![disabled](https://github.com/BarneyLoosemore/event-planner/assets/40725451/7f60f00d-7002-4fa7-a6ac-d40cde1decb1)|![enabled](https://github.com/BarneyLoosemore/event-planner/assets/40725451/de060035-b627-4478-872b-59120298b724)|
