import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { hashToPath } from "./lib/hashRedirect";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Failed to find the root element");
}

const redirectPath = hashToPath(window.location.hash);
if (redirectPath) {
  window.history.replaceState(null, "", redirectPath);
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
