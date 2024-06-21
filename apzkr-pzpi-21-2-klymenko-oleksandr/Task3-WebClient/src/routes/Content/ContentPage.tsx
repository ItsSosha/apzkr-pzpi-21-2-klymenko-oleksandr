import { Article } from "@/types/models";
import {
  Button,
  FileInput,
  Grid,
  Stack,
  TagsInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { MarkdownInput } from "@/components/MarkdownInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateArticle, createArticle } from "@/api/articles";

interface ContentFormState {
  title: string;
  content: string;
  coverFile: File;
  tags: string[];
}

export const ContentPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const contentData = location.state as Article | null;
  const editing = !!contentData;

  const createMutation = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ContentFormState>({
    defaultValues: contentData
      ? {
          title: contentData.title,
          content: contentData.content,
          tags: contentData.tags,
        }
      : undefined,
  });

  const onSubmit = (data: ContentFormState) => {
    editing
      ? updateMutation.mutate({ id: contentData.id, ...data })
      : createMutation.mutate(data);
    navigate(-1);
  };

  return (
    <Stack>
      <Title>
        {editing
          ? t("article:edit", { title: contentData.title })
          : t("article:new")}
      </Title>
      <Grid grow component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Grid.Col>
          <Stack align="flex-start">
            <TextInput
              {...register("title")}
              label={t("article:properties:title")}
              size="lg"
              error={errors.title?.message}
            />
            <Controller
              name="content"
              control={control}
              render={({ field: { onChange, value } }) => (
                <MarkdownInput
                  value={value}
                  onChange={onChange}
                  label={t("article:properties:content")}
                />
              )}
            />
            <Controller
              name="tags"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TagsInput
                  size="lg"
                  onChange={onChange}
                  value={value}
                  label={t("article:properties:tags")}
                />
              )}
            />
            <Controller
              name="coverFile"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FileInput
                  size="lg"
                  label={t("article:properties:cover")}
                  value={value}
                  onChange={onChange}
                  error={errors.coverFile?.message}
                  placeholder={t("article:form:file")}
                  w={240}
                />
              )}
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
