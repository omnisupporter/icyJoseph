import styled from "styled-components";
import { space } from "@styled-system/space";

export const Section = styled.section`
  ${space({ mx: "auto", my: 3 })};
  ${space};
  max-width: ${({ maxWidth }) => maxWidth ?? "85ch"};
`;

export const FullPage = styled(Section)`
  min-height: 100vh;
`;
