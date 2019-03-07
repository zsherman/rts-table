import * as React from "react";
import { Table } from "../src";
import { columns, data } from "../data";

interface IAppProps {}

interface IAppState {
  currentPage: number;
}

export default class IApp extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      currentPage: 1
    };
  }

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };

  public render() {
    const { currentPage } = this.state;
    return (
      <Table
        data={data}
        columns={columns}
        currentPage={currentPage}
        onPageChange={this.handlePageChange}
      />
    );
  }
}
