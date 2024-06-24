import {
  Button,
  Center,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useErrorSnackbar } from "@/hooks/useErrorSnackbar";

type SignInFormState = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Should be at least 8 characters long")
    .max(16, "Should be 16 characters long at most")
    .regex(
      /^(?=.*[0-9])(?=.*[a-z]).{8,16}$/,
      "Should contain both letters ans numbers"
    ),
});

export const SignInPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormState>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const [authError, setAuthError] = useState<Error | null>(null);

  const onSubmit = async (data: SignInFormState) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error);
      }
    }
  };

  useErrorSnackbar(authError);

  return (
    <Center h="calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 40px))">
      <Paper withBorder w={600} p={24}>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
          {authError && (
            <Text mx={"auto"} size="lg" fw={700} tt={"uppercase"} c="red">
              {t("auth:form:error")}
            </Text>
          )}
          <TextInput
            {...register("email")}
            error={errors.email?.message}
            size="lg"
            label={t("auth:form:email")}
          />
          <PasswordInput
            {...register("password")}
            error={errors.password?.message}
            size="lg"
            label={t("auth:form:password")}
          />
          <Button type="submit" size="lg">
            {t("auth:form:signIn")}
          </Button>
        </Stack>
      </Paper>
    </Center>
  );
};
