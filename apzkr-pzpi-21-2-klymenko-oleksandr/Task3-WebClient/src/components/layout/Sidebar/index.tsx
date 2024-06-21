import styles from "./styles.module.scss";

import { NavLink } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { NavLink as RouterNavigationLink } from "react-router-dom";

const NAV_ITEMS = ["gym", "content", "admins", "backup"];

export const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <>
      {NAV_ITEMS.map((item) => (
        <NavLink
          component={RouterNavigationLink}
          to={item}
          label={t(`navigation:${item}`)}
          variant="filled"
          key={item}
          autoContrast
          classNames={{
            label: styles.link,
          }}
        />
      ))}
    </>
  );
};
