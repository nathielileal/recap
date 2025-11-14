import { Movie } from "../models/movie";
import { createApiInstance } from "./api.service";

export const movieApi = createApiInstance('movies');

export const MovieService = {
    getMovies: async (page: number = 1): Promise<Movie[]> => {
        const response = await movieApi.get<Movie[]>('/movies', { params: { page } });

        const movies = response.data.map(item => ({
            tmdbId: item.tmdbId,
            title: item.title,
            overview: item.overview,
            posterPath: item.posterPath,
            releaseDate: item.releaseDate,
        }));

        return movies;
    },
};
