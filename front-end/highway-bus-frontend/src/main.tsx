import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";

// Import all styles here to ensure they load globally
import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/forms.css";
import "./styles/cards.css";
import "./styles/tables.css";
import "./styles/admin.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);