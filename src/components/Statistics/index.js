import React from "react";
import CountUp from "react-countup";
import { Loader, Icon } from "semantic-ui-react";
import { Group, Stat, Value, Label } from "./styled";

const languageIcons = {
  JavaScript: "js",
  HTML: "html5",
  CSS: "css3 alternate",
  Python: "python"
};

const LangIcon = ({ icon }) => <Icon name={icon} />;

export const Statistics = ({
  publicRepos = 0,
  publicGists = 0,
  commits = 0,
  languages = []
}) => (
  <div>
    <Group inverted widths={3}>
      <Stat>
        <Value>
          <Icon name="github alternate" />
          <CountUp start={0} end={publicRepos} />
        </Value>
        <Label>Public Repos</Label>
      </Stat>
      <Stat>
        <Value>
          <CountUp start={0} end={commits} />
        </Value>
        <Label>Commits</Label>
      </Stat>
      <Stat>
        <Value>
          <CountUp start={0} end={publicGists} />
        </Value>
        <Label>Public Gists</Label>
      </Stat>
    </Group>
    <Group inverted widths={2}>
      {languages.length === 0 ? (
        <Loader active inline="centered" />
      ) : (
        languages.map(({ lang, bytes }) => (
          <Stat key={lang}>
            <Value>
              <LangIcon icon={languageIcons[lang]} />
              <CountUp start={0} end={bytes} />
            </Value>
            <Label>bytes in {lang}</Label>
          </Stat>
        ))
      )}
    </Group>
  </div>
);

export default Statistics;
