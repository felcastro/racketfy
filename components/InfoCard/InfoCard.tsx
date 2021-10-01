import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";

export const InfoCard = (props: BoxProps) => (
  <Box
    maxW={["unset", "sm"]}
    bg={useColorModeValue("pink.100", "pink.900")}
    borderRadius="lg"
    boxShadow="md"
    {...props}
  />
);
