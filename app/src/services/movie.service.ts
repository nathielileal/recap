import { Movie } from "../models/movie";
import { applyUserIdHeader, createApiInstance } from "./api.service";

export const movieApi = createApiInstance('movies', true);

movieApi.interceptors.request.use(
    applyUserIdHeader,
    (error) => { return Promise.reject(error); }
);

export const MovieService = {
    getMovies: async (page: number = 1): Promise<Movie[]> => {
        const response = await movieApi.get<Movie[]>('/movies', { params: { page } });

        const movies = response.data.map(item => ({
            tmdbId: item.tmdbId,
            title: item.title,
            overview: item.overview,
            poster_path: item.poster_path,
            releaseDate: item.releaseDate,
        }));

        return movies;
    },

    getMoviesById: async (id: number): Promise<Movie> => {
        const response = await movieApi.get<Movie>(`/movies/${id}`);

        return response.data;
    },
};
