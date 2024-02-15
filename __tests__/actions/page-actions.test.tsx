import { startSession } from "@/app/actions";
import * as api from "@/lib/api";
import * as navigation from "next/navigation";

jest.mock("@/lib/api");
jest.mock("next/navigation");

const mockSetCookies = jest.fn();
jest.mock("next/headers", () => ({
  cookies: () => ({
    set: mockSetCookies,
  }),
}));

const redirectSpy = jest.spyOn(navigation, "redirect");
const getUserByNameSpy = jest.spyOn(api, "getUserByName");
const createUserSpy = jest.spyOn(api, "createUser");

const mockFormData = new FormData();
mockFormData.append("name", "user");

describe("startSession", () => {
  it("should return a message if the user already exists", async () => {
    getUserByNameSpy.mockReturnValueOnce({ id: "userId" } as any);

    const response = await startSession(null, mockFormData);

    expect(response).toEqual({ message: "User already exists" });
  });

  it("should set a session cookie and redirect to /events", async () => {
    getUserByNameSpy.mockReturnValueOnce(null as any);
    createUserSpy.mockReturnValueOnce({ id: "userId" } as any);

    await startSession(null, mockFormData);

    expect(mockSetCookies).toHaveBeenCalledWith("session", "userId");
    expect(redirectSpy).toHaveBeenCalledWith("/events");
  });
});
