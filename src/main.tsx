import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const root = document.getElementById("root");

root?.classList.add("bg-gray-100");
root?.classList.add("dark:bg-gray-900");
root?.classList.add("h-screen");
root?.classList.add("m-0");
