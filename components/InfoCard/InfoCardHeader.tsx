import { Box, BoxProps } from "@chakra-ui/react";

export const InfoCardHeader = ({ children, ...props }: BoxProps) => (
  <Box px={4} py={4} {...props}>
    {children}
  </Box>
);
