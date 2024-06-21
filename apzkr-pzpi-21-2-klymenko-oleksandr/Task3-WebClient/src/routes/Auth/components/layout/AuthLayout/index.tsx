import styles from "./styles.module.scss";

import { AppShell, Stack } from "@mantine/core";
import { Outlet } from "react-router-dom";

import { Header } from "@/components/layout/Header";
import { auth } from "@/lib/firebase";

export const AuthLayout = () => (
  <AppShell header={{ height: 60 }} padding="md">
    <AppShell.Header>
      <Header />
    </AppShell.Header>

    <AppShell.Main className={styles.main}>
      <Outlet />
    </AppShell.Main>
  </AppShell>
);
