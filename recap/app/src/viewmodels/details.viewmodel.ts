import { useEffect, useState } from "react";
import { Movie } from "../models/movie";
import { Review } from "../models/review";
import { movieApi } from "../services/movie.service";

export function useDetailsViewModel(id: string | string[] | undefined) {
    const [detail, setDetail] = useState<Movie | null>(null);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [option, setOption] = useState('A');

    useEffect(() => {
        const getDetail = async () => {
            if (!id) return;

            try {
                setLoading(true);
                // const response = await movieBackApi.get(`/movies/${id}`);
                const response = await movieApi.get(`/movie/${id}`);
                setDetail(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes do filme:", error);
            } finally {
                setLoading(false);
            }
        };

        getDetail();
    }, [id]);

    const handleOption = (opt: string) => {
        setOption(opt);
    };

    const handleModal = () => {
        setModal(!modal);
    };

    const reviews: Review[] = [
        { id_user: 1, user: "nathireza", title: "muito doido", date: "2025-10-01 17:52", rate: 3, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus  neque. Cras sit amet ligula ut justo commodo porta id ut enim. Nulla est lectus, mollis sit amet vehicula id, volutpat eget mauris.", spoiler: false, likes: 3, comments: 1 },
        { id_user: 2, user: "xxmarcelo", title: "pica das galáxias", date: "2025-10-02 10:55", rate: 2, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus  neque. Cras sit amet ligula ut justo commodo porta id ut enim. Nulla est lectus, mollis sit amet vehicula id, volutpat eget mauris.", spoiler: true, likes: 3, comments: 1 },
        { id_user: 3, user: "pedrolas", title: "interessante", date: "2025-10-02 13:55", rate: 4.5, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus  neque. Cras sit amet ligula ut justo commodo porta id ut enim. Nulla est lectus, mollis sit amet vehicula id, volutpat eget mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus  neque. Cras sit amet ligula ut justo commodo porta id ut enim. Nulla est lectus, mollis sit amet vehicula id, volutpat eget mauris.", spoiler: false, likes: 3, comments: 1 }
    ];

    return { detail, loading, option, reviews, handleOption, modal, handleModal };
}