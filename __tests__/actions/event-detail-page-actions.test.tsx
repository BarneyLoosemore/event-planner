import { startSession } from "@/app/actions";
import { createUser } from "@/lib/api";

const api = { createUser };

const createUserSpy = jest.spyOn(api, "createUser").mockResolvedValueOnce({
  id: "test id",
  name: "test name",
});
jest.mock("next/headers", () => ({
  cookies: () => ({
    set: jest.fn(),
  }),
}));
jest.mock("next/navigation");

const mockFormData = new FormData();
mockFormData.append("name", "test name");

describe("startSession", () => {
  it("should call `createUser` with the `name` field from a passed FormData object", async () => {
    await startSession(mockFormData);
    expect(createUserSpy).toHaveBeenCalledWith("test name");
  });

  // it("should call `cookies().set` with the `id` returned from `createUser`", async () => {
  //   createUserSpy.mockResolvedValueOnce({ id: "test id", name: "test name" });
  //   expect(cookiesSetSpy).toHaveBeenCalledWith("session", "test id");
  // });
});
