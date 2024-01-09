import { CreateEventForm } from "@/components/create-event-form";
import { fireEvent, render, screen, within } from "@testing-library/react";

const expectedInputs = [
  { name: "name", label: "Name", valid: "Mock Event", invalid: "" },
  {
    name: "description",
    label: "Description",
    valid: "Some Mock Event Description",
    invalid: "",
  },
  { name: "location", label: "Location", valid: "London", invalid: "" },
  { name: "date", label: "Date", valid: "2024-12-31", invalid: "2023-12-31" },
  // { label: "image",  valid: "img.webp", invalid:"" },
];

jest.setSystemTime(new Date("2024-01-09"));

describe("<CreateEventForm>", () => {
  it.each(expectedInputs)(
    "%name input with %label label should render",
    ({ label }) => {
      render(<CreateEventForm />);
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    },
  );

  it("should render with a submit button for the form", () => {
    render(<CreateEventForm />);
    const form = screen.getByRole("form");
    const submitButton = within(form).getByRole("button", {
      name: "Create",
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("submit button should be disabled until all inputs are filled in", () => {
    render(<CreateEventForm />);
    const submitButton = screen.getByRole("button", {
      name: "Create",
    });
    expect(submitButton).toBeDisabled();
  });

  it("should not enable the submit button if inputs are filled but invalid", () => {
    render(<CreateEventForm />);

    const submitButton = screen.getByRole("button", {
      name: "Create",
    });

    for (const { label, invalid } of expectedInputs) {
      const input = screen.getByLabelText(label);
      fireEvent.change(input, invalid);
    }

    expect(submitButton).toBeDisabled();
  });

  it("should enable the submit button when inputs are filled in and valid", () => {
    render(<CreateEventForm />);

    const submitButton = screen.getByRole("button", {
      name: "Create",
    });

    for (const { label, valid } of expectedInputs) {
      const input = screen.getByLabelText(label);
      fireEvent.change(input, valid);
    }

    expect(submitButton).toBeEnabled();
  });
});
