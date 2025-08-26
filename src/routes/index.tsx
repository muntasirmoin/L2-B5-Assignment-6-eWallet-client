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
import { userSidebarItems } from "./userSidebarItems";
import { adminSidebarItems } from "./adminSidebarItems";
import Home from "@/pages/Home/Home";
import About from "@/pages/About/About";
import Features from "@/pages/Features/Features";
import Contact from "@/pages/Contact/Contact";
import OurTeam from "@/pages/About/OurTeam";
import Faq from "@/pages/Faq/Faq";
export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: Faq,
        path: "faq",
      },
      {
        Component: OurTeam,
        path: "our-team",
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },

  // agent dashboard
  {
    Component: withAuth(DashboardLayout, role.AGENT as TRole),
    path: "/agent",
    children: [
      { index: true, element: <Navigate to="/agent/overview" /> },
      ...generateRoutes(agentSidebarItems),
    ],
  },

  // user dashboard
  {
    Component: withAuth(DashboardLayout, role.USER as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/user-overview" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },

  // admin dashboard
  {
    Component: withAuth(DashboardLayout, role.ADMIN as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/overview" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
]);
