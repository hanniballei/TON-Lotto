import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import React, { FC, useEffect, useMemo } from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router";
import "./globals.css";
import {
  SDKProvider,
  initClosingBehavior,
  mockTelegramEnv,
  parseInitData,
  useLaunchParams,
} from "@tma.js/sdk-react";
import { mockInitDataRaw, ThemeParams } from "./const/env";

const queryClient = new QueryClient();

if (import.meta.env.DEV || import.meta.env.PROD) {
  const initDataRaw = new URLSearchParams(mockInitDataRaw).toString();

  mockTelegramEnv({
    themeParams: ThemeParams,
    initData: parseInitData(initDataRaw),
    initDataRaw,
    version: "7.2",
    platform: "tdesktop",
  });
}

// eslint-disable-next-line react-refresh/only-export-components
const Root: FC = () => {
  const launchParams = useLaunchParams();

  const [closingBehavior] = initClosingBehavior();

  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  useEffect(() => {
    closingBehavior.enableConfirmation();
  }, [closingBehavior]);

  useEffect(() => {
    (async () => {
      const debug = launchParams.startParam === "debug";
      if (debug) {
        import("eruda")
          .then((lib) => lib.default.init())
          .then(() => {
            console.log("launchParams =>", launchParams);
          });
      }
    })();
  }, [launchParams]);

  return (
    <React.StrictMode>
      <SDKProvider acceptCustomStyles debug>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </TonConnectUIProvider>
      </SDKProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
