import * as React from "react";
import styled from "@emotion/styled";
import { Column } from "./types";
import { HeadCell } from "./Cell";

interface IHeaderProps<TData extends object> {
  columns: Column<TData>[];
  visible: boolean;
  headClassName?: string;
  headCellClassName?: string;
  sortDesc?: boolean;
  sortBy?: string;
  width: number;
  onSortChange?: (field: string, sortDesc: boolean) => any;
}

const THead = styled.div`
  display: flex;
`;

export const TableHeader = <TData extends object>({
  visible,
  columns,
  headClassName,
  headCellClassName,
  sortDesc,
  sortBy,
  onSortChange,
  width,
}: IHeaderProps<TData> & { children?: React.ReactNode }) => {
  if (!visible) return <thead />;
  return (
    <THead className={headClassName} style={{ width }}>
      {columns.map((c, i) => (
        <HeadCell
          key={`cell-${i}`}
          className={headCellClassName}
          sortDesc={sortDesc}
          sortBy={sortBy}
          accessor={c.accessor}
          onSortChange={onSortChange}
          style={{
            width: `${Math.round((1 / columns.length) * 100)}%`,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {c.header}
        </HeadCell>
      ))}
    </THead>
  );
};
