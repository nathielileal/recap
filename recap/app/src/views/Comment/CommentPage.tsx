import { router, useLocalSearchParams } from "expo-router";
import { CaretLeftIcon, ChatCircleIcon, HeartIcon, PaperPlaneRightIcon, SwatchesIcon, UserCircleIcon } from "phosphor-react-native";
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getRate, getTimeAgo } from "../../../../lib/utils";
import { StarRating } from "../../components/StarRating/StarRating";
import { Comment } from "../../models/comment";
import { useThemeContext } from "../../provider/ThemeProvider";
import { useCommentViewModel } from "../../viewmodels/comment.viewmodel";
import { stylesheet } from "./Comment.styles";
import { useEffect, useMemo } from "react";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";

const stars = Array.from({ length: 5 });
const max_char = 220;

export default function CommentPage() {
    const { movie, id, user, title, description, date_created, rate, initialComments, initialLikes } = useLocalSearchParams();
    const { toggleTheme, theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);
    const { comments, loading, comment, setComment, saveComment, isExpanded, setIsExpanded, isReviewLiked, setIsReviewLiked, reviewLikes, setReviewLikes, updateLikeReview, isLiked, setIsLiked, likes, setLikes, updateLikeComment } = useCommentViewModel(id.toString());

    useEffect(() => {
        setReviewLikes(Number(initialLikes ?? 0));
    }, [initialLikes]);

    const handleExpansion = () => {
        setIsExpanded(prev => !prev);
    };

    const truncatedText = description.length ?? 0 > max_char ? description.toString().substring(0, max_char).trim() + "..." : description;

    const handleReviewLikeClick = async () => {
        const sucesso = await updateLikeReview();

        if (sucesso) {
            setIsReviewLiked(prev => !prev);
            setReviewLikes(prev => !isReviewLiked ? (prev ?? 0) + 1 : (prev ?? 0) - 1);
        } else {
            Alert.alert('Erro', 'Erro ao curtir essa avaliação. Por favor, tente novamente!');
        }
    }

    const handleCommentLikeClick = async (id: string) => {
        const sucesso = await updateLikeComment(id);

        if (sucesso) {
            setIsLiked(prev => !prev);
            setLikes(prev => !isLiked ? (prev ?? 0) + 1 : (prev ?? 0) - 1);
        } else {
            Alert.alert('Erro', 'Erro ao curtir esse comentário. Por favor, tente novamente!');
        }
    }

    const handleSendComment = async () => {
        if (!comment.trim()) {
            Alert.alert('Atenção', 'O comentário não pode estar vazio.');
            return;
        }

        const sucesso = await saveComment();

        if (sucesso) {
            setComment('');
            Alert.alert('Sucesso', 'Comentário adicionado com sucesso!');
        } else {
            Alert.alert('Erro', 'Não foi possível enviar o comentário.');
        }
    }

    return (
        <CamLenseScreen title="" paddingVertical={1} paddingHorizontal={1} header={
            <View style={styles.header}>
                <View style={styles.headerItemLeft}>
                    <TouchableOpacity onPress={() => router.back()} style={{ zIndex: 10 }}>
                        <CaretLeftIcon color={theme.terciary} size={25} weight="thin" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerTitle}>Catálogo pessoal</Text>

                <View style={styles.headerItemRight}>
                    <TouchableOpacity onPress={toggleTheme}>
                        <SwatchesIcon color={theme.terciary} size={25} weight="thin" />
                    </TouchableOpacity>
                </View>
            </View>
        }>
            <View style={styles.container}>
                <ScrollView>
                    {loading ? (
                        <ActivityIndicator size={50} color={theme.terciary} style={{ marginVertical: 20 }} />
                    ) : (
                        <View>
                            <View style={styles.review}>
                                <View style={styles.top}>
                                    <UserCircleIcon color={theme.terciary} size={50} weight="light" />

                                    <View style={styles.info}>
                                        <View style={styles.infoUser}>
                                            <Text style={styles.user}>@{user}</Text>
                                            <Text style={styles.time}>{getTimeAgo(date_created)}</Text>
                                        </View>

                                        <Text style={styles.aboutText}>Avaliou o filme '{movie}'</Text>
                                    </View>
                                </View>

                                <View style={styles.options}>
                                    <View style={styles.stars}>
                                        {stars.map((_, index) => (<StarRating size={15} key={index + 1} index={index + 1} rate={Number(rate ?? 0)} ></StarRating>))}
                                        <Text style={styles.rate}>{Number(rate ?? 0)}</Text>
                                        <Text style={styles.rate}>{`(${getRate(Number(rate ?? 0))})`}</Text>
                                    </View>

                                    <TouchableOpacity style={styles.option} onPress={handleReviewLikeClick}>
                                        <HeartIcon color={theme.secondary} size={15} weight={isReviewLiked ? "fill" : "regular"} />
                                        <Text style={styles.rate}>{`${reviewLikes} ${reviewLikes === 1 ? 'curtida' : 'curtidas'}`}</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.title}>{title != '' ? title : 'Essa avaliação não tem um título.'}</Text>

                                <Text style={styles.description}>{isExpanded ? description : truncatedText}
                                    {(description.length ?? 0) > max_char && (<Text onPress={handleExpansion} style={styles.more}>{isExpanded ? " Mostrar menos" : " Mostrar mais"}</Text>)}
                                </Text>

                                <View style={styles.divider}></View>
                            </View>

                            <View style={styles.list}>
                                <View style={styles.comments}>
                                    <View style={styles.options}>
                                        <ChatCircleIcon color={theme.orange} size={20} />
                                        <Text style={styles.count}>{`${Number(initialComments ?? 0)} ${Number(initialComments ?? 0) === 1 ? 'comentário' : 'comentários'}`}</Text>
                                    </View>
                                </View>

                                {comments.map((item) => (
                                    <View key={item.id_comment} style={styles.comment}>
                                        <View style={styles.infoUser}>
                                            <Text style={styles.commenter}>@{item.user}</Text>
                                            <Text style={styles.time}>comentou {getTimeAgo(date_created)}</Text>
                                        </View>

                                        <View  style={styles.commentLike}>
                                            <Text style={styles.description}>{item.comment}</Text>

                                            <TouchableOpacity style={styles.option} onPress={() => handleCommentLikeClick(item.id_comment)}>
                                                <HeartIcon color={theme.secondary} size={15} weight={isLiked ? "fill" : "regular"} />
                                                <Text style={styles.rate}>{`${likes} ${likes === 1 ? 'curtida' : 'curtidas'}`}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </ScrollView>

                <View style={styles.bottom}>
                    <TextInput value={comment} style={styles.input} multiline autoCapitalize="none" placeholder="Adicione um comentário" placeholderTextColor={theme.terciary} onChangeText={setComment} />

                    <TouchableOpacity style={styles.btn} onPress={handleSendComment}>
                        <PaperPlaneRightIcon color={theme.terciary} size={20} weight="light" />
                    </TouchableOpacity>
                </View>
            </View>
        </CamLenseScreen>
    );
}