import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ExcalidrawApp from "./excalidraw-app";

import "./excalidraw-app/pwa";
import "./excalidraw-app/sentry";
// @ts-ignore
globalThis.PALETTE_APP_VERSION = process.env.VERCEL_GIT_COMMIT_SHA;
window.__EXCALIDRAW_SHA__ = process.env.REACT_APP_GIT_SHA;
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <ExcalidrawApp />
  </StrictMode>,
);
