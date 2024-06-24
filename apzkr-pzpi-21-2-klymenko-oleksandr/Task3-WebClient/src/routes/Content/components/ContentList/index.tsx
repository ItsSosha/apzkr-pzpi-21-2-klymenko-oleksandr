import { deleteArticle } from "@/api/articles";
import { useErrorSnackbar } from "@/hooks/useErrorSnackbar";
import { Article } from "@/types/models";
import { Button, Table } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type ContentListProps = {
  articles: Article[];
};

export const ContentList = ({ articles }: ContentListProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const onError = useErrorSnackbar();

  const deleteMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError,
  });

  const tableRows = articles.map((item) => (
    <Table.Tr
      key={item.id}
      onClick={() =>
        navigate(item.id, {
          state: item,
        })
      }
    >
      <Table.Td>{item.id}</Table.Td>
      <Table.Td>{item.title}</Table.Td>
      <Table.Td>
        {item.author ? `${item.author.name} ${item.author.surname}` : "-"}
      </Table.Td>
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
          <Table.Th>{t("article:properties:title")}</Table.Th>
          <Table.Th>{t("article:properties:author")}</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{tableRows}</Table.Tbody>
    </Table>
  );
};
