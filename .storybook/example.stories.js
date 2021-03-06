import { storiesOf } from "@storybook/react";
import React from "react";

/* Example stories */
import Controlled from "../examples/Controlled";

/* Raw markup for demos */
const ControlledCode = require("!raw-loader!../examples/Controlled.tsx");

/* Base styles */
import "../src/style/style.css";

function cleanExample(str) {
  return str
    .replace(`import { Debug } from './Debug';`, "")
    .replace(`<Debug />`, "");
}

const Code = props => (
  <div
    style={{
      margin: "0 12px",
      borderRadius: 4,
      background: "#f6f8fa",
      boxShadow: "0 0 1px  #eee inset"
    }}
  >
    <div
      style={{
        textTransform: "uppercase",
        fontSize: 11,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        fontWeight: 500,
        padding: ".5rem",
        background: "#555",
        color: "#fff",
        letterSpacing: "1px"
      }}
    >
      Example Code
    </div>
    <pre
      style={{
        overflowX: "scroll",
        fontSize: 11,
        padding: ".5rem",
        boxSizing: "border-box"
      }}
      {...props}
    />
  </div>
);

storiesOf("Table", module).add("Controlled", () => {
  return (
    <div>
      <main>
        <Controlled />
      </main>
      <Code>{cleanExample(ControlledCode)}</Code>
    </div>
  );
});
