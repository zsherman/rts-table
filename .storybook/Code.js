import React from "react";

export default props => (
  <div
    style={{
      margin: "0 12px",
      borderRadius: 4,
      background: "#f6f8fa",
      boxShadow: "0 0 1px  #eee inset",
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
        letterSpacing: "1px",
      }}
    >
      Example Code
    </div>
    <pre
      style={{
        overflowX: "scroll",
        fontSize: 11,
        padding: ".5rem",
        boxSizing: "border-box",
      }}
      {...props}
    />
  </div>
);
