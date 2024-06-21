import { api } from "@/lib/axios";
import { User } from "@/types/models";

export const getAdmins = async (): Promise<User[]> => {
  try {
    const response = await api.get("/users/admins");
    return response.data;
  } catch (e: unknown) {
    throw new Error(`Could not fetch admins: ${e}`);
  }
};

export const createAdmin = async (gym: Omit<User, "id">) => {
  try {
    const response = await api.post("/users", gym);
    return response.data;
  } catch (e: unknown) {
    throw new Error(`Could not create an admin: ${e}`);
  }
};

export const updateAdmin = async (gym: Partial<User>) => {
  try {
    const response = await api.patch(`users/${gym.id}`, gym);
    return response.data;
  } catch (e: unknown) {
    throw new Error(`Could not update the admin ${gym.id}: ${e}`);
  }
};

export const deleteAdmin = async (id: string) => {
  try {
    const response = await api.delete(`users/${id}`);
    return response.data;
  } catch (e: unknown) {
    throw new Error(`Could not delete the user ${id}: ${e}`);
  }
};
