import axios from "axios";
import { getToken } from "./authConfig";

export const getUser = async () => {
    console.log("Getting user data");
    const token = getToken();
    const AxiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    try {
        const response = await AxiosInstance.get(
            `${process.env.REACT_APP_DJANGO_API_URL}/api/accounts/get-user`,
            {}
        );
        console.log("User data: ", response);
        return response.data;
    } catch (error) {
        console.log("Error fetching user data: ", error);
    }
};
