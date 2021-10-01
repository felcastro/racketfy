import { Spinner, Center, CenterProps } from "@chakra-ui/react";

interface LoadingProps extends CenterProps {}

export const Loading = ({ ...props }: LoadingProps) => {
  return (
    <Center {...props}>
      <Spinner color="pink.500" size="lg" />
    </Center>
  );
};
