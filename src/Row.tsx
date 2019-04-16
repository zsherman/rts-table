import * as React from "react";
import styled from "@emotion/styled";
import { RowCell } from "./Cell";
import { ListChildComponentProps } from "react-window";

const RowContainer = styled.div`
  display: flex;
`;

interface IRowProps extends ListChildComponentProps {}

export const Row: React.FunctionComponent<IRowProps> = ({
  index,
  style,
  data,
}) => {
  const {
    columns,
    rowStyle,
    rowClassName,
    rowCellClassName,
    rowCellStyle,
  } = data;

  return (
    <RowContainer style={{ ...style, ...rowStyle }} className={rowClassName}>
      {columns.map((c: any, idx: number) => (
        <RowCell
          key={`cell-${idx}`}
          {...c}
          datum={data.data[index]}
          className={rowCellClassName}
          style={{
            ...rowCellStyle,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: `${Math.round((1 / columns.length) * 100)}%`,
          }}
        />
      ))}
    </RowContainer>
  );
};
