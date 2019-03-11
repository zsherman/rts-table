import * as React from "react";
import { Column } from "./types";
import { HeadCell } from "./Cell";

interface IHeaderProps<TData extends object> {
  columns: Column<TData>[];
  visible: boolean;
  headClassName?: string;
  headCellClassName?: string;
  sortDesc?: boolean;
  sortBy?: string;
  onSortChange?: (field: string, sortDesc: boolean) => any;
}

export const TableHeader = <TData extends object>({
  visible,
  columns,
  headClassName,
  headCellClassName,
  sortDesc,
  sortBy,
  onSortChange,
}: IHeaderProps<TData> & { children?: React.ReactNode }) => {
  if (!visible) return <thead />;
  return (
    <thead className={headClassName}>
      <tr>
        {columns.map((c, i) => (
          <HeadCell
            key={`cell-${i}`}
            className={headCellClassName}
            sortDesc={sortDesc}
            sortBy={sortBy}
            accessor={c.accessor}
            onSortChange={onSortChange}
          >
            {c.header}
          </HeadCell>
        ))}
      </tr>
    </thead>
  );
};
