import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRoutes } from "@/routes";
import { ReactQueryProvider, ThemeProvider } from "@/providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ReactQueryProvider>
        <AppRoutes />
      </ReactQueryProvider>
    </ThemeProvider>
  </StrictMode>
);
