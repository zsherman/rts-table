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
  style?: React.CSSProperties;
  className?: string;
}

const TD = styled("td")`
  text-align: left;
  padding: 5px 5px 5px 0;
`;

export const RowCell: React.FunctionComponent<IRowCellProps> = ({
  datum,
  accessor,
  renderer,
  style = {},
  className
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
  className
}) => <th className={className}>{children}</th>;
