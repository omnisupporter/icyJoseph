import { Header } from "components/Header";
import { LoC } from "components/Tokei/LoC";

import { Flex } from "design-system/Flex";
import { Section } from "design-system/Section";
import { Text } from "design-system/Text";

type TokeiProps = {
  tokei: IcyJoseph.Tokei[];
  name: string;
  row: string;
};

export const Tokei = ({ tokei, name, row }: TokeiProps) => (
  <Section $row={row}>
    <Header name={name} title="tokei ~/dev" />

    <Text mt={3} $fontWeight={300}>
      <Text as="span" $textColor="--lightYellow">
        Lines of Code
      </Text>
      , without counting <strong>blanks</strong> or <strong>comments</strong>,
      taken from my <strong>dev</strong> folder, using{" "}
      <Text
        as="a"
        href="https://github.com/XAMPPRocky/tokei"
        target="_blank"
        rel="noreferrer noopener"
        $textColor="--lightBlue"
      >
        tokei
      </Text>
      .
    </Text>

    <Text mt={2} $fontWeight={300}>
      <i>A full circle means 0 blanks and 0 comments.</i>
    </Text>

    <Flex justifyContent="center" mt={4}>
      {tokei.map(({ language, ...rest }) => (
        <LoC key={language} language={language} {...rest} />
      ))}
    </Flex>

    <Text mt={2} $fontWeight={300}>
      <i>I update these numbers about once a month.</i>
    </Text>
  </Section>
);
