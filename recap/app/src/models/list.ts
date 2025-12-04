import { Movie } from "./movie";

export interface List {
    id: number,
    userId: string,
    name: string,
    description?: string,
    image_path?: string,
    createdAt: string,
    movies: Movie[],
}