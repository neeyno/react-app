import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
    mainnet,
    polygon,
    polygonMumbai,
    optimism,
    arbitrum,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const API_KEY_ALECHEMY =
    process.env.ALCHEMY_ID !== undefined ? process.env.ALCHEMY_ID : "";
const API_KEY_INFURA =
    process.env.ALCHEMY_ID !== undefined ? process.env.ALCHEMY_ID : "";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, polygon, polygonMumbai, optimism, arbitrum],
    [alchemyProvider({ apiKey: API_KEY_ALECHEMY }), publicProvider()]
);
const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains,
});
export const config = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});
