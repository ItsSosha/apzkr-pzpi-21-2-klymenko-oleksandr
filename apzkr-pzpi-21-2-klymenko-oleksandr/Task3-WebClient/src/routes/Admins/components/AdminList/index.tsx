import { deleteAdmin } from "@/api/admin";
import { User } from "@/types/models";
import { Button, Table } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type AdminListProps = {
  admins: User[];
};

export const AdminList = ({ admins }: AdminListProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });

  const tableRows = admins.map((item) => (
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
      <Table.Td>{item.surname}</Table.Td>
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
          <Table.Th>{t("admin:properties:name")}</Table.Th>
          <Table.Th>{t("admin:properties:surname")}</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{tableRows}</Table.Tbody>
    </Table>
  );
};
