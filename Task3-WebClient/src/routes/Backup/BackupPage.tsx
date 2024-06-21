import { createBackup, getBackups } from "@/api/backup";
import { Button, Group, Loader } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BackupList } from "./components/BackupList";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export const BackupPage = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["backups"],
    queryFn: getBackups,
    staleTime: 1000 * 60,
  });

  const createMutation = useMutation({
    mutationFn: createBackup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["backups"] });
    },
  });

  if (isFetching) {
    return <Loader />;
  }

  return (
    <Group gap={12} align="flex-start">
      <BackupList backups={data ?? []} />
      <Button
        onClick={() => createMutation.mutate()}
        rightSection={<FaRegSquarePlus size={16} />}
        size="lg"
      >
        {t("common:new")}
      </Button>
    </Group>
  );
};
