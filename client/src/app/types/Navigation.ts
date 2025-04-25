import { IconType } from "react-icons/lib";
import { TokenUser } from "../../../server/types";

export type SidebarLinks = {
  title: string,
  url: string,
  icon: IconType,
  target?: '_blank' | '_self' | '_top',
}

export type SidebarProps = {
  user: TokenUser | undefined;
}