import { Icon } from "@/components/icon";
import { render, screen } from "@testing-library/react";

describe("<Icon>", () => {
  it("renders an svg image with the provided name", () => {
    render(<Icon name="calendar" alt="calendar" />);
    const image = screen.getByAltText("calendar");
    expect(image).toBeInTheDocument();
    expect(image).toHaveStyle({ width: "16px", height: "16px" });
  });

  it("allows dimensions to be overidden", () => {
    render(<Icon name="calendar" alt="calendar" width={32} height={32} />);
    const image = screen.getByAltText("calendar");
    expect(image).toBeInTheDocument();
    expect(image).toHaveStyle({ width: "32px", height: "32px" });
  });
});
