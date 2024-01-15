import Calendar from "@/public/calendar.svg";
import LocationPin from "@/public/location-pin.svg";
import User from "@/public/user.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const iconPathMap = {
  calendar: Calendar,
  location: LocationPin,
  user: User,
} as const;

type IconProps = {
  name: keyof typeof iconPathMap;
  alt: string;
  width?: number;
  height?: number;
} & Omit<ComponentProps<typeof Image>, "src">;

export const Icon = ({
  name,
  alt,
  width = 16,
  height = 16,
  ...rest
}: IconProps) => (
  <Image
    src={iconPathMap[name]}
    alt={alt}
    style={{
      width,
      height,
    }}
    {...rest}
  />
);
