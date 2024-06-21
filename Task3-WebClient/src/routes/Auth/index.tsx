import { Navigate, RouteObject } from "react-router-dom";
import { SignInPage } from "./SignInPage";
import { AuthLayout } from "./components/layout";

export const AuthRoutes: RouteObject = {
  path: "auth",
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="sign-in" />,
    },
    {
      path: "sign-in",
      element: <SignInPage />,
    },
  ],
};
