import axios from "axios";
import { getApiUrl } from "../../../lib/utils";
import { Movie } from "../models/movie";
import { applyAuthInterceptor } from "./api.service";

const MOVIE_URL = getApiUrl('movies');

// export const movieApi = axios.create({
//     baseURL: API_TMDB,
//     params: {
//         api_key: API_KEY,
//         language: "pt-BR",
//         content_adult: false,
//     },
// });

export const movieApi = axios.create({ baseURL: MOVIE_URL });

export const MovieService = {
    getMovies: async (page: number = 1): Promise<Movie[]> => {
        try {
            const response = await movieApi.get<Movie[]>('/movies', { params: { page } });

            const movies = response.data.map(item => ({
                tmdbId: item.tmdbId, 
                title: item.title,
                overview: item.overview,
                posterPath: item.posterPath,
                releaseDate: item.releaseDate,
            }));

            console.log("movies: " + movies);
            return movies;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Erro ao buscar filmes.');
            }

            throw new Error('Ocorreu um erro desconhecido.');
        }
    },
};

applyAuthInterceptor(movieApi);
