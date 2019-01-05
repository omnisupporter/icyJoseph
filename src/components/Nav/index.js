import styled, { css } from "styled-components";
import { baseColors } from "../../theme";
const ImageLength = "50px";

const shadow = css`
  box-shadow: 0 1px 7px rgba(255, 255, 255, 0.12),
    0 1px 6px rgba(255, 255, 255, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &.active,
  &:hover {
    box-shadow: 0 14px 28px rgba(255, 255, 255, 0.25),
      0 7px 15px rgba(255, 255, 255, 0.22),
      0 -3px 15px rgba(255, 255, 255, 0.22);
  }

  @media (max-width: 599px) {
    &.active::after {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      background-image: radial-gradient(
        circle at 50% 87%,
        ${baseColors.info} 2px,
        transparent 0.1%
      );
    }
  }

  &:active {
    box-shadow: 0 0px 0px rgba(0, 0, 0, 0.05), 0 0px 0px rgba(0, 0, 0, 0.02);
  }
`;

export const NavBar = styled.nav`
  display: flex;
  padding: 0.5em 0;

  > div {
    flex: 1;
  }

  > * > img {
    display: none;

    @media (min-width: 600px) {
      display: block;
      max-width: ${ImageLength};
      width: auto;
      height: 100%;
      ${shadow}
      border-radius: 50%;
      margin: 0 0.5em;
    }
  }

  > * > span {
    font-weight: 900;
    transition: color 0.3s;
    color: black;
    position: relative;
    padding: 10px 0;
    flex: 1;
  }

  > *:first-child {
    max-height: ${ImageLength};
    justify-content: center;
  }

  > * {
    align-items: center;
    display: flex;
  }

  > * + * {
    flex: 1;
  }

  > * > * {
    cursor: pointer;
    margin: 0 1em;
  }

  @media (max-width: 599px) {
    position: fixed;
    align-self: center;
    padding-bottom: 1em;
    flex-direction: column;
    bottom: 0;

    > div {
      display: none;
    }

    > ul {
      padding: 0;
    }
  }
`;

export const NavItems = styled.ul`
  display: flex;
  list-style: none;
  justify-content: flex-end;
  margin: auto;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;

  > * {
    height: 35px;
    width: 35px;

    @media (max-width: 599px) {
      height: 50px;
      width: 50px;

      > button {
        font-size: 1.5em;
      }
    }
  }

  > * > button {
    position: relative;
    background: ${baseColors.background};
    height: 100%;
    width: 100%;
    color: inherit;
    border: none;
    padding: 0 !important;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    border-radius: 50%;
    outline-color: gray;
    ${shadow}

    &:focus {
      /* add outline to focus pseudo-class */
      outline-style: none;
    }
  }

  @media (max-width: 599px) {
    &:before {
      content: "";
      background: ${baseColors.dark};
      position: absolute;
      height: 30px;
      width: 100%;
      z-index: -1;
      bottom: 0;
      border-radius: 10px 10px 0 0;
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    }
  }

  @supports (-moz-appearance: none) {
    /* Mozilla-only */
    > * > button {
      &:-moz-focus-inner {
        /* reset any predefined properties */
        border: none;
        padding: 0;
      }
    }
  }
`;
