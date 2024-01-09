import EventDetailPage from "@/app/events/[id]/page";

import { render, screen } from "@testing-library/react";

describe("Event Detail Page", () => {
  it("renders", () => {
    render(
      <EventDetailPage
        params={{
          id: "1",
        }}
      />,
    );
    expect(screen.getByText("Event 1")).toBeInTheDocument();
  });
});
