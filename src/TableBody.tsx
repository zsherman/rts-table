import * as React from "react";
import { FixedSizeList } from "react-window";
import { Column } from "./types";
import { Row } from "./Row";
// import { RowCell } from "./Cell";
import { getPageRange } from "./utils";

interface IBodyProps<TData extends object> {
  columns: Column<TData>[];
  data: TData[];
  height: number;
  width: number;
  isPaginated: boolean;
  pageSize: number;
  currentPage: number;
  visible: boolean;
  rowClassName?: string;
  rowCellClassName?: string;
  rowStyle?: React.CSSProperties;
  rowCellStyle?: React.CSSProperties;
}

export const TableBody = <TData extends object>({
  visible,
  columns,
  data,
  height,
  width,
  isPaginated,
  pageSize,
  currentPage,
  rowClassName,
  rowCellClassName,
  rowStyle,
  rowCellStyle,
}: IBodyProps<TData> & { children?: React.ReactNode }) => {
  if (!visible) return <tbody />;

  let window = data;

  if (isPaginated) {
    const range = getPageRange(currentPage, pageSize, data.length);
    window = data.slice(range[0], range[1] + 1);
  }

  return (
    <FixedSizeList
      height={height}
      width={width}
      itemSize={35}
      itemCount={window.length}
    >
      {Row}
    </FixedSizeList>
  );
};

{
  /* {window.map((d: any, i: number) => (
        <tr key={`row-${i}`} className={rowClassName} style={rowStyle}>
          {columns.map((c, idx) => (
            <RowCell
              key={`cell-${idx}`}
              {...c}
              datum={d}
              className={rowCellClassName}
              style={rowCellStyle}
            />
          ))}
        </tr>
      ))} */
}
