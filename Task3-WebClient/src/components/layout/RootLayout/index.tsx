import { AppShell, LoadingOverlay } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";

import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { useAuth } from "@/contexts/Auth";

export const RootLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!user) {
    return <Navigate to="auth" />;
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 240,
        breakpoint: "xs",
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
