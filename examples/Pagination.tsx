import * as React from "react";
import styled from "@emotion/styled";
import { Table } from "../src";
import { columns, data } from "../data";

const Loader = styled.div`
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IAppProps {}

interface IAppState {
  currentPage: number;
  isLoading: boolean;
  sortBy: string;
  sortDesc: boolean;
}

export default class IApp extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      currentPage: 1,
      isLoading: false,
      sortBy: "dt",
      sortDesc: true,
    };
  }

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page, isLoading: true }, () => {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 500);
    });
  };

  handleSortChange = (sortBy: string, sortDesc: boolean) => {
    this.setState({
      sortBy,
      sortDesc,
    });
  };

  public render() {
    const { currentPage, isLoading, sortBy, sortDesc } = this.state;

    return (
      <Table
        data={data}
        columns={columns}
        currentPage={currentPage}
        onPageChange={this.handlePageChange}
        onSortChange={this.handleSortChange}
        isLoading={isLoading}
        sortBy={sortBy}
        sortDesc={sortDesc}
        tableStyle={{ minHeight: 500 }}
        height={500}
        width={1000}
        loader={() => <Loader>Loading...</Loader>}
      />
    );
  }
}
