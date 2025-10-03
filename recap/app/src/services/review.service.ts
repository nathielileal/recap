import AsyncStorage from "@react-native-async-storage/async-storage";
import { Review } from "../models/review";

const REVIEW_KEY = "review";

export const ReviewService = {
    async getReviews(): Promise<Review[]> {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const revs = keys.filter(key => key.startsWith('review'));

            if (revs.length === 0) {
                return [];
            }

            const results = await AsyncStorage.multiGet(revs);
            const reviews: Review[] = results.map(([key, value]) => value ? JSON.parse(value) as Review : null).filter((review): review is Review => review !== null);

            console.log(reviews);
            return reviews;
        } catch (e) {
            console.error('Erro geral ao buscar reviews do cache:', e);
            return [];
        }
    },

    async getMovieReviews(id_movie: string): Promise<Review[]> {
        try {
            const reviews: Review[] = await this.getReviews();

            if (reviews.length === 0) {
                return [];
            }

            const data = reviews.filter(review => review.id_movie === id_movie);

            data.sort((a, b) => {
                const da = new Date(a.date).getTime();
                const db = new Date(b.date).getTime();

                return db - da;
            });

            return data;
        } catch (e) {
            console.error(`Erro ao buscar reviews para o filme ID ${id_movie}:`, e);
            return [];
        }
    },

    async saveReview(data: Review): Promise<boolean> {
        try {
            const json = JSON.stringify(data);
            await AsyncStorage.setItem(`${REVIEW_KEY}${data.id_review}`, json);

            return true;
        } catch (e) {
            console.error('Erro ao salvar review:', e);
            return false;
        }
    }
}