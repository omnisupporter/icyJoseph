import { Flex } from "design-system/Flex";
import { TextBox } from "design-system/TextBox";
import { Section } from "design-system/Section";
import { Text } from "design-system/Text";

export const Introduction = () => (
  <Section mt={0} pt={[2, 3, 4]} pb="5%">
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Text
        as="h1"
        $textAlign="center"
        $fontSize="3rem"
        $fontWeight={300}
        my={4}
      >
        Joseph
      </Text>

      <Text $textAlign="center">
        github:{" "}
        <a
          href="https://github.com/icyJoseph"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i>@icyJoseph</i>
        </a>
      </Text>

      <Text $textAlign="center">
        medium:{" "}
        <a
          href="https://medium.com/@icjoseph"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i>@icjoseph</i>
        </a>
      </Text>

      <TextBox chars="65ch">
        <Text mt={4} mx="auto" $fontWeight={300} $fontSize="2rem">
          Developer from <b>Peru</b>, living in <b>Sweden</b>. I have a
          Bachelor&apos;s in Electronics Engineering, and a Master&apos;s degree
          on business design.
        </Text>

        <Text mt={3} mx="auto" $fontWeight={300} $fontSize="2rem">
          I have over{" "}
          <Text
            as="b"
            $fontSize="inherit"
            $textDecoration="underline"
            title="I do not believe in the value of this number."
          >
            {new Date().getFullYear() - 2016} years
          </Text>{" "}
          of experience working as a software developer, in telecom, mining,
          freight, real state, news, transport and automotive industries.
        </Text>

        <Text mt={3} mx="auto" $fontWeight={300} $fontSize="2rem">
          I write <b>JavaScript</b>, and <b>TypeScript</b>. I am comfortable
          with any runtime, browser and <b>NodeJS</b>, even a little <b>Deno</b>
          .
        </Text>

        <Text mt={3} mx="auto" $fontWeight={300} $fontSize="2rem">
          Learning <b>Rust</b> on my free time, in fact it is my go to language
          for coding challenges.
        </Text>

        <Text mt={3} mx="auto" $fontWeight={300} $fontSize="2rem">
          I enjoy writing <b>CSS</b>, and keep my <b>HTML</b> semantic.
        </Text>
      </TextBox>
    </Flex>
  </Section>
);
