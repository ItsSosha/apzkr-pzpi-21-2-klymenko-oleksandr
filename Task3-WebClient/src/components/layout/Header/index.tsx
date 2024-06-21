import { Button, Container, Group, Title } from "@mantine/core";
import styles from "./styles.module.scss";
import { LocalePicker } from "../LocalePicker";
import { useAuth } from "@/contexts/Auth";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { user, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <Container size="xl" className={styles.root}>
      <Title>Fit guru</Title>
      <Group gap={20}>
        <LocalePicker />
        {!!user && (
          <Button variant="danger" onClick={logOut}>
            {t("auth:form:logOut")}
          </Button>
        )}
      </Group>
    </Container>
  );
};
