/* NPM */
import * as React from "react";
import styled from "@emotion/styled";

/* Types */
import { Column } from "./types";

/* Local */
import { Container } from "./Container";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { Pagination } from "./Pagination";
import { Loader } from "./Loader";

export interface ITableProps<TData extends object> {
  /* class names */
  containerClassName?: string;
  tableClassName?: string;
  rowClassName?: string;
  rowCellClassName?: string;
  headClassName?: string;
  headCellClassName?: string;
  /* dimensions */
  width: number;
  height: number;
  /* custom styles */
  tableStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  rowStyle?: React.CSSProperties;
  rowCellStyle?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  /* data */
  columns: Column<TData>[];
  data: TData[];
  /* pagination */
  isPaginated: boolean;
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
  isVirtualized: boolean;
  showHeader: boolean;
}

export interface ITableState {
  currentPage: number;
}

const TableContainer = styled.div``;

const defaultProps = {
  className: "rts-table",
  pageSize: 10,
  sortable: true,
  currentPage: 1,
  controlled: true,
  showHeader: true,
  isPaginated: true,
  rowCellStyle: { borderBottom: "1px solid #eee" },
  columns: [],
  data: [],
  isLoading: false,
  isVirtualized: false,
};

export class Table<TData extends object> extends React.Component<
  ITableProps<TData>,
  ITableState
> {
  static defaultProps = defaultProps;

  state: ITableState = {
    currentPage: 1,
  };

  private get pageCount() {
    const { data, pageSize } = this.props;
    return Math.max(Math.round(data.length / pageSize), 1);
  }

  private incrementPage = () => {
    const { onPageChange, currentPage } = this.props;

    const nextPage =
      currentPage !== this.pageCount ? currentPage + 1 : currentPage;
    const pageChanged = nextPage !== currentPage;

    if (pageChanged && onPageChange !== undefined) {
      return onPageChange(nextPage);
    }
  };

  private decrementPage = () => {
    const { onPageChange, currentPage } = this.props;
    const nextPage = currentPage !== 1 ? currentPage - 1 : currentPage;
    const pageChanged = nextPage !== currentPage;

    if (pageChanged && onPageChange !== undefined) {
      return onPageChange(nextPage);
    }
  };

  private handlePageClick = (page: number) => {
    const { onPageChange, currentPage } = this.props;
    const pageChanged = page !== currentPage;
    if (pageChanged && onPageChange) {
      return onPageChange(page);
    }
  };

  private renderLoading() {
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
      height,
      width,
      headClassName,
      headCellClassName,
      rowClassName,
      rowCellClassName,
      sortDesc,
      sortBy,
      onSortChange,
      currentPage,
      pageSize,
      isPaginated,
    } = this.props;

    return (
      <Container style={containerStyle}>
        <TableContainer className={tableClassName} style={tableStyle}>
          <TableHeader
            visible={showHeader}
            columns={columns}
            headClassName={headClassName}
            headCellClassName={headCellClassName}
            sortDesc={sortDesc}
            sortBy={sortBy}
            onSortChange={onSortChange}
            width={width}
          />
          <TableBody
            visible={!isLoading}
            columns={columns}
            height={height}
            width={width}
            data={data}
            isPaginated={isPaginated}
            pageSize={pageSize}
            currentPage={currentPage}
            rowClassName={rowClassName}
            rowCellClassName={rowCellClassName}
          />
        </TableContainer>
        {isLoading && this.renderLoading()}
        <Pagination
          visible={isPaginated && this.pageCount >= 1}
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
