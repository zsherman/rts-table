import * as React from "react";
import { Column } from "../src/types";

interface IData {
  dt: string;
  level: string;
  message: string;
  user: string;
}

const messages = [
  "there was an error at line 53:12",
  "Log line aggregate completed in 94.943748ms, source_ids_json: [341], aggregate_fun: count",
  "Log line aggregate completed in 174.240143ms, source_ids_json: [342]",
  "Aggregate hybrid query routed, engine: short, boundary_iso8601: 2019-03-04T21:42:18.151100Z",
  "Log line aggregate completed in 79.620679ms, source_ids_json: [341]",
  "Log line aggregate completed in 225.87654ms",
];
const levels = ["info", "error", "warn", "debug", "fatal"];

export const data = new Array(50).fill(null).map(() => ({
  dt: new Date().toISOString(),
  level: levels[Math.floor(Math.random() * levels.length)],
  message: messages[Math.floor(Math.random() * messages.length)],
  user: "zach@timber.io",
}));

export const columns: Column<IData>[] = [
  {
    header: "Date",
    accessor: "dt",
  },
  {
    header: "Level",
    accessor: "level",
  },
  {
    header: "Message",
    accessor: "message",
  },
  {
    header: "User",
    accessor: "user",
  },
  {
    header: "",
    accessor: "user",
    style: { width: 50 },
    renderer: ({ value }) => <b>...</b>,
  },
];
