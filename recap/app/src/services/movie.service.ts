import axios from "axios";
import { applyAuthInterceptor } from "./api.service";
import { API_TMDB, API_KEY } from "../../../constants/url";

export const movieApi = axios.create({
    baseURL: API_TMDB,
    params: {
        api_key: API_KEY,
        language: "pt-BR",
        content_adult: false,
    },
});

applyAuthInterceptor(movieApi);