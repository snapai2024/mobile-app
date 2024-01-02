import axios from "axios";
import {getHeaders} from "./headers";

export const apiClient = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: getHeaders()
});