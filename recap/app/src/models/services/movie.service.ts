import axios from "axios";
import { API_KEY, API_TMDB } from "../../../../constants/url";
import { applyAuthInterceptor } from "./api.service";

export const movieApi = axios.create({
    baseURL: API_TMDB,
    params: {
        api_key: API_KEY,
        language: "pt-BR",
        content_adult: false,
    },
});

applyAuthInterceptor(movieApi);

// export const movieBackApi = axios.create({baseURL: API_URL});

// applyAuthInterceptor(movieBackApi);