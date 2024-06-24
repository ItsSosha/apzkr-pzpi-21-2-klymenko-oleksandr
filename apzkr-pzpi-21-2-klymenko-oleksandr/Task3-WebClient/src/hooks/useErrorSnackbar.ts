import { useSnackbar } from "notistack";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useErrorSnackbar = (error?: Error | null) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const showError = useCallback(
    (error: Error) => {
      enqueueSnackbar({
        preventDuplicate: true,
        variant: "error",
        message: `${t("common:errorOccured")}
      ${error.message}`,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    },
    [t]
  );

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [showError, error]);

  return showError;
};
