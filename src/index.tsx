// eslint-disable-next-line import/first
import { StrictMode } from "react";
// eslint-disable-next-line import/first
import { createRoot } from "react-dom/client";
// eslint-disable-next-line import/first
import ExcalidrawApp from "./excalidraw-app";

// eslint-disable-next-line import/first
import "./excalidraw-app/pwa";
// eslint-disable-next-line import/first
import "./excalidraw-app/sentry";

window.__EXCALIDRAW_SHA__ = process.env.REACT_APP_GIT_SHA;
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <ExcalidrawApp />
  </StrictMode>,
);
