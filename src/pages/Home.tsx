import { Link } from "react-router-dom";

import { UserModel } from "../models/models";
import { useEffect, useState } from "react";
import * as callApi from "../api";
import { useAccount, useConnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSignMessage } from "wagmi";
import { getJwtToken, hasToken, setJwtToken } from "../utils/helper";

// interface HomePageProps {
//     loggedInUser: UserModel | null;
// }

function Home(/* { loggedInUser }: HomePageProps */) {
    const [loggedInUser, setLoggedInUser] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { address, isConnected } = useAccount();
    const { data, isError, isLoading, isSuccess, signMessageAsync } =
        useSignMessage({
            message: "Sing up!?",
        });

    async function handlePullReqest(type: string) {
        if (!address) return;
        const username = "User1337";

        let token = getJwtToken();
        if (token === null) return;
        try {
            if (type === "singlePull") {
                const response = await callApi.createSinglePull({
                    address,
                    token,
                });
                console.log(response.items);
            } else {
                const response = await callApi.createMultiPull({
                    address,
                    token,
                });
                console.log(response.items);
            }
        } catch (error) {
            console.error(error);
        }
    }

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
    };

    async function handleSingUp() {
        console.log(data);
        try {
            if (address === undefined) throw new Error("No address");

            const signature = await signMessageAsync();

            if (signature === undefined) throw new Error("No signature");

            const response = await callApi.loginOrSignUp({
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
    }

    async function fetchUser() {
        // const username = getUsername();
        const token = getJwtToken();

        if (token && address) {
            try {
                const data = await callApi.getLoggedInUser({
                    address,
                    token,
                });

                setJwtToken(data.token);

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
    }

    useEffect(() => {
        if (hasToken() && isConnected) {
            fetchUser();
            //setShowLoginModal(true);
        } else {
            console.error("error");
        }
    }, [isConnected]);

    if (!isConnected)
        return (
            <div>
                <p>Please Connect Wallet</p>
                <hr />
                <ConnectButton />
            </div>
        );

    return (
        <>
            {isConnected && (
                <div>
                    <p>Welcome {address}</p>
                    {loggedInUser ? (
                        <div>
                            <button
                                onClick={() => handlePullReqest("singlePull")}
                            >
                                Single Pull
                            </button>
                            <button
                                onClick={() => handlePullReqest("multiPull")}
                            >
                                Multi Pull
                            </button>
                            {/* <button
                                disabled={isLoading}
                                onClick={() => handleSingUp()}
                            >
                                Sign message
                            </button> */}
                        </div>
                    ) : (
                        <button
                            disabled={isLoading}
                            onClick={() => handleSingUp()}
                        >
                            Sign message
                        </button>
                    )}
                </div>
            )}
            {/*  {isDisconnected && (
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
            )} */}
            {error && <div>{error}</div>}
        </>
    );
}

export default Home;
