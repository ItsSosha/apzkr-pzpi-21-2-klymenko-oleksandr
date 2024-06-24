import { User } from "@/types/models";
import {
  Button,
  Grid,
  PasswordInput,
  Stack,
  Switch,
  TextInput,
  Title,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdmin, updateAdmin } from "@/api/admin";
import { useErrorSnackbar } from "@/hooks/useErrorSnackbar";

type AdminFormState = {
  email: string;
  password: string;
  name: string;
  surname: string;
  isAdmin: boolean;
};

export const AdminPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const onError = useErrorSnackbar();

  const adminData = location.state as User | null;
  const editing = !!adminData;

  const createMutation = useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError,
  });

  const updateMutation = useMutation({
    mutationFn: updateAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AdminFormState>({
    defaultValues: adminData ?? undefined,
  });

  const onSubmit = (data: AdminFormState) => {
    editing
      ? updateMutation.mutate({ id: adminData.id, ...data })
      : createMutation.mutate(data);
    navigate(-1);
  };

  return (
    <Stack>
      <Title>
        {editing
          ? t("admin:edit", {
              name: adminData.name,
              surname: adminData.surname,
            })
          : t("admin:new")}
      </Title>
      <Grid grow component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Grid.Col>
          <Stack align="flex-start">
            <TextInput
              {...register("name")}
              label={t("admin:properties:name")}
              size="lg"
              error={errors.name?.message}
            />
            <TextInput
              {...register("surname")}
              label={t("admin:properties:surname")}
              size="lg"
              error={errors.surname?.message}
            />
            <Switch
              {...register("isAdmin")}
              label={t("admin:properties:isAdmin")}
              size="lg"
              error={errors.isAdmin?.message}
            />
            <TextInput
              {...register("email")}
              label={t("admin:properties:email")}
              size="lg"
              error={errors.email?.message}
            />
            {!editing && (
              <PasswordInput
                {...register("password")}
                label={t("admin:properties:password")}
                size="lg"
                error={errors.password?.message}
                w={240}
              />
            )}
            <Button type="submit" size="md">
              {editing ? t("common:save") : t("common:create")}
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
