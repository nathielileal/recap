import { useState } from "react";
import { getYYYYMMDDHHMI } from "../../../lib/utils";
import { ReviewService } from "../services/review.service";

const REVIEW = "review";

export function useReviewViewModel(id: string) {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isChecked, setChecked] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [tag, setTag] = useState<string>('');

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
        const review = { id_review: Date.now().toString(), id_movie: id, id_user: Date.now().toString(), user: "teste", title: title, date: getYYYYMMDDHHMI(date), rate: rating, description: description, spoiler: isChecked, tags: tags };

        console.log(review);
        return await ReviewService.saveReview(review);
    }

    return { rating, setRating, title, setTitle, description, setDescription, isChecked, setChecked, tags, setTags, tag, setTag, saveReview, clearForm };
}