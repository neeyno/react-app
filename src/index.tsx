import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { chains, config } from "./utils/web3";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <WagmiConfig config={config}>
            <RainbowKitProvider chains={chains}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </RainbowKitProvider>
        </WagmiConfig>
    </React.StrictMode>
);
