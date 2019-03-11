import * as React from "react";
import styled from "@emotion/styled";

interface IRowCellProps {
  datum: any;
  accessor?: string;
  renderer?: React.ComponentType<any>;
  style?: React.CSSProperties;
  className?: string;
}

interface IHeadCellProps {
  accessor?: string;
  style?: React.CSSProperties;
  className?: string;
  sortBy?: string;
  sortDesc?: boolean;
  onSortChange?: (sortBy: string, sortDesc: boolean) => any;
}

const TD = styled.td`
  text-align: left;
  padding: 10px;
`;

const TH = styled.th`
  text-align: left;
  font-weight: 600;
  padding: 10px;
  vertical-align: top;
  cursor: pointer;
`;

export const RowCell: React.FunctionComponent<IRowCellProps> = ({
  datum,
  accessor,
  renderer,
  style = {},
  className,
}) => {
  // If there is an accessor, use that value otherwise pass the whole datum
  const value = accessor ? datum[accessor] : datum;

  if (renderer) {
    return (
      <TD style={style} className={className}>
        {React.createElement(renderer, { value })}
      </TD>
    );
  }

  return (
    <TD style={style} className={className}>
      {value}
    </TD>
  );
};

export const HeadCell: React.FunctionComponent<IHeadCellProps> = ({
  children,
  className,
  accessor,
  sortBy,
  sortDesc,
  onSortChange,
}) => {
  const sort = () => {
    if (onSortChange && accessor) {
      onSortChange(accessor, !sortDesc);
    }
  };
  return (
    <TH className={className} onClick={sort}>
      {sortBy === accessor && sortDesc && <span>&#9650;</span>}
      {sortBy === accessor && !sortDesc && <span>&#9660;</span>}
      {children}
    </TH>
  );
};
