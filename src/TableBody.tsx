import * as React from "react";
import { Column } from "./types";
import { RowCell } from "./Cell";
import { getPageRange } from "./utils";

interface IBodyProps<TData extends object> {
  columns: Column<TData>[];
  data: TData[];
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
  pageSize,
  currentPage,
  rowClassName,
  rowCellClassName,
  rowStyle,
  rowCellStyle,
}: IBodyProps<TData> & { children?: React.ReactNode }) => {
  if (!visible) return <tbody />;
  const range = getPageRange(currentPage, pageSize, data.length);
  const window = data.slice(range[0], range[1] + 1);

  return (
    <tbody>
      {window.map((d: any, i: number) => (
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
      ))}
    </tbody>
  );
};
