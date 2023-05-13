// import exp from "constants";
import { Address } from "wagmi";
import { UserModel } from "../models/models";
import { getJwtToken } from "../utils/helper";

export type Signature = `0x${string}`;

export interface SignUpCredentials {
    address: Address;
    signature: Signature;
}

export interface LoginCredentials {
    address: Address;
    token: string;
}

interface LoginResponse {
    token: string;
}

interface PullResponse {
    items: string[];
}

/* 
// User functions
*/
export async function loginOrSignUp(
    credentials: SignUpCredentials
): Promise<LoginResponse> {
    // const { address, signature } = credentials;
    console.log(credentials);
    const response = await fetchData(`/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // headers: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        // },
        // body: new URLSearchParams({ address, signature }),
        body: JSON.stringify(credentials),
    });

    return response;
}

export async function logIn(
    credentials: LoginCredentials
): Promise<LoginResponse> {
    const { address, token } = credentials;
    const response = await fetchData(`/api/auth`, {
        method: "POST",
        // headers: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        // },
        // body: new URLSearchParams({ token, address }),
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(credentials),
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
    const { address, token } = credentials;

    const response = await fetchData(`/api/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(credentials),
    });

    return response;
}

/* 
// Pull functions
*/

export async function getPulls() {}

export async function getPull(pullId: string) {}

export async function createSinglePull(
    credentials: LoginCredentials
): Promise<PullResponse> {
    // const token = getJwtToken();
    const { address, token } = credentials;
    if (!token)
        throw new Error(
            "No token found in local storage. Please log in first to create a pull request."
        );

    const response = await fetchData(`/api/single-pull`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(credentials),
        // method: "POST",
        // headers: {
        //     // "Content-Type": "application/json",
        //     Authorization: `Bearer ${jwt}`,
        //     "Content-Type": "application/x-www-form-urlencoded",
        // },
        // body: new URLSearchParams({ username, address, jwt }),
        // body: JSON.stringify({ username, address, jwt }),
    });

    return response;
}

export async function createMultiPull(
    credentials: LoginCredentials
): Promise<PullResponse> {
    // const token = getJwtToken();
    const { address, token } = credentials;
    if (!token)
        throw new Error(
            "No token found in local storage. Please log in first to create a pull request."
        );

    const response = await fetchData(`/api/multi-pull`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(credentials),
    });

    return response;
}

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
