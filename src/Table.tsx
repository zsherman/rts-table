/* NPM */
import * as React from "react";

/* Types */
import { Column } from "./types";

/* Local */
import { Container } from "./Container";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { Pagination } from "./Pagination";
import { Loader } from "./Loader";

export interface ITableProps {
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
  rowStyle?: React.CSSProperties;
  rowCellStyle?: React.CSSProperties;
  headStyle?: React.CSSProperties;
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
  sortable: boolean;
  sortDesc?: boolean;
  sortBy?: string;
  isLoading: boolean;
  showPagination: boolean;
  showHeader: boolean;
}

export interface ITableState {
  currentPage: number;
}

const defaultProps = {
  className: "rts-table",
  pageSize: 10,
  sortable: true,
  currentPage: 1,
  controlled: true,
  showHeader: true,
  showPagination: true,
  rowCellStyle: { borderBottom: "1px solid #eee" },
  columns: [],
  data: [],
  isLoading: false,
};

export class Table extends React.Component<ITableProps, ITableState> {
  static defaultProps = defaultProps;

  state: ITableState = {
    currentPage: 1,
  };

  public get pageCount() {
    const { data, pageSize } = this.props;
    return Math.max(Math.round(data.length / pageSize), 1);
  }

  public incrementPage = () => {
    const { onPageChange, currentPage } = this.props;

    const nextPage =
      currentPage !== this.pageCount ? currentPage + 1 : currentPage;
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

  public renderLoading() {
    const { loader: CustomLoader } = this.props;
    if (CustomLoader) {
      return <CustomLoader />;
    }
    return <Loader />;
  }

  public render() {
    const {
      columns,
      data,
      isLoading,
      showHeader,
      tableClassName,
      tableStyle,
      containerStyle,
      headClassName,
      headCellClassName,
      rowClassName,
      rowCellClassName,
      sortDesc,
      sortBy,
      onSortChange,
      currentPage,
      pageSize,
      showPagination,
    } = this.props;

    return (
      <Container style={containerStyle}>
        <table className={tableClassName} style={tableStyle}>
          <TableHeader
            visible={showHeader}
            columns={columns}
            headClassName={headClassName}
            headCellClassName={headCellClassName}
            sortDesc={sortDesc}
            sortBy={sortBy}
            onSortChange={onSortChange}
          />
          <TableBody
            visible={!isLoading}
            columns={columns}
            data={data}
            pageSize={pageSize}
            currentPage={currentPage}
            rowClassName={rowClassName}
            rowCellClassName={rowCellClassName}
          />
        </table>
        {isLoading && this.renderLoading()}
        <Pagination
          visible={showPagination && this.pageCount >= 1}
          onNextPage={this.incrementPage}
          onPrevPage={this.decrementPage}
          onPageClick={this.handlePageClick}
          currentPage={currentPage}
          pageCount={this.pageCount}
        />
      </Container>
    );
  }
}
