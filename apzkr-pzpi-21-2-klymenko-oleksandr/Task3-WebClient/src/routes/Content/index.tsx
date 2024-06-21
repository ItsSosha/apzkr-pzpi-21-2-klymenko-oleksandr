import { RouteObject } from "react-router-dom";
import { ContentListPage } from "./ContentListPage";
import { ContentPage } from "./ContentPage";

export const ContentRoutes: RouteObject = {
  path: "content",
  children: [
    {
      index: true,
      element: <ContentListPage />,
    },
    {
      path: "new",
      element: <ContentPage />,
    },
    {
      path: ":id",
      element: <ContentPage />,
    },
  ],
};
