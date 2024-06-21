import { RouteObject } from "react-router-dom";
import { AdminListPage } from "./AdminListPage";
import { AdminPage } from "./AdminPage";

export const AdminsRoutes: RouteObject = {
  path: "admins",
  children: [
    {
      index: true,
      element: <AdminListPage />,
    },
    {
      path: "new",
      element: <AdminPage />,
    },
    {
      path: ":id",
      element: <AdminPage />,
    },
  ],
};
