import { api } from "@/lib/axios";
import { Backup } from "@/types/models";

export const getBackups = async (): Promise<Backup[]> => {
  try {
    const response = await api.get("/backups", {
      baseURL: import.meta.env.VITE_BACKUP_SERVICE_BASE_URL,
    });
    return response.data;
  } catch (e: unknown) {
    throw new Error(`Could not get backups: ${e}`);
  }
};

export const createBackup = async () => {
  try {
    const response = await api.post("/backups", null, {
      baseURL: import.meta.env.VITE_BACKUP_SERVICE_BASE_URL,
    });
    return response.data;
  } catch (e: unknown) {
    throw new Error(`Could not create a backup: ${e}`);
  }
};
