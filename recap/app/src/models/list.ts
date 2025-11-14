import { Movie } from "./movie";

export interface List {
    id: number,
    userId: string,
    name: string,
    createdAt: string,
    movies: Movie[],
}