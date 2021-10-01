import Link from "next/link";
import {
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  Button,
  Text,
  useToast,
  UseToastOptions,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { signIn } from "../../services/auth.service";

interface SignInFormParams {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function SignIn() {
  const router = useRouter();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignInFormParams>({
    //@ts-ignore
    resolver: yupResolver(signInFormSchema),
  });
  const watchFields = watch();

  async function onSubmit(data: SignInFormParams) {
    const { email, password } = data;

    const defaultToastSettings: UseToastOptions = {
      isClosable: true,
    };

    const { error } = await signIn({ email, password });

    if (error) {
      toast({
        ...defaultToastSettings,
        title: `Problema ao entrar`,
        description: error.message,
        status: "error",
      });
    } else {
      router.push("/");
    }
  }

  return (
    <Box
      w={{ base: "100%", sm: "xs" }}
      mt={16}
      marginInline="auto"
      textAlign="center"
    >
      <Heading as="h2" size="md">
        Informe suas credenciais
      </Heading>
      <Stack as="form" mt={8} onSubmit={handleSubmit(onSubmit)} spacing={4}>
        <Stack>
          <FormControl id="email" isInvalid={!!errors.email}>
            <Input
              disabled={isSubmitting}
              placeholder="E-mail"
              {...register("email")}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={!!errors.password}>
            <Input
              disabled={isSubmitting}
              type="password"
              placeholder="Senha"
              {...register("password")}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Button
          type="submit"
          colorScheme="pink"
          isLoading={isSubmitting}
          isDisabled={!watchFields?.email || !watchFields?.password}
        >
          Entrar
        </Button>
        <Stack align="center">
          <Link href="/forgot-password" passHref>
            <Button
              as="a"
              variant="link"
              colorScheme="pink"
              disabled={isSubmitting}
            >
              Esqueceu sua senha?
            </Button>
          </Link>
          <Text as="span">
            Novo aqui?{" "}
            <Link href="/signup" passHref>
              <Button
                as="a"
                variant="link"
                colorScheme="pink"
                disabled={isSubmitting}
              >
                Crie uma conta
              </Button>
            </Link>
            .
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
