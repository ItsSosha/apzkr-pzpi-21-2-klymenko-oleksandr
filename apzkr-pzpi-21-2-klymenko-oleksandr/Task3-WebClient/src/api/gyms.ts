import { api } from "@/lib/axios";
import { Gym } from "@/types/models";

export const getGyms = async (): Promise<Gym[]> => {
  try {
    const response = await api.get("/gyms");
    return response.data;
  } catch (e: unknown) {
    throw new Error(`Could not fetch gyms: ${e}`);
  }
};

export const createGym = async (gym: Omit<Gym, "id">) => {
  try {
    const response = await api.post("/gyms", gym);
    return response.data;
  } catch (e: unknown) {
    throw new Error(`Could not create a gym: ${e}`);
  }
};

export const updateGym = async (gym: Partial<Gym>) => {
  try {
    const response = await api.patch(`gyms/${gym.id}`, gym);
    return response.data;
  } catch (e: unknown) {
    throw new Error(`Could not update the gym ${gym.id}: ${e}`);
  }
};

export const deleteGym = async (id: string) => {
  try {
    const response = await api.delete(`gyms/${id}`);
    return response.data;
  } catch (e: unknown) {
    throw new Error(`Could not delete the gym ${id}: ${e}`);
  }
};
