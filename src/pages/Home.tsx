import { Link } from "react-router-dom";

import { UserModel } from "../models/models";
import { useEffect, useState } from "react";
import * as callApi from "../api";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import Loading from "../components/Loading";

// interface HomePageProps {
//     loggedInUser: UserModel | null;
// }

// : <Loading />}</div>/>

function Home(/* { loggedInUser }: HomePageProps */) {
    const { address, isConnected } = useAccount();

    const [username, setUsername] = useState<string>("");
    // const [address, setAddress] = useState<string>(""); // use web3 to get address
    const [error, setError] = useState<string | null>(null);

    async function handlePullReqest(type: string) {
        if (!address) return;
        const username = "User1337";
        // const address = "0x42e3Ba6a7f52d99c60Fa7A7C3ce4a5ea89649896";
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

    return (
        <>
            {isConnected ? (
                <>
                    {/* {notesIsLoading && <Loading />} */}
                    {/* {showNotesLoadingError && <p>Something went wrong...</p>} */}
                    {isConnected && (
                        <div>
                            <p>Welcome {username}</p>
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
                        </div>
                    )}
                </>
            ) : (
                <>
                    <p>Please Log In to see Your profile</p>
                    <h1>Login</h1>
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
                </>
            )}
        </>
    );
}

export default Home;
