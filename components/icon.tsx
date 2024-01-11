import Calendar from "@/public/calendar.svg";
import LocationPin from "@/public/location-pin.svg";
import User from "@/public/user.svg";
import Image from "next/image";

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
};

export const Icon = ({ name, alt, width = 16, height = 16 }: IconProps) => (
  <Image src={iconPathMap[name]} alt={alt} width={width} height={height} />
);
