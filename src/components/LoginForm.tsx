// src/components/LoginForm.tsx
import React, { useState } from "react";
import { logIn } from "../api";

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const jwt = "";

        /* try {
            const data = await logIn({ username, address, jwt });
            // Do something with the token (e.g., save it to the state, local storage, or send it to another component)
            console.log("Login successful:", data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        } */
    };

    return (
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
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Log in</button>
            {error && <div>{error}</div>}
        </form>
    );
};

export default LoginForm;
