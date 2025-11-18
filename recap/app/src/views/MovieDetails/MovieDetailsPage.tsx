import { Text } from "@react-navigation/elements";
import { router, useLocalSearchParams } from "expo-router";
import { CalendarBlankIcon, CaretLeftIcon, ClockIcon, ListPlusIcon, NotePencilIcon, StarIcon, UserListIcon } from "phosphor-react-native";
import { useMemo } from "react";
import { ActivityIndicator, Alert, FlatList, Image, TouchableOpacity, View } from "react-native";
import { API_IMAGE } from "../../../../constants/url";
import { getYear } from "../../../../lib/utils";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";
import { CardReview } from "../../components/Card/CardReview/CardReview";
import { ReviewModal } from "../../components/Modal/Review/ReviewModal";
import { useThemeContext } from "../../provider/ThemeProvider";
import { useDetailsViewModel } from "../../viewmodels/details.viewmodel";
import { stylesheet } from "./MovieDetails.styles";
import { ListModal } from "../../components/Modal/Lists/ListModal";
import { Rating } from "../../models/rating";

export default function MovieDetailsPage() {
    const { id } = useLocalSearchParams();
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);
    const { tmdbId, detail, loading, option, handleOption, modal, openCreateModal, closeReviewModal, lists, handleLists, reviews, getReviews, addToCatalog } = useDetailsViewModel(id);

    const closeModal = async () => {
        closeReviewModal();
        await getReviews();
    };

    const closeLists = async () => {
        handleLists();
    };

    const showReviews = ({ item }: { item: Rating }) => {
        return (<CardReview data={item} onClosed={closeModal}></CardReview>);
    }

    const handleCatalog = async (tmdbId: number) => {
        const message = await addToCatalog(tmdbId);

        Alert.alert(message);
    };

    const showInfo = () => {
        switch (option) {
            case 'A':
                return (
                    <FlatList
                        data={reviews}
                        style={{ flex: 1 }}
                        renderItem={showReviews}
                        keyExtractor={(item) => String(item.id)}
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
        <CamLenseScreen title="Detalhes" paddingVertical={1} paddingHorizontal={1} header={
            <View style={styles.header}>
                <View style={styles.headerItemLeft}>
                    <TouchableOpacity onPress={() => router.back()} style={{ zIndex: 10 }}>
                        <CaretLeftIcon color={theme.terciary} size={25} weight="thin" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerTitle}>Detalhes</Text>

                <View style={styles.headerItemRight}>
                    <View style={styles.functions}>
                        {/* listas */}
                        <TouchableOpacity onPress={handleLists}>
                            <ListPlusIcon color={theme.secondary} size={26} weight="thin" />
                        </TouchableOpacity>

                        {/* catálogo pessoal */}
                        <TouchableOpacity onPress={() => handleCatalog(tmdbId)}>
                            <UserListIcon color={theme.orange} size={30} weight="thin" style={{ marginLeft: 10 }} />
                        </TouchableOpacity>

                        {/* avaliar */}
                        <TouchableOpacity onPress={openCreateModal}>
                            <NotePencilIcon color={theme.yellow} size={24} weight="thin" style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        }>
            {modal && (
                <ReviewModal tbmdId={Number(id ?? 0)} onClosed={closeModal} ></ReviewModal>
            )}

            {lists && (
                <ListModal tmdbId={Number(id ?? 0)} onClosed={closeLists} />
            )}

            {loading ? (
                <ActivityIndicator size={50} color={theme.terciary} style={{ marginVertical: 20 }} />
            ) : (
                <View style={{ flex: 1 }}>
                    <Image style={styles.image} source={{ uri: `${API_IMAGE}${detail?.backdropPath ?? detail?.posterPath}` }} resizeMode="cover" />

                    <Image style={styles.poster} source={{ uri: `${API_IMAGE}${detail?.posterPath}` }} />

                    <Text style={styles.title}>{detail?.title}</Text>

                    <View style={styles.description}>
                        <View style={styles.descriptionGroup}>
                            <CalendarBlankIcon color={theme.grey} size={25} weight="thin" />

                            <Text style={styles.descriptionText}>{getYear(detail?.releaseDate ?? "")}</Text>
                        </View>

                        <View style={styles.descriptionGroup}>
                            <ClockIcon color={theme.grey} size={25} weight="thin" />

                            <Text style={styles.descriptionText}>{`${detail?.runtime ?? "0"} minutos`}</Text>
                        </View>

                        <View style={styles.descriptionGroup}>
                            <StarIcon color={(detail?.average ?? 0) >= 7 ? theme.orange : theme.grey} size={20} weight={(detail?.average ?? 0) >= 7 ? "duotone" : "thin"} />

                            <Text style={[(detail?.average ?? 0) >= 7 ? styles.descriptionTextHighScore : styles.descriptionText]}>{(detail?.average ?? 0).toFixed(1)}</Text>
                        </View>
                    </View>

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

                    <View style={[styles.about, { flex: 1 }]}>
                        {showInfo()}
                    </View>
                </View>
            )}
        </CamLenseScreen>
    );
}