import AsyncStorage from "@react-native-async-storage/async-storage";
import { Comment } from "../comment";

const COMMENT_KEY = "comment";
const LIKED_COMMENTS_KEY = "liked_comments";

export const CommentService = {
    async getComments(): Promise<Comment[]> {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const revs = keys.filter(key => key.startsWith(COMMENT_KEY));

            if (revs.length === 0) {
                return [];
            }

            // excluir comentários
            // await AsyncStorage.multiRemove(revs);

            const results = await AsyncStorage.multiGet(revs);
            const comments: Comment[] = results.map(([key, value]) => value ? JSON.parse(value) as Comment : null).filter((c): c is Comment => c !== null);

            return comments;
        } catch (e) {
            console.error('Erro geral ao buscar comentários do cache:', e);
            return [];
        }
    },

    async getCommentById(id_comment: string): Promise<Comment | null> {
        try {
            const key = `${COMMENT_KEY}${id_comment}`;
            const json = await AsyncStorage.getItem(key);

            return json != null ? JSON.parse(json) as Comment : null;
        } catch (e) {
            console.error(`Erro ao buscar comentário #${id_comment}:`, e);
            return null;
        }
    },

    async getCommentByIdReview(id_review: string): Promise<Comment[]> {
        try {
            const comments: Comment[] = await this.getComments();

            if (comments.length === 0) {
                return [];
            }

            const data = comments.filter(comment => comment.id_review === id_review);

            data.sort((a, b) => {
                const da = new Date(a.date_created).getTime();
                const db = new Date(b.date_created).getTime();

                return db - da;
            });

            return data;
        } catch (e) {
            console.error(`Erro ao buscar comentários para a avaliação #${id_review}:`, e);
            return [];
        }
    },

    async getLikedCommentsIds(): Promise<string[]> {
        const json = await AsyncStorage.getItem(LIKED_COMMENTS_KEY);
        return json ? JSON.parse(json) : [];
    },

    async isCommentLiked(id_comment: string): Promise<boolean> {
        const ids = await this.getLikedCommentsIds();
        return ids.includes(id_comment);
    },

    async saveComment(data: Comment): Promise<boolean> {
        try {
            const json = JSON.stringify(data);
            await AsyncStorage.setItem(`${COMMENT_KEY}${data.id_comment}`, json);

            return true;
        } catch (e) {
            console.error('Erro ao salvar comentário:', e);
            return false;
        }
    },

    async updateLikeStatus(id_comment: string): Promise<boolean> {
        let ids = await this.getLikedCommentsIds();
        const isLiked = ids.includes(id_comment);

        if (isLiked) {
            ids = ids.filter(id => id !== id_comment);
        } else {
            ids.push(id_comment);
        }

        await AsyncStorage.setItem(LIKED_COMMENTS_KEY, JSON.stringify(ids));

        return !isLiked;
    },

    async updateLikeComment(id_comment: string): Promise<boolean> {
        const isLiked = await this.updateLikeStatus(id_comment);

        const comment = await this.getCommentById(id_comment);
       
        if (!comment) return false;

        if (isLiked) {
            comment.likes += 1;
        } else {
            if (comment.likes > 0) {
                comment.likes -= 1;
            }
        }

        const json = JSON.stringify(comment);
        await AsyncStorage.setItem(`${COMMENT_KEY}${id_comment}`, json);

        return true;
    }
}