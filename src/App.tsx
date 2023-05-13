import { useEffect, useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import NavbarComponent from "./components/NavbarComponent";
// import Loading from "./components/Loading";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";
import { UserModel } from "./models/models";

import * as callApi from "./api";
import { setJwtToken, getJwtToken } from "./utils/helper";

import { useAccount, useConnect, useEnsName, useSignMessage } from "wagmi";

function App() {
    const { address, isConnecting, isDisconnected, isConnected } = useAccount();
    const { data, isError, isLoading, isSuccess, signMessageAsync } =
        useSignMessage({
            message: "Sing up!?",
        });

    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    /*     async function handleSingUp() {
        try {
            if (address === undefined) throw new Error("No address");

            const signature = await signMessageAsync();

            if (signature === undefined) throw new Error("No signature");

            const response = await callApi.signUp({
                address,
                signature,
            });

            setJwtToken(response.token);

            // Do something with the token (e.g., save it to the state, local storage, or send it to another component)
            console.log("Sign Up successful:", response.token);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            // setLoading(false);
        }
    } */

    /* async function fetchUser() {
        // const username = getUsername();
        const token = getJwtToken();

        if (token && address) {
            try {
                const response = await callApi.getLoggedInUser({
                    address,
                    token,
                });

                setJwtToken(response.token);

                console.log(response.token);
            } catch (error) {
                console.error(error);
            }

            try {
                const data = await callApi.getLoggedInUser({
                    address,
                    token,
                });

                setJwtToken(data.token);

                // Do something with the token (e.g., save it to the state, local storage, or send it to another component)
                console.log("Login successful:", data);
            } catch (err) {
                console.error(err);

                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred.");
                }
            }
        }
    } */

    // useEffect(() => {
    //     if (isRegistered() && isConnected) {
    //         fetchUser();
    //         //setShowLoginModal(true);
    //     } else {
    //         setShowSignupModal(true);
    //     }
    // }, [isConnected]);

    /* const LoginOrSignUp = () => {
        if (isConnected) {
            return isRegistered() ? (
                <Home />
            ) : (
                <button onClick={handleSingUp}>Sign up</button>
            );
        }
        return (
            <div>
                <p>Please Connect Wallet</p>
                <hr />
                <ConnectButton />
            </div>
        );
    }; */

    return (
        <>
            <NavbarComponent />
            <div className="max-w-6xl mx-auto">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
