import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import React, { FC, useEffect, useMemo } from "react";
import ReactDOM from "react-dom/client";
import WebApp from "@twa-dev/sdk";
import { Router } from "./router";
import "./globals.css";

WebApp.ready();

const queryClient = new QueryClient();

// eslint-disable-next-line react-refresh/only-export-components
const Root: FC = () => {
  useEffect(() => {
    WebApp.enableClosingConfirmation();
  }, []);

  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  return (
    <React.StrictMode>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </TonConnectUIProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
