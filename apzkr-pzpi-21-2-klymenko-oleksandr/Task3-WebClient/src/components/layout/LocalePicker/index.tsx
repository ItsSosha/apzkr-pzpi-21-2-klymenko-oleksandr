import { Select } from "@mantine/core";
import { AVAILABLE_LOCALES } from "@/i18n";
import { useTranslation } from "react-i18next";

export const LocalePicker = () => {
  const { i18n } = useTranslation();
  return (
    <Select
      data={AVAILABLE_LOCALES}
      value={i18n.language}
      onChange={(locale) => {
        if (locale) {
          i18n.changeLanguage(locale);
        }
      }}
    />
  );
};
