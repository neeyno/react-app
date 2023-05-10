import { useEffect, useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";

import NavbarComponent from "./components/NavbarComponent";
// import Loading from "./components/Loading";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";
import { UserModel } from "./models/models";

import * as callApi from "./api";
import { setJwtToken, getJwtToken } from "./utils/helper";
import { chains, config } from "./utils/web3";

import { useAccount, useConnect, useEnsName } from "wagmi";

function App() {
    // const [loggedInUser, setLoggedInUser] = useState<UserModel | null>(null);
    const { address, isConnected } = useAccount();

    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    /* 
    User accesses the application.
    Check if the user's Ethereum address is registered in the database.
    If not, prompt the user to sign a message and register the address.
    Request a JWT token (or validate and refresh the existing token) for the user.
    Store the token securely in the frontend.
    Use the token for subsequent API requests.
    Implement a refresh token mechanism for when the access token expires.
    When the user logs out, invalidate the token and store it in the server's revocation list. Remove the token from the frontend storage.
    */

    /* async function handleSignUp(username: string, address: string) {
        const signature = "getSignature()";
        try {
            // const user = await callApi.signUpOrLogin(email, password);
            const response = await callApi.signUp({
                username,
                address,
                signature,
            });

            setJwtToken(response.token);
        } catch (error) {
            console.error(error);
        }
    } */

    useEffect(() => {
        async function fetchUser() {
            const username = "User1337";
            const address = "0x42e3Ba6a7f52d99c60Fa7A7C3ce4a5ea89649896";
            let jwt =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg0MmUzQmE2YTdmNTJkOTljNjBGYTdBN0MzY2U0YTVlYTg5NjQ5ODk2IiwiZXhwIjoxNjgzNjEyMzY2LCJ1c2VybmFtZSI6IlVzZXIxMzM3In0.TrWGMORPVnGTlNCNQejFGxUPEfGMKOqDLVPtpSlHfOw";

            try {
                const response = await callApi.getLoggedInUser({
                    username,
                    address,
                    jwt,
                });

                setJwtToken(response.token);
                const user = { username, address, jwt: response.token };
                // setLoggedInUser(user);

                console.log(user);
            } catch (error) {
                console.error(error);
            }
        }

        fetchUser();
    }, []);

    return (
        <WagmiConfig config={config}>
            <RainbowKitProvider chains={chains}>
                <>
                    <NavbarComponent />
                    <div className="max-w-6xl mx-auto">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/*" element={<NotFoundPage />} />
                        </Routes>
                    </div>
                </>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default App;
