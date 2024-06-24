import { deleteGym } from "@/api/gyms";
import { useErrorSnackbar } from "@/hooks/useErrorSnackbar";
import { Gym } from "@/types/models";
import { Button, Table } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type GymListProps = {
  gyms: Gym[];
};

export const GymList = ({ gyms }: GymListProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const onError = useErrorSnackbar();

  const deleteMutation = useMutation({
    mutationFn: deleteGym,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gyms"] });
    },
    onError,
  });

  const tableRows = gyms.map((item) => (
    <Table.Tr
      key={item.id}
      onClick={() =>
        navigate(item.id, {
          state: item,
        })
      }
    >
      <Table.Td>{item.id}</Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.address}</Table.Td>
      <Table.Td>
        <Button
          variant="danger"
          onClick={(e) => {
            e.stopPropagation();
            deleteMutation.mutate(item.id);
          }}
        >
          {t("common:delete")}
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped highlightOnHover withTableBorder verticalSpacing="md">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>{t("gym:properties:name")}</Table.Th>
          <Table.Th>{t("gym:properties:address")}</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{tableRows}</Table.Tbody>
    </Table>
  );
};
