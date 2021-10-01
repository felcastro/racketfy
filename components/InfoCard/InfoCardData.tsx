import { Box, Flex, FlexProps, useColorModeValue } from "@chakra-ui/react";

interface InfoCardData extends FlexProps {
  name: string;
  value?: string;
}
export const InfoCardData = ({ name, value, ...props }: InfoCardData) => (
  <Flex
    as="dl"
    justify="space-between"
    py={2}
    px={6}
    borderTopWidth="1px"
    borderColor={useColorModeValue("pink.200", "pink.800")}
    {...props}
  >
    <Box as="dt" mr={2}>
      {name}
    </Box>
    <Box as="dd" fontWeight="bold">
      {value || "Não informado"}
    </Box>
  </Flex>
);
