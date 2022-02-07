import styled from "styled-components";
import type { Property } from "csstype";
import { space, SpaceProps } from "@styled-system/space";

import type { ColorVars } from "design-system/Global/theme";

type BaseTextProps = {
  $verticalAlign?: Property.VerticalAlign;
  $display?: Property.Display;
  $fontSize?: Property.FontSize;
  $fontWeight?: Property.FontWeight;
  $textAlign?: Property.TextAlign;
  $textTransform?: Property.TextTransform;
  $textDecoration?: Property.TextDecoration;
  $textColor?: ColorVars;
};

type TextProps = SpaceProps & BaseTextProps;

const fallbackColor: ColorVars = "--smokeyWhite";

export const Text = styled.p<TextProps>`
  ${space};

  font-family: Recursive, sans-serif;
  display: ${({ $display }) => $display};
  font-size: ${({ $fontSize = "1.6rem" }) => $fontSize};
  text-align: ${({ $textAlign }) => $textAlign};
  vertical-align: ${({ $verticalAlign }) => $verticalAlign};
  color: ${({ $textColor = fallbackColor }) => `var(${$textColor})`};
  font-weight: ${({ $fontWeight }) => $fontWeight};
  text-transform: ${({ $textTransform }) => $textTransform};
  text-decoration: ${({ $textDecoration }) => $textDecoration};
`;
