import axios from "axios";
import { Movie } from "../models/movie";
import { createApiInstance } from "./api.service";

export const movieApi = createApiInstance('movies');

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

            return movies;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Erro ao buscar filmes.');
            }

            throw new Error('Ocorreu um erro desconhecido.');
        }
    },
};
