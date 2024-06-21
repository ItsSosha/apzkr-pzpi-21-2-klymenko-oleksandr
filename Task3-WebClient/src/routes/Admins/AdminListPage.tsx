import { useQuery } from "@tanstack/react-query";
import { AdminList } from "./components/AdminList";
import { Button, Loader, Stack } from "@mantine/core";
import { FaRegSquarePlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAdmins } from "@/api/admin";

export const AdminListPage = () => {
  const { t } = useTranslation();

  const { data, isFetching } = useQuery({
    queryKey: ["admins"],
    queryFn: getAdmins,
    staleTime: 1000 * 60,
  });

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
      <AdminList admins={data ?? []} />;
    </Stack>
  );
};
