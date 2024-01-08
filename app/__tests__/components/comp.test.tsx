import { Comp } from "@/app/_components/comp";
import { render, screen } from "@testing-library/react";

it("renders", () => {
  render(<Comp />);
  expect(screen.getByText("Test Comp")).toBeInTheDocument();
});
