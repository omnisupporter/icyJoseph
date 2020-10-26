import { Card } from "components/Card";
import { Flex } from "components/Flex";
import { Section } from "components/Section";

import {
  Clan,
  Leaderboard,
  Honor,
  Challenges,
  Languages
} from "components/CodeWarsBlocks";

import { Text } from "components/Text";

import { useCodeWars } from "hooks/useCodeWars";

export const CodeWars = ({ initial }) => {
  const { data } = useCodeWars(initial);

  const {
    username,
    honor,
    clan,
    leaderboardPosition,
    ranks,
    codeChallenges
  } = data;

  return (
    <Section>
      <header id="codewars">
        <Text as="h2" color="--blue" fontSize="3rem">
          <a href="#codewars">
            <code>CodeWars</code>
          </a>
        </Text>
      </header>
      <Flex as="main">
        <Card my={2} mx="auto">
          <Card.Header>
            <h2>
              <a
                href="https://www.codewars.com/users/icyJoseph"
                rel="noopener noreferrer"
                target="_blank"
              >
                {username}
              </a>
            </h2>
          </Card.Header>

          <Card.Section>
            <Clan clan={clan} />
            <Languages {...ranks} />
          </Card.Section>

          <Card.Section>
            <Honor honor={honor} />
            <Leaderboard position={leaderboardPosition} />
          </Card.Section>

          <Card.Section>
            <Challenges completed={codeChallenges.totalCompleted} />
          </Card.Section>
        </Card>
      </Flex>
    </Section>
  );
};
