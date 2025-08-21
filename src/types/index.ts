import type { ComponentType } from "react";

export type TRole = "ADMIN" | "AGENT" | "USER";

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
