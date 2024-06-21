import { RootLayout } from "@/components/layout";
import { AdminsRoutes } from "@/routes/Admins";
import { AuthRoutes } from "@/routes/Auth";
import { BackupRoutes } from "@/routes/Backup";
import { ContentRoutes } from "@/routes/Content";
import { GymRoutes } from "@/routes/Gym";
import { NotFound } from "@/routes/NotFound";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="gym" /> },
      GymRoutes,
      ContentRoutes,
      AdminsRoutes,
      BackupRoutes,
    ],
  },
  AuthRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
]);
