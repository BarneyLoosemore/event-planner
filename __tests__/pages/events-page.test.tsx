import EventsPage from "@/app/events/page";

import { render, screen } from "@testing-library/react";
import { Suspense } from "react";

// async SC not yet working with RTL?
describe.skip("Events Page", () => {
  it("renders", async () => {
    render(
      <Suspense>
        <EventsPage
          searchParams={{
            order: "asc",
          }}
        />
      </Suspense>,
    );
    expect(await screen.findByText("Events")).toBeInTheDocument();
  });
});
