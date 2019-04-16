import { storiesOf } from "@storybook/react";
import React from "react";

/* Helpers */
import Code from "./Code";

/* Example stories */
import Pagination from "../examples/Pagination";
import Virtualized from "../examples/Virtualized";

/* Raw markup for demos */
const PaginationCode = require("!raw-loader!../examples/Pagination.tsx");
const VirtualizedCode = require("!raw-loader!../examples/Virtualized.tsx");

/* Base styles */
import "../src/style/style.css";

function cleanExample(str) {
  return str
    .replace(`import { Debug } from './Debug';`, "")
    .replace(`<Debug />`, "");
}

storiesOf("Table", module)
  .add("Pagination", () => {
    return (
      <div>
        <main>
          <Pagination />
        </main>
        <Code>{cleanExample(PaginationCode)}</Code>
      </div>
    );
  })
  .add("Virtualized", () => {
    return (
      <div>
        <main>
          <Virtualized />
        </main>
        <Code>{cleanExample(VirtualizedCode)}</Code>
      </div>
    );
  });
