import { Gym } from "@/types/models";
import { Button, Grid, Stack, TextInput, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGym, updateGym } from "@/api/gyms";

type GymFormState = {
  name: string;
  address: string;
};

export const GymPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const gymData = location.state as Gym | null;
  const editing = !!gymData;

  const createMutation = useMutation({
    mutationFn: createGym,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gyms"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateGym,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gyms"] });
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<GymFormState>({
    defaultValues: gymData ?? undefined,
  });

  const onSubmit = (data: GymFormState) => {
    editing
      ? updateMutation.mutate({ id: gymData.id, ...data })
      : createMutation.mutate(data);
    navigate(-1);
  };

  return (
    <Stack>
      <Title>
        {editing ? t("gym:edit", { name: gymData.name }) : t("gym:new")}
      </Title>
      <Grid grow component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Grid.Col>
          <Stack align="flex-start">
            <TextInput
              {...register("name")}
              label={t("gym:properties:name")}
              size="lg"
              error={errors.name?.message}
            />
            <TextInput
              {...register("address")}
              label={t("gym:properties:address")}
              size="lg"
              error={errors.address?.message}
            />
            <Button type="submit" size="md">
              {editing ? t("common:save") : t("common:create")}
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
