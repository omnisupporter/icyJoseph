import { Box } from "design-system/Box";
import { DevIcon } from "design-system/DevIcon";
import { Flex } from "design-system/Flex";
import { Text } from "design-system/Text";
import { IndicatorBar } from "design-system/IndicatorBar";

const RE_EMOJI = /:\+1:|:-1:|:[\w-]+:/g;

const isLanguageEdge = (
  edge: IcyJoseph.LanguageEdge | null
): edge is IcyJoseph.LanguageEdge => Boolean(edge);

type ContributionCardProps = {
  repository: IcyJoseph.Repository;
  index: number;
  contributions: { totalCount: number };
};

export const ContributionEntry = ({
  repository,
  index,
  contributions
}: ContributionCardProps) => {
  const validLanguageEdges = repository.languages.edges.filter(isLanguageEdge);

  const padding = Array.from(
    { length: 3 - validLanguageEdges.length },
    (_, i) => i
  );

  return (
    <Flex as="article" py={3} mx="auto" flexDirection="column" gap="1.5rem">
      <Flex as="header" alignItems="center" justifyContent="space-between">
        <Box mr={3}>
          <Text as="span" $textColor="--yellow">
            #{index + 1}
          </Text>{" "}
          <Text as="span">{repository.owner.login}</Text>
          <Text as="h4" $fontWeight={300} $fontSize="2rem" $display="inline">
            /{repository.name}
          </Text>
        </Box>

        <Text as="span" $fontWeight={300} $fontSize="2rem">
          +{contributions.totalCount}{" "}
          <Text as="span" $fontWeight={300}>
            commits
          </Text>
        </Text>
      </Flex>

      <Box>
        <Text $fontWeight={300} $fontSize="2rem">
          {repository.description
            ? repository.description.replace(RE_EMOJI, "")
            : `${repository.name} has no description.`}
        </Text>
      </Box>

      <Flex as="footer" mt={3}>
        {validLanguageEdges.map(({ node: { color, name }, size }) => (
          <Flex
            key={name}
            flexDirection="column"
            flex={1}
            justifyContent="flex-end"
            mr={3}
          >
            <Text $fontWeight={300} mb={1}>
              <DevIcon color={color} language={name} mr={1} $fontSize="2rem" />

              <span>{name}</span>
            </Text>

            <IndicatorBar
              color={color}
              percentage={(100 * size) / repository.languages.totalSize}
            />
          </Flex>
        ))}

        {padding.map((x) => (
          <Flex key={x} flex={1} />
        ))}
      </Flex>
    </Flex>
  );
};
