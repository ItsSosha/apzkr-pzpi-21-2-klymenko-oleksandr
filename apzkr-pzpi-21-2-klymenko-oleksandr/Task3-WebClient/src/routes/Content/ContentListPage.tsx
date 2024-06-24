import { useQuery } from "@tanstack/react-query";
import { ContentList } from "./components/ContentList";
import { getArticles } from "@/api/articles";
import { Button, Loader, Stack } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useErrorSnackbar } from "@/hooks/useErrorSnackbar";

export const ContentListPage = () => {
  const { t } = useTranslation();

  const { data, isFetching, error } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
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
      <ContentList articles={data ?? []} />
    </Stack>
  );
};
