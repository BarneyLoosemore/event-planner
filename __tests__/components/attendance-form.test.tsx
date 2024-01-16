import { AttendanceForm } from "@/components/form/attendance-form";
import { render, screen } from "@testing-library/react";

let mockOptimisticAttending = true;
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useOptimistic: () => [mockOptimisticAttending, jest.fn()],
}));

const mockProps = {
  eventId: "1",
  isAttending: false,
  isPastEvent: false,
};

const getButton = (name: string) => screen.getByRole("button", { name });

describe("<AttendanceForm>", () => {
  it("should render with an enabled 'Attend' button if isAttending and isPastEvent are both false", () => {
    mockOptimisticAttending = false;
    render(<AttendanceForm {...mockProps} />);
    const submitButton = getButton("Attend");
    expect(submitButton).toBeEnabled();
  });

  it("should render with an enabled 'Unattend' button if isAttending is true and isPastEvent is false", () => {
    mockOptimisticAttending = true;
    render(<AttendanceForm {...mockProps} isAttending={true} />);
    const submitButton = getButton("Unattend");
    expect(submitButton).toBeEnabled();
  });

  it("should render with a disabled 'Event has ended' button if isPastEvent is true", () => {
    render(<AttendanceForm {...mockProps} isPastEvent={true} />);
    const submitButton = getButton("Event has ended");
    expect(submitButton).toBeDisabled();
  });

  it("should disable the button if isAttending is out of sync with the optimistic value", () => {
    mockOptimisticAttending = false;
    render(<AttendanceForm {...mockProps} isAttending={true} />);
    const submitButton = getButton("Attend");
    expect(submitButton).toBeDisabled();
  });
});
