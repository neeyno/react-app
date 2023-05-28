// import { Link } from "react-router-dom";

import { UserModel } from "../models/models";
import { useCallback, useEffect, useState } from "react";
import * as callApi from "../api";
import { useAccount, useConnect, useWalletClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSignMessage } from "wagmi";
import { getJwtToken, hasToken, setJwtToken } from "../utils/helper";
import PullModalComponent from "../components/PullModalComponent";

// interface HomePageProps {
//     loggedInUser: UserModel | null;
// }

function Home(/* { loggedInUser }: HomePageProps */) {
    const [loggedInUser, setLoggedInUser] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pullModal, setPullModal] = useState<string[] | null>(null);

    // const { data: walletClient } = useWalletClient();

    const { address, isConnected, isDisconnected } = useAccount();
    const { isError, isSuccess, signMessageAsync } = useSignMessage();

    async function handlePullReqest(type: string) {
        if (!address) return;

        let token = getJwtToken();
        if (!token) return;

        // Set isLoading to true
        setIsLoading(true);

        try {
            if (type === "singlePull") {
                const response = await callApi.createSinglePull({
                    address,
                    token,
                });

                setPullModal(response.items);
                console.log(response.items);
            } else {
                const response = await callApi.createMultiPull({
                    address,
                    token,
                });

                setPullModal(response.items);
                console.log(response.items);
            }
        } catch (error) {
            console.error(error);
        } finally {
            // Set isLoading back to false
            setIsLoading(false);
        }
    }

    async function handleSingUp() {
        try {
            if (address === undefined) throw new Error("No address");

            let message = `I am signing this message to prove ownership of my Ethereum address on ABCname-app\nTimestamp: ${Date.now()}`;
            // let prefixedMessage = `\x19Ethereum Signed Message:\n${message.length}${message}`;

            const signature = await signMessageAsync({ message });
            // const signature = await walletClient?.signMessage({ message });

            if (signature === undefined) throw new Error("No signature");

            const response = await callApi.loginOrSignUp({
                message,
                address,
                signature,
            });

            setJwtToken(response.token);

            setLoggedInUser(true);

            // Do something with the token (e.g., save it to the state, local storage, or send it to another component)
            console.log("Sign Up successful:", response.token);
        } catch (err) {
            setLoggedInUser(false);
            console.error(err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            // setLoading(false);
        }
    }

    const handleCloseModal = () => {
        setPullModal(null);
    };

    const fetchUser = useCallback(async () => {
        // const username = getUsername();
        const token = getJwtToken();

        if (token && address && !loggedInUser) {
            try {
                const data = await callApi.getLoggedInUser({
                    address,
                    token,
                });

                if (!callApi.isLoginResponse(data))
                    throw new Error("Invalid token status");

                // setJwtToken(data.status);
                setLoggedInUser(true);

                // Do something with the token (e.g., save it to the state, local storage, or send it to another component)
                console.log("Login successful:", data);
            } catch (err) {
                console.error(err);

                setLoggedInUser(false);

                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred.");
                }
            }
        }
    }, [address, loggedInUser]);

    useEffect(() => {
        if (isConnected) {
            fetchUser();
            //setShowLoginModal(true);
        } else {
            console.error("error");
        }
    }, [isConnected, fetchUser, loggedInUser]);

    /**
     * Render the component
     */
    return (
        <>
            {isConnected && (
                <div className="p-6 mx-auto  rounded-xl shadow-md flex items-center space-x-4">
                    <div>
                        <p className="text-xl font-medium text-black">
                            {`Welcome\n ${address}`}
                        </p>
                        {loggedInUser ? (
                            <div className="mt-2 text-gray-500 flex space-x-4">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() =>
                                        handlePullReqest("singlePull")
                                    }
                                >
                                    {isLoading ? "Loading" : "Single Pull"}
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() =>
                                        handlePullReqest("multiPull")
                                    }
                                >
                                    {isLoading ? "Loading" : "Multi Pull"}
                                </button>
                            </div>
                        ) : (
                            <button
                                disabled={isLoading}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleSingUp()}
                            >
                                Sign message
                            </button>
                        )}
                    </div>
                </div>
            )}
            {isDisconnected && (
                <div className="p-6 max-w-sm mx-auto rounded-xl shadow-md flex items-center space-x-4">
                    <div>
                        <div className="text-xl font-medium text-black">
                            Please Connect Wallet
                        </div>
                        <hr className="mt-4" />
                        <ConnectButton />
                    </div>
                </div>
            )}
            {error && <div>{error}</div>}
            {/* {pullModal && (
                <PullModalComponent
                    pullModal={pullModal}
                    onClose={handleCloseModal}
                />
            )} */}
        </>
    );
}

export default Home;

/* 
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!address) return;
        e.preventDefault();
        setError(null);

        let token = getJwtToken();

        try {
            // const data = await callApi.getLoggedInUser({
            //     address,
            //     token,
            // });

            // Do something with the token (e.g., save it to the state, local storage, or send it to another component)
            console.log("Login successful:", "data");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
    }; */

/*  {isDisconnected && (
                <div>
                    <p>Please Connect Wallet</p>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="address">Ethereum Address:</label>
                            <input
                                id="address"
                                type="text"
                                value={address}
                                onChange={(e) => "setAddress(e.target.value)"}
                                required
                            />
                        </div>
                        <button type="submit">Log in</button>
                        {error && <div>{error}</div>}
                    </form>
                </div>
            )} 
            */
