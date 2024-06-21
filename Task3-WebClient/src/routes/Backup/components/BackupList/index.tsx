import { Backup } from "@/types/models";
import { formatSize } from "@/utils/format";
import { Group, ScrollArea, Table } from "@mantine/core";
import { useTranslation } from "react-i18next";

type BackupListProps = {
  backups: Backup[];
};

export const BackupList = ({ backups }: BackupListProps) => {
  const { t } = useTranslation();

  const tableRows = backups.map((item) => (
    <Table.Tr key={item.date}>
      <Table.Td>{new Date(`${item.date}Z`).toLocaleString()}</Table.Td>
      <Table.Td>{formatSize(item.size)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Group gap={12} align="flex-start">
      <ScrollArea type="hover" h={560} offsetScrollbars="x">
        <Table withTableBorder verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t("backup:properties:date")}</Table.Th>
              <Table.Th>{t("backup:properties:size")}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{tableRows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Group>
  );
};
