import { Link } from "react-router-dom";

import { UserModel } from "../models/models";
import { useEffect, useState } from "react";
import * as callApi from "../api";
import { useAccount, useConnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSignMessage } from "wagmi";

// interface HomePageProps {
//     loggedInUser: UserModel | null;
// }

function Home(/* { loggedInUser }: HomePageProps */) {
    const [username, setUsername] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const { address, isConnected, isConnecting, isDisconnected } = useAccount();
    const { data, isError, isLoading, isSuccess, signMessageAsync } =
        useSignMessage({
            message: "Sing up!?",
        });

    async function handlePullReqest(type: string) {
        if (!address) return;
        const username = "User1337";

        let jwt =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg0MmUzQmE2YTdmNTJkOTljNjBGYTdBN0MzY2U0YTVlYTg5NjQ5ODk2IiwiZXhwIjoxNjgzNjEyMzY2LCJ1c2VybmFtZSI6IlVzZXIxMzM3In0.TrWGMORPVnGTlNCNQejFGxUPEfGMKOqDLVPtpSlHfOw";

        try {
            if (type === "singlePull") {
                const response = await callApi.createSinglePull({
                    username,
                    address,
                    jwt,
                });
                console.log(response.items);
            } else {
                const response = await callApi.createMultiPull({
                    username,
                    address,
                    jwt,
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

        try {
            const jwt =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzI…M3In0.OM0Q0XADKI4wgvThw7J1uVchH_IfmW9CMDEZ37dsmy4";

            const data = await callApi.getLoggedInUser({
                username,
                address,
                jwt,
            });

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
    };

    async function handleSingUp() {
        try {
            if (address === undefined) throw new Error("No address");
            if (username === undefined) throw new Error("No username");

            const signature = await signMessageAsync();

            if (signature === undefined) throw new Error("No signature");

            const token = await callApi.signUp({
                username,
                address,
                signature,
            });

            // Do something with the token (e.g., save it to the state, local storage, or send it to another component)
            console.log("Sign Up successful:", token);
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

    return (
        <>
            {isConnected && (
                <div>
                    <p>Welcome {username}</p>
                    <button onClick={() => handlePullReqest("singlePull")}>
                        Single Pull
                    </button>
                    <button onClick={() => handlePullReqest("multiPull")}>
                        Multi Pull
                    </button>
                    <button disabled={isLoading} onClick={() => handleSingUp()}>
                        Sign message
                    </button>
                </div>
            )}

            {isDisconnected && (
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
                    <ConnectButton />
                </div>
            )}
        </>
    );
}

export default Home;
