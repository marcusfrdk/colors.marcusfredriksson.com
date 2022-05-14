import { IconType } from "react-icons";
import { AiFillGithub as Github } from "react-icons/ai";
import { IoMdColorFill as Colors } from "react-icons/io";
import { FaLayerGroup as Shades } from "react-icons/fa";
import { BsImageFill as Image } from "react-icons/bs";
import { REPOSITORY_URL } from "utils/constants";

export type MenuItem = {
  label: string;
  href: string;
  Icon: IconType;
  mobileOnly?: boolean;
  newTab?: boolean;
};

export const menu: MenuItem[] = [
  { label: "Colors", href: "/", Icon: Colors },
  { label: "Shades", href: "/shades", Icon: Shades },
  { label: "Extract", href: "/extract", Icon: Image },
  {
    label: "Source code",
    href: REPOSITORY_URL,
    Icon: Github,
    newTab: true,
    mobileOnly: true,
  },
];
