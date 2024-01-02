import {jwtDecode} from "jwt-decode";

export const useAuthentication = () => {
    const token = localStorage.getItem('accessToken');

    const isAuthenticated = () => !!token && !isExpired(token)

    const isExpired = (token: string): boolean => {
        const decodedToken = jwtDecode(token);

        return decodedToken.exp! < Date.now() / 1000;
    }

    const login = (token: string) => {
        if (!token) return;

        localStorage.setItem("accessToken", token);
    }

    const logout = () => {
        localStorage.removeItem("accessToken");
    }

    return {
        isAuthenticated,
        login,
        logout
    }
}