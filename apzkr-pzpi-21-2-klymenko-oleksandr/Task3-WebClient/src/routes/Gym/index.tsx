import { RouteObject } from "react-router-dom";
import { GymListPage } from "./GymListPage";
import { GymPage } from "./GymPage";

export const GymRoutes: RouteObject = {
  path: "gym",
  children: [
    {
      index: true,
      element: <GymListPage />,
    },
    {
      path: "new",
      element: <GymPage />,
    },
    {
      path: ":id",
      element: <GymPage />,
    },
  ],
};
