import axios from "axios";
import { applyAuthInterceptor } from "./api.service";

export const movieApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "e7142ca4cdcde09f37a2a161335b3ae1",
        language: "pt-BR",
        content_adult: false,
    },
});

applyAuthInterceptor(movieApi);