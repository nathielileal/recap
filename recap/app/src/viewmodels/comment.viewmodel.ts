import { useEffect, useState } from "react";
import { getYYYYMMDDHHMI } from "../../../lib/utils";
import { Comment } from "../models/comment";
import { Movie } from "../models/movie";
import { Review } from "../models/review";
import { ReviewService } from "../services/review.service";
import { movieApi } from "../services/movie.service";
import { CommentService } from "../services/comment.service";

export function useCommentViewModel(id: string, id_comment?: string, id_ref?: string, spoiler?: boolean, like?: number) {
    const [review, setReview] = useState<Review | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState<string>('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [isReviewLiked, setIsReviewLiked] = useState(false);
    const [reviewLikes, setReviewLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(like);

    useEffect(() => {
        const loadLikeStatus = async () => {
            const liked = await CommentService.isCommentLiked(id_comment ?? '');
            setIsLiked(liked);
        };

        const loadReviewLikeStatus = async () => {
            const liked = await ReviewService.isReviewLiked(id);
            setIsReviewLiked(liked);
        };

        getComments();
        loadLikeStatus();
        loadReviewLikeStatus();
    }, [id, id_comment]);

    const clearForm = () => {
        setComment('');
    }

    const getComments = async () => {
        try {
            const data = await CommentService.getCommentByIdReview(id);

            setComments(data);
        } catch (error) {
            console.error("Erro ao buscar comentários do cache:", error);
            setComments([]);
        }
    };

    const saveComment = async () => {
        const date = new Date();
        const data = {
            id_comment: Date.now().toString(),
            id_comment_ref: id_ref ?? '',
            id_review: id,
            id_user: Date.now().toString(),
            user: "teste",
            date_created: getYYYYMMDDHHMI(date),
            date_modified: getYYYYMMDDHHMI(date),
            description: comment,
            likes: 0,
        };
        const sucess = await CommentService.saveComment(data);

        if (sucess) {
            const comments = await ReviewService.updateCommentReview(id);

            if (comments) {
                setReview(prev => {
                    if (prev) {
                        return { ...prev, comments: (prev.comments ?? 0) + 1 };
                    }

                    return prev;
                });
            }

            getComments();
        }

        return sucess;
    }

    const updateLikeComment = async (id_comment: string) => {
        return await CommentService.updateLikeComment(id_comment);
    }

    const updateLikeReview = async () => {
        return await ReviewService.updateLikeReview(id);
    }

    return { review, comments, loading, comment, setComment, saveComment, clearForm, isExpanded, setIsExpanded, isReviewLiked, setIsReviewLiked, reviewLikes, setReviewLikes, updateLikeReview, isLiked, setIsLiked, likes, setLikes, updateLikeComment };
}