import { useQuery } from "@tanstack/react-query";
import { GymList } from "./components/GymList";
import { getGyms } from "@/api/gyms";
import { Button, Loader, Stack } from "@mantine/core";
import { FaRegSquarePlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useErrorSnackbar } from "@/hooks/useErrorSnackbar";

export const GymListPage = () => {
  const { t } = useTranslation();

  const { data, isFetching, error } = useQuery({
    queryKey: ["gyms"],
    queryFn: getGyms,
    staleTime: 1000 * 60,
  });

  useErrorSnackbar(error);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <Stack gap={16} align="flex-start">
      <Button
        component={NavLink}
        to={"new"}
        rightSection={<FaRegSquarePlus size={16} />}
        size="lg"
      >
        {t("common:new")}
      </Button>
      <GymList gyms={data ?? []} />;
    </Stack>
  );
};
