import { Field } from "@/components/form/field";
import { render, screen } from "@testing-library/react";

let mockUseFormStatusReturn = { pending: false };
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: () => mockUseFormStatusReturn,
}));

describe("<Field>", () => {
  it("renders with a label and input", () => {
    render(<Field label="Name" name="name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
  });

  it("renders as disabled if form submission `pending`", () => {
    mockUseFormStatusReturn = { pending: true };
    render(<Field label="Name" name="name" />);
    expect(screen.getByRole("textbox", { name: "Name" })).toBeDisabled();
  });
});
