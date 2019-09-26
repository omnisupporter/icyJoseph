import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Stat from "../../components/Stat";
import Title from "../../components/Title";
import { Statistics } from "../../components/Stat/styled";
import withGitHub from "../withGitHub";

const LandingWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;

  @media (max-width: 599px) {
    justify-content: flex-start;
    margin-top: 1em;
    margin-bottom: 4em;
  }
`;

export function Landing({
  github: {
    user: { public_repos = 0 },
    commits = 0,
    languages
  }
}) {
  const [show, setShow] = useState(false);
  const onEnd = useCallback(() => setShow(true), []);

  useEffect(() => {
    document.title = "icyJoseph";
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LandingWrap>
      <Title>
        <h1>Joseph</h1>
      </Title>
      <Statistics>
        <Stat label="Repos" end={public_repos} />
        <Stat label="Commits" end={commits} onEnd={onEnd} />
      </Statistics>
      {show && (
        <Statistics>
          {languages.map(({ lang, bytes }) => (
            <Stat key={lang} label={lang} end={bytes} withIcon />
          ))}
        </Statistics>
      )}
    </LandingWrap>
  );
}

// in the GUI seen as Home
export default withGitHub(Landing);

Landing.propTypes = {
  github: PropTypes.object
};
