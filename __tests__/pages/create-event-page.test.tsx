import CreateEventPage from "@/app/events/create/page";
import * as api from "@/lib/api";
import { render, screen } from "@testing-library/react";
import * as navigation from "next/navigation";

jest.mock("@/lib/api");
jest.mock("next/navigation");
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormState: () => [{}, "() => {}"],
  useFormStatus: () => ({ pending: false }),
}));
const getSessionCookieSpy = jest.spyOn(api, "getSessionCookie");
const redirectSpy = jest.spyOn(navigation, "redirect");

describe("/events/create page", () => {
  it("should redirect to '/' if no sessionCookie", () => {
    getSessionCookieSpy.mockReturnValueOnce(null as any);
    render(<CreateEventPage />);
    expect(redirectSpy).toHaveBeenCalledWith("/");
  });

  it("should render with a create event form", () => {
    getSessionCookieSpy.mockReturnValueOnce({} as any);
    render(<CreateEventPage />);
    for (const label of [
      "Title *",
      "Description *",
      "Location *",
      "Date *",
      "Image",
    ]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
    const submitButton = screen.getByRole("button", { name: "Create Event" });
    expect(submitButton).toBeInTheDocument();
  });
});
