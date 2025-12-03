import { PencilSimpleIcon, TrashSimpleIcon, UserCircleIcon } from "phosphor-react-native";
import { useMemo } from 'react';
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { getTimeAgo } from '../../../../../lib/utils';
import { useThemeContext } from '../../../provider/ThemeProvider';
import { useReviewViewModel } from '../../../viewmodels/review.viewmodel';
import { StarRating } from '../../StarRating/StarRating';
import { stylesheet } from './CardReview.styles';
import { Rating } from '../../../models/rating';
import { ReviewModal } from "../../Modal/Review/ReviewModal";
import { useAuthUser } from "../../../context/useAuthUser";

interface Props {
    data: Rating;
    username: string;
    hasMovieName: boolean;
    onClosed: () => void,
}

const stars = Array.from({ length: 5 });
const max_char = 220;

export function CardReview({ data, username, onClosed, hasMovieName }: Props) {
    const { isExpanded, setIsExpanded, deleteRating, modal, handleModal } = useReviewViewModel(0);
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);

    const { loggegId } = useAuthUser();
    const isUser = loggegId === data.userId;

    const handleExpansion = () => {
        setIsExpanded(prev => !prev);
    };

    const handleClosed = () => {
        handleModal();
        onClosed();
    };

    const truncatedText = data.review.length > max_char ? data.review.substring(0, max_char).trim() + "..." : data.review;

    const handleDelete = async () => {
        Alert.alert("Remover avaliacao", "Tem certeza que deseja remover esta avaliação?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Remover", style: "destructive", onPress: async () => {
                    const response = await deleteRating(data.id ?? 0);

                    if (response.success) {
                        Alert.alert("Avaliação excuída com sucesso!");
                        onClosed();
                    } else {
                        const message = response.error || "Ocorreu um erro ao excluir a avaliação. Tente novamente mais tarde!";
                        Alert.alert("Falha ao excluir avaliação", message);
                    }
                }
            },
        ]);
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <UserCircleIcon color={theme.terciary} size={30} weight="light" />

                <View style={styles.info}>
                    <View style={styles.infoUser}>
                        <Text style={styles.title}>@{username}</Text>
                        <Text style={styles.time}>{getTimeAgo(data.updatedAt ?? data.createdAt ?? '')}</Text>
                    </View>

                    <View style={styles.stars}>
                        {stars.map((_, index) => (<StarRating key={index + 1} index={index + 1} rate={data.score}></StarRating>))}
                    </View>
                </View>
            </View>

            <View>
                <Text style={styles.description}>
                    {isExpanded ? data.review : truncatedText}
                    {data.review.length > max_char && (<Text onPress={handleExpansion} style={styles.more}>{isExpanded ? " Mostrar menos" : " Mostrar mais"}</Text>)}
                </Text>
            </View>

            {isUser && (
                <View style={[styles.footer, { alignItems: hasMovieName ? 'flex-start' : 'flex-end', justifyContent: hasMovieName ? 'space-between' : 'flex-end' }]}>
                    {hasMovieName && (
                        <Text style={styles.movie}>Filme: '{data.movie}'</Text>
                    )}

                    <View style={styles.options}>
                        <TouchableOpacity style={styles.option} onPress={handleModal}>
                            <PencilSimpleIcon size={20} color={theme.terciary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={handleDelete}>
                            <TrashSimpleIcon size={20} color={theme.secondary} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {modal && (
                <ReviewModal onClosed={handleClosed} ratingId={data.id} tbmdId={data.tmdbId ?? 0} initialScore={data.score} initialReview={data.review} ></ReviewModal>
            )}
        </View>
    );
}