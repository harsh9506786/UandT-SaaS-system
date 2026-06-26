import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoadingProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </LoadingProvider>
);