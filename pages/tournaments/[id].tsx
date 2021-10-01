import { useRouter } from "next/router";
import {
  Heading,
  Box,
  Flex,
  useColorModeValue,
  useToast,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionItemProps,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { findTournament, Tournament } from "../../services/tournament.service";
import { Loading } from "../../components/Loading";
import { centsToBrlCurrency } from "../../utils/centsToBrlCurrency";
import {
  InfoCard,
  InfoCardContent,
  InfoCardData,
  InfoCardHeader,
} from "../../components/InfoCard/";
import { format } from "date-fns";

const StyledAccordionItem = (props: AccordionItemProps) => (
  <AccordionItem
    borderColor={useColorModeValue("pink.200", "pink.800")}
    _last={{}}
    {...props}
  />
);

const TournamentPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const [tournament, setTournament] = useState<Tournament | null>();

  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadTournament(tournamentId: string) {
      try {
        setLoading(true);
        const data = await findTournament(tournamentId);
        setTournament(data);
      } catch (err: any) {
        toast({
          isClosable: true,
          title: "Erro ao carregar torneio",
          description: err.message,
          status: "error",
        });
      } finally {
        setLoading(false);
      }
    }

    if (id && !tournament) {
      loadTournament(id as string);
    }
  }, [id, toast, tournament]);

  return isLoading ? (
    <Loading color="pink.500" pt={[12, 16]} />
  ) : (
    <Box>
      <Flex justify="space-between" py={[4, 8]}>
        <Heading as="h2" size="lg">
          {tournament?.name}
        </Heading>
      </Flex>
      <InfoCard>
        <InfoCardHeader>
          <Heading as="h3" size="md">
            Informações
          </Heading>
        </InfoCardHeader>
        <InfoCardContent>
          <InfoCardData name="Local" value={tournament?.location} />
          <InfoCardData
            name="Quando"
            value={
              tournament?.date &&
              format(new Date(tournament?.date), "dd/MM/yyyy - HH:mm")
            }
          />
          <InfoCardData
            name="Valor"
            value={centsToBrlCurrency(tournament?.price)}
          />
        </InfoCardContent>
      </InfoCard>
      <InfoCard mt={4}>
        <InfoCardHeader>
          <Heading as="h3" size="md">
            Categorias
          </Heading>
        </InfoCardHeader>
        <InfoCardContent>
          <Accordion allowToggle>
            {tournament?.categories?.map((c) => (
              <StyledAccordionItem key={c.uuid}>
                <h4>
                  <AccordionButton px={6}>
                    <Box flex="1" textAlign="left">
                      {c.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h4>
                <AccordionPanel pb={4} px={6}>
                  {c.teams.length > 0
                    ? c.teams.map((t) => (
                        <Box key={t.uuid}>{t.players.join(" e ")}</Box>
                      ))
                    : "Nenhuma equipe cadastrada."}
                </AccordionPanel>
              </StyledAccordionItem>
            ))}
          </Accordion>
        </InfoCardContent>
      </InfoCard>
    </Box>
  );
};

export default TournamentPage;
