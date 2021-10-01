import Link from "next/link";
import {
  Flex,
  Heading,
  FlexProps,
  useBreakpointValue,
  Avatar,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ColorModeButton } from "../ColorModeButton";

export const Navbar = (props: FlexProps) => {
  const { user } = useAuth();

  return (
    <Flex
      as="header"
      position="sticky"
      zIndex="sticky"
      top="0"
      align="center"
      justify="space-between"
      h={14}
      px={2}
      boxShadow="md"
      backgroundColor={useColorModeValue("white", "gray.800")}
      {...props}
    >
      <Link href="/" passHref>
        <Heading
          as="a"
          role="heading"
          size={useBreakpointValue({ base: "md", sm: "lg" })}
          fontWeight="extrabold"
          mr={2}
          color="pink.500"
        >
          racketfy
        </Heading>
      </Link>
      <HStack align="center">
        <ColorModeButton colorScheme="pink" />
        {user && <Avatar size="sm" />}
      </HStack>
    </Flex>
  );
};
