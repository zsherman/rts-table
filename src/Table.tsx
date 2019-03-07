/* NPM */
import * as React from "react";

/* Types */
import { Column } from "./types";

/* Local */
import { Container } from "./Container";
import { Pagination } from "./Pagination";
import { RowCell, HeadCell } from "./Cell";
import { getPageRange } from "./utils";

export interface IAppProps {
  containerClassName?: string;
  tableClassName?: string;
  rowClassName?: string;
  rowCellClassName?: string;
  headClassName?: string;
  headCellClassName?: string;
  columns: Column[];
  data: Array<any>;
  pageSize: 10;
  showPagination: boolean;
  showHeader: boolean;
}

export interface IAppState {
  currentPage: number;
}

const defaultProps = {
  className: "rts-table",
  pageSize: 10,
  showHeader: true,
  showPagination: true,
  columns: [],
  data: []
};

export class Table extends React.Component<IAppProps, IAppState> {
  static defaultProps = defaultProps;

  state: IAppState = {
    currentPage: 1
  };

  public renderHeaders() {
    const { columns, headClassName, headCellClassName } = this.props;
    return (
      <tr className={headClassName}>
        {columns.map((c, i) => (
          <HeadCell key={`cell-${i}`} className={headCellClassName}>
            {c.header}
          </HeadCell>
        ))}
      </tr>
    );
  }

  public renderRows() {
    const {
      columns,
      data,
      pageSize,
      rowClassName,
      rowCellClassName
    } = this.props;
    const { currentPage } = this.state;
    const range = getPageRange(currentPage, pageSize, data.length);
    const window = data.slice(range[0], range[1] + 1);

    return window.map((d: any, i: number) => (
      <tr key={`row-${i}`} className={rowClassName}>
        {columns.map((c, idx) => (
          <RowCell
            key={`cell-${idx}`}
            {...c}
            datum={d}
            className={rowCellClassName}
          />
        ))}
      </tr>
    ));
  }

  public get pageCount() {
    const { data, pageSize } = this.props;
    return Math.max(Math.round(data.length / pageSize), 1);
  }

  public incrementPage = () => {
    this.setState(state => ({
      currentPage:
        state.currentPage !== this.pageCount
          ? state.currentPage + 1
          : state.currentPage
    }));
  };

  public decrementPage = () => {
    this.setState(state => ({
      currentPage:
        state.currentPage !== 1 ? state.currentPage - 1 : state.currentPage
    }));
  };

  public handlePageClick = (page: number) => {
    this.setState({
      currentPage: page
    });
  };

  public renderPagination() {
    const { currentPage } = this.state;

    return (
      <Pagination
        onNextPage={this.incrementPage}
        onPrevPage={this.decrementPage}
        onPageClick={this.handlePageClick}
        currentPage={currentPage}
        pageCount={this.pageCount}
      />
    );
  }

  public render() {
    const { showHeader, showPagination, tableClassName } = this.props;
    return (
      <Container>
        <table className={tableClassName}>
          {showHeader && <thead>{this.renderHeaders()}</thead>}
          <tbody>{this.renderRows()}</tbody>
        </table>
        {showPagination && this.renderPagination()}
      </Container>
    );
  }
}
