import { useEffect, useState } from "react";
import { getYYYYMMDDHHMI } from "../../../lib/utils";
import { ReviewService } from "../services/review.service";

export function useReviewViewModel(id: string, spoiler? : boolean, like?: number,) {
    // new review
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isChecked, setChecked] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [tag, setTag] = useState<string>('');

    // reviews
    const [isExpanded, setIsExpanded] = useState(false);
    const [blur, setBlur] = useState(spoiler);

    const [isLiked, setIsLiked] = useState(false); 
    const [likes, setLikes] = useState(like);

    useEffect(() => {
        const loadLikeStatus = async () => {
            const liked = await ReviewService.isReviewLiked(id);
            setIsLiked(liked);
        };
        
        loadLikeStatus();
    }, [id]); 

    const clearForm = () => {
        setRating(0);
        setTitle('');
        setDescription('');
        setChecked(false);
        setTags([]);
        setTag('');
    }

    const saveReview = async () => {
        const date = new Date();
        const review = { id_review: Date.now().toString(), id_movie: id, id_user: Date.now().toString(), user: "teste", title: title, date_created: getYYYYMMDDHHMI(date), date_modified: getYYYYMMDDHHMI(date), rate: rating, description: description, spoiler: isChecked, likes: 0, comments: 0, tags: tags };

        return await ReviewService.saveReview(review);
    }

     const updateLikeReview = async () => {
        return await ReviewService.updateLikeReview(id); 
    }

    return { rating, setRating, title, setTitle, description, setDescription, isChecked, setChecked, tags, setTags, tag, setTag, saveReview, clearForm, 
        isExpanded, setIsExpanded, blur, setBlur, isLiked, setIsLiked, likes, setLikes, updateLikeReview };
}