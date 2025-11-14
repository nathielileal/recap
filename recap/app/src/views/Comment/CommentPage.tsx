import { router, useLocalSearchParams } from "expo-router";
import { CaretLeftIcon, ChatCircleIcon, HeartIcon, PaperPlaneRightIcon, UserCircleIcon } from "phosphor-react-native";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getRate, getTimeAgo } from "../../../../lib/utils";
import { StarRating } from "../../components/StarRating/StarRating";
import { Comment } from "../../models/comment";
import { useThemeContext } from "../../provider/ThemeProvider";
import { useCommentViewModel } from "../../viewmodels/comment.viewmodel";
import { stylesheet } from "./Comment.styles";
import { useMemo } from "react";

const stars = Array.from({ length: 5 });
const max_char = 220;

export default function CommentPage() {
    const { id } = useLocalSearchParams();
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);
    const { review, movie, comments, loading, description, setDescription, saveComment, clearForm, isExpanded, setIsExpanded, isReviewLiked, setIsReviewLiked, reviewLikes, setReviewLikes, updateLikeReview, isLiked, setIsLiked, likes, setLikes, updateLikeComment } = useCommentViewModel(id.toString());

    const handleExpansion = () => {
        setIsExpanded(prev => !prev);
    };

    const truncatedText = review?.description.length ?? 0 > max_char ? review?.description.substring(0, max_char).trim() + "..." : review?.description;

    const handleReviewLikeClick = async () => {
        const sucesso = await updateLikeReview();

        if (sucesso) {
            setIsReviewLiked(prev => !prev);
            setReviewLikes(prev => !isReviewLiked ? (prev ?? 0) + 1 : (prev ?? 0) - 1);
        } else {
            Alert.alert('Erro', 'Erro ao curtir essa avaliação. Por favor, tente novamente!');
        }
    }

    const showComments = ({ item }: { item: Comment }) => {
        return (<Text style={styles.aboutText}>{item.description}</Text>);
    }

    const handleCommentLikeClick = async (id: string) => {
        const sucesso = await updateLikeComment(id);

        if (sucesso) {
            setIsLiked(prev => !prev);
            setLikes(prev => !isLiked ? (prev ?? 0) + 1 : (prev ?? 0) - 1);
        } else {
            Alert.alert('Erro', 'Erro ao curtir essa avaliação. Por favor, tente novamente!');
        }
    }

    const handleSendComment = async () => {
        if (!description.trim()) {
            Alert.alert('Atenção', 'O comentário não pode estar vazio.');
            return;
        }

        const sucesso = await saveComment();

        if (sucesso) {
            clearForm();
            Alert.alert('Sucesso', 'Comentário adicionado com sucesso!');
        } else {
            Alert.alert('Erro', 'Não foi possível enviar o comentário.');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => router.back()} style={{ zIndex: 10 }}>
                    <CaretLeftIcon color="#FFFFFF" size={32} weight="thin" />
                </TouchableOpacity>

                <Text style={styles.topTitle}>Comentários</Text>
            </View>

            <ScrollView>
                {loading ? (
                    <Text>Carregando avaliação...</Text>
                ) : (
                    <View>
                        <View style={styles.review}>
                            <View style={styles.header}>
                                <UserCircleIcon color={theme.terciary} size={50} weight="light" />

                                <View style={styles.info}>
                                    <View style={styles.infoUser}>
                                        <Text style={styles.user}>{review?.user}</Text>
                                        <Text style={styles.time}>{getTimeAgo(review?.date_created)}</Text>
                                    </View>

                                    <Text style={styles.aboutText}>{movie?.title ? `Avaliou o filme '${movie.title}'` : 'Não foi possível buscar o nome do filme avaliado.'}</Text>
                                </View>
                            </View>

                            <View style={styles.options}>
                                <View style={styles.stars}>
                                    {stars.map((_, index) => (<StarRating size={15} key={index + 1} index={index + 1} rate={review?.rate ?? 0}></StarRating>))}
                                    <Text style={styles.rate}>{review?.rate}</Text>
                                    <Text style={styles.rate}>{`(${getRate(review?.rate)})`}</Text>
                                </View>

                                <TouchableOpacity style={styles.option} onPress={handleReviewLikeClick}>
                                    <HeartIcon color={theme.secondary} size={15} weight={isReviewLiked ? "fill" : "regular"} />
                                    <Text style={styles.rate}>{`${reviewLikes} ${reviewLikes === 1 ? 'curtida' : 'curtidas'}`}</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.title}>{review?.title != '' ? review?.title : 'Essa avaliação não tem um título.'}</Text>

                            <Text style={styles.description}>{isExpanded ? review?.description : truncatedText}
                                {(review?.description.length ?? 0) > max_char && (<Text onPress={handleExpansion} style={styles.more}>{isExpanded ? " Mostrar menos" : " Mostrar mais"}</Text>)}
                            </Text>

                            <View style={styles.divider}></View>
                        </View>

                        <View style={styles.list}>
                            <View style={styles.comments}>
                                <View style={styles.options}>
                                    <ChatCircleIcon color={theme.orange} size={20} />
                                    <Text style={styles.comment}>{`${review?.comments} ${review?.comments === 1 ? 'comentário' : 'comentários'}`}</Text>
                                </View>
                            </View>

                            {comments.map((item) => (
                                <View key={item.id_comment}>
                                    <Text style={styles.title}>{item.description}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>

            <View style={styles.bottom}>
                <TextInput value={description} style={styles.input} multiline autoCapitalize="none" placeholder="Adicione um comentário" placeholderTextColor={theme.terciary} onChangeText={setDescription} />

                <TouchableOpacity style={styles.btn} onPress={handleSendComment}>
                    <PaperPlaneRightIcon color={theme.terciary} size={20} weight="light" />
                </TouchableOpacity>
            </View>
        </View>
    );
}