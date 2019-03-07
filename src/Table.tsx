/* NPM */
import * as React from "react";

/* Types */
import { Column } from "./types";

/* Local */
import { Container } from "./Container";
import { Pagination } from "./Pagination";
import { RowCell, HeadCell } from "./Cell";
import { Loader } from "./Loader";
import { getPageRange } from "./utils";

export interface IAppProps {
  /* class names */
  containerClassName?: string;
  tableClassName?: string;
  rowClassName?: string;
  rowCellClassName?: string;
  headClassName?: string;
  headCellClassName?: string;
  /* custom styles */
  tableStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  /* data */
  columns: Column[];
  data: Array<any>;
  /* page */
  pageSize: number;
  currentPage: number;
  /* handlers */
  onPageChange?: (page: number) => any;
  onSortChange?: (field: string, sortDesc: boolean) => any;
  /* components */
  loader?: React.FunctionComponent<any>;
  /* behavior */
  controlled: boolean;
  sortDesc?: boolean;
  sortBy?: string;
  isLoading: boolean;
  showPagination: boolean;
  showHeader: boolean;
}

export interface IAppState {
  currentPage: number;
}

const defaultProps = {
  className: "rts-table",
  pageSize: 10,
  currentPage: 1,
  controlled: true,
  showHeader: true,
  showPagination: true,
  columns: [],
  data: [],
  isLoading: false,
};

export class Table extends React.Component<IAppProps, IAppState> {
  static defaultProps = defaultProps;

  state: IAppState = {
    currentPage: 1,
  };

  public renderHeaders() {
    const { columns, headClassName, headCellClassName, sortDesc, sortBy, onSortChange } = this.props;
    return (
      <tr className={headClassName}>
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
    );
  }

  public renderRows() {
    const { columns, data, pageSize, currentPage, rowClassName, rowCellClassName } = this.props;

    const range = getPageRange(currentPage, pageSize, data.length);
    const window = data.slice(range[0], range[1] + 1);

    return window.map((d: any, i: number) => (
      <tr key={`row-${i}`} className={rowClassName}>
        {columns.map((c, idx) => (
          <RowCell key={`cell-${idx}`} {...c} datum={d} className={rowCellClassName} />
        ))}
      </tr>
    ));
  }

  public get pageCount() {
    const { data, pageSize } = this.props;
    return Math.max(Math.round(data.length / pageSize), 1);
  }

  public incrementPage = () => {
    const { onPageChange, currentPage } = this.props;

    const nextPage = currentPage !== this.pageCount ? currentPage + 1 : currentPage;
    const pageChanged = nextPage !== currentPage;

    if (pageChanged && onPageChange !== undefined) {
      return onPageChange(nextPage);
    }
  };

  public decrementPage = () => {
    const { onPageChange, currentPage } = this.props;
    const nextPage = currentPage !== 1 ? currentPage - 1 : currentPage;
    const pageChanged = nextPage !== currentPage;

    if (pageChanged && onPageChange !== undefined) {
      return onPageChange(nextPage);
    }
  };

  public handlePageClick = (page: number) => {
    const { onPageChange, currentPage } = this.props;
    const pageChanged = page !== currentPage;
    if (pageChanged && onPageChange) {
      return onPageChange(page);
    }
  };

  public renderPagination() {
    const { currentPage, showPagination } = this.props;
    if (showPagination === false || this.pageCount <= 1) return null;

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

  public renderLoading() {
    const { loader: CustomLoader } = this.props;
    if (CustomLoader) {
      return <CustomLoader />;
    }
    return <Loader />;
  }

  public render() {
    const { showHeader, isLoading, tableClassName, tableStyle, containerStyle } = this.props;

    if (isLoading) {
      return <Container style={containerStyle}>{this.renderLoading()}</Container>;
    }

    return (
      <Container style={containerStyle}>
        <table className={tableClassName} style={tableStyle}>
          {showHeader && <thead>{this.renderHeaders()}</thead>}
          <tbody>{this.renderRows()}</tbody>
        </table>
        {this.renderPagination()}
      </Container>
    );
  }
}
