import * as React from "react";
import { ListChildComponentProps } from "react-window";

// interface IRowProps {}

export const Row: React.FunctionComponent<ListChildComponentProps> = ({
  index,
  style,
}) => {
  return <div style={style}>Row {index}</div>;
};
