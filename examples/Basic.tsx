import * as React from "react";
import { Table } from "../src";
import { columns, data } from "../data";

interface IAppProps {}

const IApp: React.FunctionComponent<IAppProps> = props => {
  return <Table data={data} columns={columns} />;
};

export default IApp;
