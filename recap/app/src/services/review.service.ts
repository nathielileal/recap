import AsyncStorage from "@react-native-async-storage/async-storage";
import { Review } from "../models/review";

const REVIEW_KEY = "review";
const LIKED_REVIEWS_KEY = "liked_reviews";

export const ReviewService = {
    async getReviews(): Promise<Review[]> {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const revs = keys.filter(key => key.startsWith(REVIEW_KEY));

            if (revs.length === 0) {
                return [];
            }

            // excluir reviews
            // await AsyncStorage.multiRemove(revs);

            const results = await AsyncStorage.multiGet(revs);
            const reviews: Review[] = results.map(([key, value]) => value ? JSON.parse(value) as Review : null).filter((review): review is Review => review !== null);

            return reviews;
        } catch (e) {
            console.error('Erro geral ao buscar avaliações do cache:', e);
            return [];
        }
    },

    async getReviewById(id_review: string): Promise<Review | null> {
        try {
            const key = `${REVIEW_KEY}${id_review}`;
            const json = await AsyncStorage.getItem(key);

            return json != null ? JSON.parse(json) as Review : null;
        } catch (e) {
            console.error(`Erro ao buscar avaliação #${id_review}:`, e);
            return null;
        }
    },

    async getReviewByIdMovie(id_movie: string): Promise<Review[]> {
        try {
            const reviews: Review[] = await this.getReviews();

            if (reviews.length === 0) {
                return [];
            }

            const data = reviews.filter(review => review.id_movie === id_movie);

            data.sort((a, b) => {
                const da = new Date(a.date_created).getTime();
                const db = new Date(b.date_created).getTime();

                return db - da;
            });

            return data;
        } catch (e) {
            console.error(`Erro ao buscar avaliações para o filme #${id_movie}:`, e);
            return [];
        }
    },

    async getLikedReviewIds(): Promise<string[]> {
        const json = await AsyncStorage.getItem(LIKED_REVIEWS_KEY);
        return json ? JSON.parse(json) : [];
    },

    async isReviewLiked(id_review: string): Promise<boolean> {
        const ids = await this.getLikedReviewIds();
        return ids.includes(id_review);
    },

    async saveReview(data: Review): Promise<boolean> {
        try {
            const json = JSON.stringify(data);
            await AsyncStorage.setItem(`${REVIEW_KEY}${data.id_review}`, json);

            return true;
        } catch (e) {
            console.error('Erro ao salvar avaliação:', e);
            return false;
        }
    },

    async updateLikeStatus(id_review: string): Promise<boolean> {
        let ids = await this.getLikedReviewIds();
        const isLiked = ids.includes(id_review);

        if (isLiked) {
            ids = ids.filter(id => id !== id_review);
        } else {
            ids.push(id_review);
        }

        await AsyncStorage.setItem(LIKED_REVIEWS_KEY, JSON.stringify(ids));

        return !isLiked;
    },

    async updateLikeReview(id_review: string): Promise<boolean> {
        const isLiked = await this.updateLikeStatus(id_review);

        const review = await this.getReviewById(id_review);

        if (!review) return false;

        if (isLiked) {
            review.likes += 1;
        } else {
            if (review.likes > 0) {
                review.likes -= 1;
            }
        }

        const json = JSON.stringify(review);
        await AsyncStorage.setItem(`${REVIEW_KEY}${id_review}`, json);

        return true;
    },

    async updateCommentReview(id_review: string): Promise<boolean> {
        try {
            const review = await this.getReviewById(id_review);

            if (!review) return false;

            review.comments = (review.comments ?? 0) + 1;

            const json = JSON.stringify(review);
            await AsyncStorage.setItem(`${REVIEW_KEY}${id_review}`, json);

            return true;
        } catch (e) {
            console.error(`Erro ao incrementar comentários da avaliação #${id_review}:`, e);
            return false;
        }
    }
}