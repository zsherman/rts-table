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
  isLoading: boolean;
}

export default class IApp extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  public render() {
    const { isLoading } = this.state;

    return (
      <Table
        data={data}
        columns={columns}
        isLoading={isLoading}
        isVirtualized
        isPaginated={false}
        height={500}
        width={600}
        loader={() => <Loader>Loading...</Loader>}
      />
    );
  }
}
