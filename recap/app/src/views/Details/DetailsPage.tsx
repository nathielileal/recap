import { Text } from "@react-navigation/elements";
import { router, useLocalSearchParams } from "expo-router";
import { BookmarkSimpleIcon, CalendarBlankIcon, CaretLeftIcon, ClockIcon, NotePencilIcon, StarIcon } from "phosphor-react-native";
import { FlatList, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { API_IMAGE } from "../../../../constants/url";
import { getYear } from "../../../../lib/utils";
import { CardReview } from "../../components/CardReview/CardReview";
import { ReviewModal } from "../../components/Modal/Review/ReviewModal";
import { Review } from "../../models/review";
import { useDetailsViewModel } from "../../viewmodels/details.viewmodel";
import { styles } from "./Details.styles";

export default function Details() {
    const { id } = useLocalSearchParams();

    const { detail, loading, option, handleOption, modal, handleModal, reviews, getReviews } = useDetailsViewModel(id);

    const closeModal = async () => {
        handleModal();
        await getReviews();
    };

    const showReviews = ({ item }: { item: Review }) => {
        return (<CardReview data={item}></CardReview>);
    }

    const showInfo = () => {
        switch (option) {
            case 'A':
                return (
                    <FlatList
                        data={reviews}
                        renderItem={showReviews}
                        keyExtractor={(item) => String(item.id_user)}
                        scrollEnabled={false}
                        ListEmptyComponent={<Text style={styles.aboutText}>Esse filme ainda não possui nenhuma avaliação.</Text>}
                    />
                );
            case 'S':
                return (
                    <View>
                        <Text style={styles.aboutText}>Informações complementares do filme.</Text>
                    </View>
                );
            case 'E':
                return (
                    <View>
                        <Text style={styles.aboutText}>Informações complementares do elenco.</Text>
                    </View>
                );
            default:
                return null;
        };
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={{ zIndex: 10 }}>
                    <CaretLeftIcon color="#FFFFFF" size={32} weight="thin" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Detalhes</Text>

                <View style={styles.functions}>
                    <TouchableOpacity>
                        <BookmarkSimpleIcon color="#FFFFFF" size={32} weight="thin" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleModal}>
                        <NotePencilIcon color="#FFFFFF" size={32} weight="thin" />
                    </TouchableOpacity>
                </View>
            </View>

            {modal && (
                <ReviewModal id_movie={id.toString()} onClosed={closeModal} ></ReviewModal>
            )}

            <ScrollView style={{ flex: 1 }}>
                {loading ? (
                    <Text>Carregando imagem...</Text>
                ) : (
                    <View>
                        <Image style={styles.image} source={{ uri: `${API_IMAGE}${detail?.backdrop_path}` }} />

                        <Image style={styles.poster} source={{ uri: `${API_IMAGE}${detail?.poster_path}` }} />

                        <Text style={styles.title}>{detail?.title}</Text>

                        <View style={styles.description}>
                            <View style={styles.descriptionGroup}>
                                <CalendarBlankIcon color="#92929D" size={25} weight="thin" />

                                <Text style={styles.descriptionText}>{getYear(detail?.release_date ?? "")}</Text>
                            </View>

                            <View style={styles.descriptionGroup}>
                                <ClockIcon color="#92929D" size={25} weight="thin" />

                                <Text style={styles.descriptionText}>{`${detail?.runtime} minutos`}</Text>
                            </View>

                            <View style={styles.descriptionGroup}>
                                <StarIcon color={(detail?.vote_average ?? 0) >= 7 ? "#FF8700" : "#92929D"} size={25} weight={(detail?.vote_average ?? 0) >= 7 ? "duotone" : "thin"} />

                                <Text style={[(detail?.vote_average ?? 0) >= 7 ? styles.descriptionTextHighScore : styles.descriptionText]}>{(detail?.vote_average ?? 0).toFixed(1)}</Text>
                            </View>
                        </View>
                    </View>
                )}

                <View style={styles.about}>
                    <Text style={styles.aboutText}>{detail?.overview === "" ? "Ops! Parece que esse filme ainda não tem sinopse." : detail?.overview}</Text>
                </View>

                <View style={styles.options}>
                    <TouchableOpacity>
                        <Text style={[styles.option, option === 'A' && styles.optionSelected]} onPress={() => handleOption('A')}>Avaliações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[styles.option, option === 'S' && styles.optionSelected]} onPress={() => handleOption('S')}>Sobre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[styles.option, option === 'E' && styles.optionSelected]} onPress={() => handleOption('E')}>Elenco</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.about}>
                    {showInfo()}
                </View>
            </ScrollView>
        </View>
    );
}