import { toggleAttendEvent } from "@/app/events/[id]/actions";
import { addAttendee, getSessionCookie, removeAttendee } from "@/lib/api";
import cache from "next/cache";
import * as navigation from "next/navigation";

jest.mock("next/navigation");
jest.mock("@/lib/api");

const redirectSpy = jest.spyOn(navigation, "redirect");
const revalidatePathSpy = jest.spyOn(cache, "revalidatePath");

const api = { getSessionCookie };
const sessionCookieSpy = jest.spyOn(api, "getSessionCookie");

describe("toggleAttendEvent", () => {
  it("should redirect to / if there is no userId", async () => {
    sessionCookieSpy.mockReturnValue(null as any);
    await toggleAttendEvent("1", true);
    expect(redirectSpy).toHaveBeenCalledWith("/");
    expect(revalidatePathSpy).not.toHaveBeenCalled();
  });

  it("should remove attendee if isAttending is true", async () => {
    sessionCookieSpy.mockReturnValue("userId");
    await toggleAttendEvent("1", true);
    expect(removeAttendee).toHaveBeenCalledWith("userId", "1");
    expect(addAttendee).not.toHaveBeenCalled();
    expect(revalidatePathSpy).toHaveBeenCalledWith("/events/1");
  });

  it("should add attendee if isAttending is false", async () => {
    sessionCookieSpy.mockReturnValue("userId");
    await toggleAttendEvent("1", false);
    expect(addAttendee).toHaveBeenCalledWith("userId", "1");
    expect(removeAttendee).not.toHaveBeenCalled();
    expect(revalidatePathSpy).toHaveBeenCalledWith("/events/1");
  });
});
