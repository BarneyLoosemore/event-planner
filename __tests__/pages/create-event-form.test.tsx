import { CreateEventForm } from "@/components/create-event-form";
import { render, screen, within } from "@testing-library/react";

const expectedInputs = [
  { label: "Name", mock: "Mock Event" },
  {
    label: "Description",
    mock: "Some Mock Event Description",
  },
  { label: "Date", mock: "2024-12-31" },
  // { label: "image",  mock: "img.webp" },
  { label: "Location", mock: "London" },
];

describe("<CreateEventForm>", () => {
  it.each(expectedInputs)(
    `input with %label label should render`,
    ({ label }) => {
      render(<CreateEventForm />);
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    },
  );

  it("should render with a submit button for the form", () => {
    const form = screen.getByRole("form");
    const submitButton = within(form).getByRole("button", {
      name: "Create",
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("submit button should be disabled until all inputs are filled in", () => {
    const submitButton = screen.getByRole("button", {
      name: "Create",
    });
    expect(submitButton).toBeDisabled();
  });

  it("");
});
