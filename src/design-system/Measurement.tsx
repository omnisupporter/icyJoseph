import { FC } from "react";
import styled from "styled-components";

import { Text } from "design-system/Text";

const BaseEntry = styled(Text)`
  white-space: nowrap;
  color: var(--blue);

  &:not(:last-child):after {
    content: "\\A";
    white-space: pre-wrap;
  }

  @media (min-width: 768px) {
    &:not(:last-child):after {
      content: " / ";
      font-weight: bolder;
      font-size: 3rem;
    }
  }
`;

const BaseUnit = styled(Text)`
  display: inline-block;
  min-width: 6ch;
  text-align: left;

  @media (min-width: 768px) {
    display: inline;
  }
`;

const BaseValue = styled(Text)`
  font-variant-numeric: oldstyle-nums;
  font-size: 2rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

export const Unit: FC<{ unit: string }> = ({ unit }) => (
  <BaseUnit as="span" $fontWeight={300}>
    {unit}
  </BaseUnit>
);

export const Value: FC<{ value: number | string }> = ({ value }) => (
  <BaseValue as="span" $fontWeight={300}>
    {value ?? "-"}
  </BaseValue>
);

export type MeasurementProps = {
  value: number | string;
  unit: string;
  renderAs?: keyof JSX.IntrinsicElements;
};

const defaultRenderAs: Extract<keyof JSX.IntrinsicElements, "span"> = "span";

export const Measurement: FC<MeasurementProps> = ({
  value,
  unit,
  renderAs = defaultRenderAs
}) => (
  <BaseEntry as={renderAs}>
    <Value value={value} /> <Unit unit={unit} />
  </BaseEntry>
);
