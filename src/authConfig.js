import axios from "axios";
import { useNavigate } from "react-router-dom";

export function setToken(accessToken) {
    localStorage.setItem("accessToken", accessToken);
}

export function getToken() {
    return localStorage.getItem("accessToken");
}

export function getRefreshToken() {
    return localStorage.getItem("refreshToken");
}

export function setRefreshToken(refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
}

export async function refreshToken() {
    const refreshToken = getRefreshToken();
    return axios
        .post(`${process.env.REACT_APP_DJANGO_API_URL}/token/refresh`, {
            refresh: refreshToken,
        })
        .then((response) => {
            console.log("Refreshed token: ", response);
            setToken(response.data.access);
            return response.data.access;
        })
        .catch((err) => {
            console.log("Error refreshing token: ", err);
            return err;
        });
}

export function CheckTokenExpiration() {
    const navigate = useNavigate();
    const checkExpiration = async () => {
        try {
            const accessToken = getToken();
            if (!accessToken) {
                console.warn("No access token found");
                navigate("/login"); // Redirect to login page if access token is not found
                return 0;
            }

            const tokenExp =
                JSON.parse(atob(accessToken.split(".")[1])).exp * 1000; // Token expiration time
            const timeUntilExpiration = tokenExp - Date.now();

            console.log("Token expiration time:", tokenExp);
            console.log("Time until expiration:", timeUntilExpiration);

            if (timeUntilExpiration <= 0) {
                console.log("Token has expired and inside if");
                await refreshToken().then((response) => {
                    console.log("Response: ", response);
                    if (response.response.status === 401) {
                        console.log("Error refreshing token");
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        navigate("/login"); // Redirect to login page if token refresh fails
                    } else {
                        console.log("Token refreshed successfully");
                        setTimeout(checkExpiration, 1000 * 60 * 5); // Check token expiration again after 5 minutes
                    }
                });
            } else {
                console.log("Token is still valid");
                console.log("Inside else");
                // Set timeout to check token expiration at the token's expiration time
                setTimeout(checkExpiration, timeUntilExpiration);
            }
        } catch (error) {
            console.error("Error checking token expiration:", error);
        }
    };

    // Initial call to start the expiration check
    checkExpiration();
}
