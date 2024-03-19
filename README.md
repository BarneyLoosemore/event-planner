A Next 14 "event planner" site, with the ability to create, view, filter and search for events. Deployed to Vercal at https://event-planner-three.vercel.app/events

Next, Typescript, Tailwind
Prisma, Postgres, Zod
Jest, React Testing Library, Cypress

This was a chance to try out some of the new React APIs (`useTransition`, `useOptimistic`, `useFormStatus`), as well as see if it's possible to fully embrace _progressive enhancement_ using modern Next. Form actions (server actions) can be 'enhanced' via `useFormState`/`useFormStatus`, and `next/link`'s `Link` component provides a client-router enhancement atop native `<a>` links.

Creating an event, as well as filtering and searching for events, all work with JS disabled. Submitting the search form without JS triggers a full page reload, but with JS the form is _enhanced_, and does not require a submission to start showing matching events - instead they are shown in response to debounced user input.


## Search functionality
|JS disabled|JS enabled|
|--|--|
|![image](https://github.com/BarneyLoosemore/event-planner/assets/40725451/08bada94-5c48-477f-b6e6-a4a33a6d60ef)|![image](https://github.com/BarneyLoosemore/event-planner/assets/40725451/135662e6-a1bc-425a-95db-e5c9c9439800)|


