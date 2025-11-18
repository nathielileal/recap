import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { ChatCircleIcon, HeartIcon, UserCircleIcon, WarningIcon } from "phosphor-react-native";
import { useMemo } from 'react';
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { getTimeAgo } from '../../../../../lib/utils';
import { Review } from '../../../models/review';
import { useThemeContext } from '../../../provider/ThemeProvider';
import { useReviewViewModel } from '../../../viewmodels/review.viewmodel';
import { StarRating } from '../../StarRating/StarRating';
import { stylesheet } from './CardReview.styles';

interface Props {
    data: Review;
    movie: string;
    spoiler?: boolean;
}

const stars = Array.from({ length: 5 });
const max_char = 220;

export function CardReview({ data, movie, spoiler }: Props) {
    const { isExpanded, setIsExpanded, blur, setBlur, isLiked, setIsLiked, likes, setLikes, updateLikeReview } = useReviewViewModel(data.id_review, spoiler ?? data.spoiler, data.likes);
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);

    const handleExpansion = () => {
        setIsExpanded(prev => !prev);
    };

    const handleSpoiler = () => {
        setBlur(false);
        setIsExpanded(true);
    };

    const truncatedText = data.description.length > max_char ? data.description.substring(0, max_char).trim() + "..." : data.description;

    const handleLikeClick = async () => {
        const sucesso = await updateLikeReview();

        if (sucesso) {
            setIsLiked(prev => !prev);
            setLikes(prev => !isLiked ? (prev ?? 0) + 1 : (prev ?? 0) - 1);
        } else {
            Alert.alert('Erro', 'Erro ao curtir essa avaliação. Por favor, tente novamente!');
        }
    }

    const showComments = () => {
        router.push({
            pathname: "/src/views/Comment/CommentPage", params: {
                movie: movie,id: data.id_review, user: data.user, title: data.title, description: data.description, date_created: data.date_created, rate: data.rate, initialComments: data.comments, initialLikes: data.likes
            }
        });
    }

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <UserCircleIcon color={theme.terciary} size={30} weight="light" />

                <View style={styles.info}>
                    <View style={styles.infoUser}>
                        <Text style={styles.title}>@{data.user}</Text>
                        <Text style={styles.time}>{getTimeAgo(data.date_created)}</Text>
                    </View>

                    <View style={styles.stars}>
                        {stars.map((_, index) => (<StarRating key={index + 1} index={index + 1} rate={data.rate}></StarRating>))}
                    </View>
                </View>
            </View>

            <View>
                <Text style={styles.description}>
                    {isExpanded ? data.description : truncatedText}
                    {data.description.length > max_char && (<Text onPress={handleExpansion} style={styles.more}>{isExpanded ? " Mostrar menos" : " Mostrar mais"}</Text>)}
                </Text>

                {blur && (
                    <BlurView intensity={30} tint="dark" style={styles.blur} >
                        <TouchableOpacity onPress={handleSpoiler} style={styles.btn}>
                            <WarningIcon color={theme.secondary} size={10} />
                            <Text style={styles.spoiler}>SPOILER!</Text>
                        </TouchableOpacity>
                    </BlurView>
                )}
            </View>

            <View style={styles.options}>
                <View>
                    <TouchableOpacity style={styles.option} onPress={handleLikeClick}>
                        <HeartIcon color={theme.secondary} size={10} weight={isLiked ? "fill" : "regular"} />
                        <Text style={styles.icon}>{`${likes} ${likes === 1 ? 'curtida' : 'curtidas'}`}</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={styles.option} onPress={() => showComments()}>
                        <ChatCircleIcon color={theme.orange} size={10} />
                        <Text style={styles.icon}>{`${data.comments} ${data.comments === 1 ? 'comentário' : 'comentários'}`}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}