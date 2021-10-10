import { useRouter } from "next/router";
import {
  Text,
  Box,
  Button,
  Stack,
  Flex,
  useColorModeValue,
  useToast,
  Accordion,
  AccordionButton,
  FormErrorMessage,
  InputGroup,
  IconButton,
  Select,
  InputRightElement,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Tournament } from "../../services/tournament.service";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface RegistrationFormParams {
  category: string;
  players: Array<{
    name: string;
  }>;
}

const registrationFormSchema = yup.object().shape({
  category: yup.string().uuid().required("Categoria é obrigatória."),
  players: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Nome do jogador é obrigatório."),
      })
    )
    .min(1)
    .required(),
});

interface RegistrationModalProps {
  tournament: Tournament;
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal = ({
  tournament,
  isOpen,
  onClose,
}: RegistrationModalProps) => {
  const router = useRouter();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
    reset,
  } = useForm<RegistrationFormParams>({
    resolver: yupResolver(registrationFormSchema),
    defaultValues: { players: [{ name: "" }] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "players",
  });
  const watchFields = watch();

  function validateFields() {
    return !watchFields.category || watchFields.players.some((p) => !p.name);
  }

  async function onSubmit(data: RegistrationFormParams) {
    const payload = {
      tournament_uuid: tournament.uuid,
      category_uuid: data.category,
      players: data.players.map((p) => p.name),
    };

    await new Promise((r) => setTimeout(r, 2000));
    console.log(payload);

    toast({
      isClosable: true,
      title: "Inscrição enviada!",
      description: "Sua solicitação de inscrição foi enviada com sucesso.",
      status: "success",
      position: "top",
      duration: 10000,
    });

    reset();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalHeader px={[2, 6]}>{tournament.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody px={[2, 6]}>
          <Text as="p">
            Preencha o formulário abaixo para solicitar a inscrição de uma
            equipe.
          </Text>
          <Stack mt={2}>
            {fields.map((field, index) => (
              <FormControl
                id="name"
                key={field.id}
                isInvalid={!!errors.players?.[index]?.name}
              >
                <InputGroup>
                  <Input
                    placeholder="Nome Completo"
                    isDisabled={isSubmitting}
                    {...register(`players.${index}.name`)}
                  />
                  <InputRightElement>
                    <IconButton
                      icon={<FaTrash />}
                      aria-label="Remover jogador"
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      isDisabled={fields.length <= 1}
                      onClick={() => fields.length > 1 && remove(index)}
                    >
                      Remover
                    </IconButton>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.players?.[index]?.name?.message}
                </FormErrorMessage>
              </FormControl>
            ))}
            <Flex justify="space-between">
              <Button
                size="xs"
                leftIcon={<FaPlus />}
                colorScheme="blue"
                onClick={() => append({ name: "" })}
              >
                Jogador
              </Button>
              <Text as="span" fontSize="sm">{`${fields.length} ${
                fields.length <= 1 ? "jogador" : "jogadores"
              }`}</Text>
            </Flex>
            <FormControl id="category">
              <FormLabel>Categoria</FormLabel>
              <Select
                placeholder="Selecione a categoria"
                isDisabled={isSubmitting}
                {...register("category")}
              >
                {tournament.categories.map((c) => (
                  <option key={c.uuid} value={c.uuid}>
                    {c.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter
          justifyContent="space-between"
          alignItems="end"
          px={[2, 6]}
        >
          <Text as="span" fontSize="xs" mr={2}>
            *O custo da inscrição é individual.
          </Text>
          <Button
            type="submit"
            colorScheme="green"
            isLoading={isSubmitting}
            isDisabled={validateFields()}
          >
            Enviar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
