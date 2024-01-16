import { CreateEventForm } from "@/components/form/create-event-form";
import { fireEvent, render, screen } from "@testing-library/react";

jest.useFakeTimers();
jest.setSystemTime(new Date("2024-01-09"));

let mockFormError: any = "";
let mockPending = false;

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: () => ({
    pending: mockPending,
  }),
  useFormState: () => [{ message: mockFormError }, "mockFormAction"],
}));

const expectedInputs = [
  { name: "title", label: "Title *", valid: "Mock Event", invalid: "" },
  {
    name: "description",
    label: "Description *",
    valid: "Some Mock Event Description",
    invalid: "",
  },
  { name: "location", label: "Location *", valid: "London", invalid: "" },
  { name: "date", label: "Date *", valid: "2024-12-31", invalid: "2023-12-31" },
];

describe("<CreateEventForm>", () => {
  it.each(expectedInputs)(
    "required input $name should render with '$label' label",
    ({ label, invalid, valid }) => {
      render(<CreateEventForm />);
      expect(screen.getByLabelText(label)).toBeInTheDocument();
      expect(screen.getByLabelText(label)).toBeInvalid();

      fireEvent.change(screen.getByLabelText(label), {
        target: { value: invalid },
      });
      expect(screen.getByLabelText(label)).toBeInvalid();

      fireEvent.change(screen.getByLabelText(label), {
        target: { value: valid },
      });
      expect(screen.getByLabelText(label)).toBeValid();
    },
  );

  it("should render an optional image input", () => {
    render(<CreateEventForm />);
    const imageInput = screen.getByLabelText("Image");
    expect(imageInput).toBeInTheDocument();
    expect(imageInput).toBeValid();
  });

  it("should render with a submit button for the form", () => {
    render(<CreateEventForm />);
    const submitButton = screen.getByRole("button", {
      name: "Create Event",
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("submit button should be enabled by default", () => {
    render(<CreateEventForm />);
    const submitButton = screen.getByRole("button", {
      name: "Create Event",
    });
    expect(submitButton).toBeEnabled();
  });

  it("should disable the submit button if form submission is pending", () => {
    mockPending = true;
    render(<CreateEventForm />);

    const submitButton = screen.getByRole("button", {
      name: "Create Event",
    });

    expect(submitButton).toBeDisabled();
    mockPending = false;
  });

  it("should display error if one returned from `useFormState`", () => {
    mockFormError = "Some error";
    render(<CreateEventForm />);

    const error = screen.getByText("Some error");
    expect(error).toBeInTheDocument();
  });
});
