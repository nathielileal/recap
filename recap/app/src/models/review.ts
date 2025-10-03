
export interface Review {
    id_review: string,
    id_movie: string,
    id_user: string,
    user: string,
    title: string,
    date: string,
    rate: number,
    description: string,
    spoiler: boolean,
    likes?: number,
    comments?: number,
    tags?: string[],
}