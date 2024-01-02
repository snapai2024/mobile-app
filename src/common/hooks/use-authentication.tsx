import {jwtDecode} from "jwt-decode";
import {useHistory} from "react-router";

export const useAuthentication = () => {
    const token = localStorage.getItem('accessToken');
    const history = useHistory();

    const isAuthenticated = () => !!token && !isExpired(token)

    const isExpired = (token: string): boolean => {
        const decodedToken = jwtDecode(token);

        return decodedToken.exp! < Date.now() / 1000;
    }

    const login = (token: string) => {
        if (!token) return;

        localStorage.setItem("accessToken", token);
        history.push('/home')
    }

    const logout = () => {
        localStorage.removeItem("accessToken");
        history.push('/login')
    }

    return {
        isAuthenticated,
        login,
        logout
    }
}