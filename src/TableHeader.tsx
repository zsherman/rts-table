import * as React from "react";
import { Column } from "./types";
import { HeadCell } from "./Cell";

interface IHeaderProps {
  columns: Column[];
  visible: boolean;
  headClassName?: string;
  headCellClassName?: string;
  sortDesc?: boolean;
  sortBy?: string;
  onSortChange?: (field: string, sortDesc: boolean) => any;
}

export const TableHeader: React.FunctionComponent<IHeaderProps> = ({
  visible,
  columns,
  headClassName,
  headCellClassName,
  sortDesc,
  sortBy,
  onSortChange,
}) => {
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
