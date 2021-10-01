import Link from "next/link";
import {
  Stack,
  Heading,
  Box,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { FaSignInAlt } from "react-icons/fa";

const Home: NextPage = () => {
  return (
    <Stack>
      <Box as="section" textAlign="center" mt={[12, 16]}>
        <Heading
          fontSize={["4xl", "7xl"]}
          maxW="xl"
          marginInline="auto"
          fontWeight="extrabold"
          color={useColorModeValue("gray.700", "inherit")}
          lineHeight={1.2}
          letterSpacing="tighter"
        >
          Crie, compartilhe e gerencie torneios
        </Heading>
        <Text
          as="p"
          fontSize={["xl", "2xl"]}
          maxW="xl"
          marginInline="auto"
          mt={[4, 6]}
          color={useColorModeValue("gray.500", "gray.400")}
        >
          Com o{" "}
          <Text as="span" color="pink.500" fontWeight="bold">
            racketfy
          </Text>
          , você pode criar torneios, compartilhar com quem quiser, e
          gerencia-los da palma de sua mão!
        </Text>
        <Stack
          direction={["column", "row"]}
          justify="center"
          mt={[12, 14]}
          spacing={4}
        >
          <Link href="/signin" passHref>
            <Button
              as="a"
              leftIcon={<FaSignInAlt />}
              size="lg"
              colorScheme="pink"
            >
              Login
            </Button>
          </Link>
          <Button size="lg">Criar Torneio</Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Home;
