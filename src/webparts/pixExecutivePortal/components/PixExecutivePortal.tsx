import * as React from "react";
import App from "../App";

export default function PixExecutivePortal(): JSX.Element {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        padding: 0,
        margin: 0,
      }}
    >
      <App />
    </div>
  );
}