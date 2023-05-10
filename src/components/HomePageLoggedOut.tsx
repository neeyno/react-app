import * as callApi from "../api";
import React, { useState } from "react";
// import LoginForm from "./LoginForm";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const HomePageLoggedOut = () => {
    const [username, setUsername] = useState<string>("");
    // const [address, setAddress] = useState<string>(""); // use web3 to get address
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const jwt =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzI…M3In0.OM0Q0XADKI4wgvThw7J1uVchH_IfmW9CMDEZ37dsmy4";

            /* const data = await callApi.getLoggedInUser({
                username,
                address,
                jwt,
            }); */

            // Do something with the token (e.g., save it to the state, local storage, or send it to another component)
            // console.log("Login successful:", data);
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
                        value={"address"}
                        onChange={(e) => "setAddress(e.target.value)"}
                        required
                    />
                </div>
                <button type="submit">Log in</button>
                {error && <div>{error}</div>}
            </form>
            <ConnectButton />
        </>
    );
};

export default HomePageLoggedOut;
