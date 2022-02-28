import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

export const PageFooter = styled.footer<SpaceProps>`
  ${space({ px: 4, pb: 5, mt: 5 })};

  color: var(--smokeyWhite);

  > section {
    font-family: sans-serif;
    max-width: 85ch;
    ${space({ mx: "auto" })}
  }
`;
