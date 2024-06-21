import { ComboboxData } from "@mantine/core";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import uk from "./locales/uk.json";

export const AVAILABLE_LOCALES: ComboboxData = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Українська",
    value: "uk",
  },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      uk,
    },
    fallbackLng: "en",
    detection: {
      order: [],
    },
  });
