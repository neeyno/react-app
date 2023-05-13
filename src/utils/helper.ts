// When you receive the JWT token from the server
// const jwtToken = "your_jwt_token_here";

export function getJwtToken() {
    return localStorage.getItem("token");
}

export function setJwtToken(jwtToken: string) {
    localStorage.setItem("token", jwtToken);
}

export function removeJwtToken() {
    localStorage.removeItem("token");
}

export function isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
}
export function hasToken() {
    const token = localStorage.getItem("token");
    return !!token;
}

export function isUser() {
    const username = localStorage.getItem("username");
    return !!username;
}

export function setUsername(username: string) {
    localStorage.setItem("username", username);
}

export function getUsername() {
    return localStorage.getItem("username");
}

/**
 * when you want to logout
 */
export function logout() {
    removeJwtToken();
}

/**
 * When you receive the JWT token from the server
 * login(jwtToken);
 */
export function login(jwtToken: string) {
    setJwtToken(jwtToken);
}

// Headers for the HTTP requests
export function getHeaders() {
    const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getJwtToken(),
    };
    return headers;
}
