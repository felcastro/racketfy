import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";

export const InfoCard = (props: BoxProps) => (
  <Box
    bg={useColorModeValue("pink.100", "pink.900")}
    borderRadius="lg"
    boxShadow="md"
    {...props}
  />
);
