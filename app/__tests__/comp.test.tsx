import { render, screen } from "@testing-library/react";
import { Comp } from "../_components/comp";

it("renders", () => {
  render(<Comp />);
  expect(screen.getByText("Test Comp")).toBeInTheDocument();
});
