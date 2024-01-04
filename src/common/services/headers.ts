import {AxiosHeaders} from "axios";

export const getHeaders = (): AxiosHeaders => {
    const token = localStorage.getItem("accessToken");

    const headers = new AxiosHeaders();

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
}