import App from "@/App";
import DashboardLayout from "@/components/layout/Dashboard/DashboardLayout";
import { role } from "@/constants/role";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import type { TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { agentSidebarItems } from "./agentSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";
export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: withAuth(DashboardLayout, role.AGENT as TRole),
    path: "/agent",
    children: [
      { index: true, element: <Navigate to="/agent/" /> },
      ...generateRoutes(agentSidebarItems),
    ],
  },
]);
