import { useEffect, useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import NavbarComponent from "./components/NavbarComponent";
import Loading from "./components/Loading";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";
import { UserModel } from "./models/user";

import * as callApi from "./api";
import { setJwtToken } from "./utils/helper";

function App() {
    const [loggedInUser, setLoggedInUser] = useState<UserModel | null>(null);

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

    /*  useEffect(() => {
        async function fetchUser() {
            try {
                const user = await callApi.getLoggedInUser();

                setLoggedInUser(user);
            } catch (error) {
                console.error(error);
            }
        }

        fetchUser();
    }, []); */

    return (
        <Suspense fallback={<Loading />}>
            <NavbarComponent />
            <div className="max-w-6xl mx-auto">
                <Routes>
                    <Route
                        path="/"
                        element={<Home loggedInUser={loggedInUser} />}
                    />
                    <Route path="/:id/:bookId" element={<NotFoundPage />} />
                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </Suspense>
    );
}

export default App;
