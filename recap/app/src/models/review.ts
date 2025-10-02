
export interface Review {
    id_user: number,
    user: string,
    title: string,
    date: string,
    rate: number,
    description: string,
    spoiler: boolean,
    likes: number,
    comments: number,
}