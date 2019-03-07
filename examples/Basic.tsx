import * as React from "react";
import { Table } from "../src";
import { columns, data } from "../data";

const IApp: React.FunctionComponent = props => {
  return <Table data={data} columns={columns} />;
};

export default IApp;
