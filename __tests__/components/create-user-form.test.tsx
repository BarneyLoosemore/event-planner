import { CreateUserForm } from "@/components/form/create-user-form";
import { fireEvent, render, screen } from "@testing-library/react";

let mockUseFormStateReturn: any[] = [null, () => {}];
let mockUseFormStatusReturn = { pending: false };
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormState: () => mockUseFormStateReturn,
  useFormStatus: () => mockUseFormStatusReturn,
}));

describe("<CreateUserForm>", () => {
  it("renders a form with a name field and submit button", () => {
    render(<CreateUserForm />);
    const nameInput = screen.getByLabelText("What's your name?");
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(nameInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(nameInput).toBeInvalid();
    expect(submitButton).toBeEnabled();
  });

  it("submit button is enabled with valid name input entry", () => {
    render(<CreateUserForm />);
    const nameInput = screen.getByLabelText("What's your name?");
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput).toBeValid();
    expect(submitButton).toBeEnabled();
  });

  it("renders an error message if form submission fails", () => {
    mockUseFormStateReturn = [{ message: "Something went wrong" }, () => {}];
    render(<CreateUserForm />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
