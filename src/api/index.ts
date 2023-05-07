import exp from "constants";
import { UserModel } from "../models/user";
import { getJwtToken } from "../utils/helper";

export interface SignUpCredentials {
    username: string;
    address: string;
    signature: string;
}

export interface LoginCredentials {
    username: string;
    address: string;
    jwt: string;
}

interface LoginResponse {
    token: string;
}

/* 
// User functions
*/
export async function signUp(
    credentials: SignUpCredentials
): Promise<LoginResponse> {
    const { username, address, signature } = credentials;
    const response = await fetchData(`/api/register`, {
        method: "POST",
        // headers: {
        //     "Content-Type": "application/json",
        // },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ username, address, signature }),
        // body: JSON.stringify({ username, address, jwt }),
    });

    return response;
}

export async function logIn(
    credentials: LoginCredentials
): Promise<LoginResponse> {
    const { username, address } = credentials;
    const response = await fetchData(`/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ username, address }),
    });

    return response;
}

export async function logOut() {
    const response = await fetchData(`/api/logout`, { method: "POST" });

    return response;
}

export async function getLoggedInUser(
    credentials: LoginCredentials
): Promise<LoginResponse> {
    const { username, address, jwt } = credentials;
    const response = await fetchData(`/api/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ username, address, jwt }),
    });

    return response;
}

/* 
// Pull functions
*/

export async function getPulls() {}

export async function getPull(pullId: string) {}

export async function createSinglePull(username: string) {
    const token = getJwtToken();
    if (!token)
        throw new Error(
            "No token found in local storage. Please log in first to create a pull request."
        );

    const address = "0x0";

    const response = await fetchData(`/api/single-pull`, {
        method: "POST",
        headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ username, address, token }),
        // body: JSON.stringify({ username, address, jwt }),
    });

    return response.json();
}

export async function createMultiPull() {}

/* 
// fetch data 
*/
async function fetchData(reqInput: RequestInfo, reqInit?: RequestInit) {
    const response = await fetch(reqInput, reqInit);

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error(`Request failed with status: ${response.statusText}`);
    }
}
