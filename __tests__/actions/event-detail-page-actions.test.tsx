import { createEvent } from "@/app/events/create/actions";
import * as api from "@/lib/api";
import * as cloudinary from "@/lib/cloudinary/upload-image-to-cloudinary";
import prisma from "@/lib/prisma";
import cache from "next/cache";
import * as navigation from "next/navigation";

jest.mock("@/lib/api");
jest.mock("next/navigation");
jest.mock("@/lib/cloudinary/upload-image-to-cloudinary");

const getSessionCookieSpy = jest.spyOn(api, "getSessionCookie");
const prismaCreateEventSpy = jest.spyOn(prisma.event, "create");
const redirectSpy = jest.spyOn(navigation, "redirect");
const revalidatePathSpy = jest.spyOn(cache, "revalidatePath");
const uploadImageToCloudinarySpy = jest.spyOn(
  cloudinary,
  "uploadImageToCloudinary",
);

const VALID_EVENT = {
  title: "event",
  description: "Some mock description",
  date: "2024-01-02",
  location: "Antarctica",
  image: new File(["12345"], "image.jpg", { type: "image/jpeg" }),
};

const getMockFormData = (image: File | null = null) => {
  const formData = new FormData();
  for (const [field, value] of Object.entries(VALID_EVENT)) {
    formData.append(field, value);
  }
  if (image) {
    formData.set("image", image);
  }
  return formData;
};

describe("createEvent", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-01-01"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should redirect to / if there is no userId", async () => {
    getSessionCookieSpy.mockReturnValueOnce(null as any);

    await createEvent(null, getMockFormData());
    expect(redirectSpy).toHaveBeenCalledWith("/");
    expect(prismaCreateEventSpy).not.toHaveBeenCalled();
  });

  it("should return an error message if the event body is invalid", async () => {
    getSessionCookieSpy.mockReturnValueOnce("mock-id");
    const formData = getMockFormData();
    formData.delete("title");

    const response = await createEvent(null, formData);
    expect(response.message).toEqual(expect.stringContaining("title"));
    expect(prismaCreateEventSpy).not.toHaveBeenCalled();
  });

  it("should return an error message if the image is invalid", async () => {
    getSessionCookieSpy.mockReturnValueOnce("mock-id");
    const formData = getMockFormData(
      new File(["12345"], "image.gif", { type: "image/gif" }),
    );

    const response = await createEvent(null, formData);
    expect(response).toEqual({
      message: expect.stringContaining(
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
      ),
    });
    expect(prismaCreateEventSpy).not.toHaveBeenCalled();
  });

  it("should call prisma.event.create with the default image if the event is valid but image is not", async () => {
    getSessionCookieSpy.mockReturnValueOnce("mock-id");
    const formData = getMockFormData(
      new File([""], "image.gif", { type: "image/gif" }),
    );

    await createEvent(null, formData);
    expect(prismaCreateEventSpy).toHaveBeenCalledWith({
      data: {
        creatorId: "mock-id",
        date: new Date("2024-01-02"),
        description: "Some mock description",
        image: "https://picsum.photos/id/1/600/300",
        location: "Antarctica",
        title: "event",
      },
    });
  });

  it("should call uploadImageToCloudinary and use the returned secure_url in prisma.event.create if the image is valid", async () => {
    getSessionCookieSpy.mockReturnValueOnce("mock-id");
    uploadImageToCloudinarySpy.mockResolvedValueOnce({
      secure_url: "hello.world/mock.png",
    } as any);
    const formData = getMockFormData();

    await createEvent(null, formData);
    expect(prismaCreateEventSpy).toHaveBeenCalledWith({
      data: {
        creatorId: "mock-id",
        date: new Date("2024-01-02"),
        description: "Some mock description",
        image: "hello.world/mock.png",
        location: "Antarctica",
        title: "event",
      },
    });
  });

  it("should call revalidatePath and redirect with /events if event is valid", async () => {
    getSessionCookieSpy.mockReturnValueOnce("mock-id");
    uploadImageToCloudinarySpy.mockResolvedValueOnce({
      secure_url: "hello.world/mock.png",
    } as any);
    const formData = getMockFormData();

    await createEvent(null, formData);
    expect(revalidatePathSpy).toHaveBeenCalledWith("/events");
    expect(redirectSpy).toHaveBeenCalledWith("/events");
  });
});
