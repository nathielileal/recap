import axios from "axios";
import { API_KEY, API_TMDB } from "../../../constants/url";
import { getApiUrl } from "../../../lib/utils";
import { applyAuthInterceptor } from "./api.service";

const MOVIE_URL = getApiUrl('movies');

export const movieApi = axios.create({
    baseURL: API_TMDB,
    params: {
        api_key: API_KEY,
        language: "pt-BR",
        content_adult: false,
    },
});

// export const movieApi = axios.create({baseURL: MOVIE_URL});

applyAuthInterceptor(movieApi);
