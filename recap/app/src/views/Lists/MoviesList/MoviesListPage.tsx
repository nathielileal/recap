import { useLocalSearchParams, useRouter } from "expo-router";
import { CaretLeftIcon, PlusIcon, SwatchesIcon } from "phosphor-react-native";
import { useEffect, useMemo } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { CamLenseScreen } from "../../../components/CamLenseScreen/CamLenseScreen";
import { CardMovie } from "../../../components/Card/CardMovie/CardMovie";
import { Movie } from "../../../models/movie";
import { useThemeContext } from "../../../provider/ThemeProvider";
import { stylesheet } from "./MoviesList.styles";
import { useListsViewModel } from "../../../viewmodels/list.viewmodel";
import { MoviesListModal } from "../../../components/Modal/SearchMovie/MoviesListModal";

export default function MoviesListPage() {
    const router = useRouter();
    const { listId, name } = useLocalSearchParams();
    const { toggleTheme, theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);
    const { isModalOpen, setIsModalOpen, error, movies, loadMovies, loadingMovies } = useListsViewModel();

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <CardMovie data={item} onPress={() => router.push({ pathname: "/movie-detail", params: { id: item.tmdbId } })} />
    );

    const handleCloseModal = () => {
        setIsModalOpen(false);
        loadMovies(Number(listId ?? 0));
    };

    useEffect(() => {
        loadMovies(Number(listId ?? 0));
    }, []);

    return (
        <CamLenseScreen title="" paddingVertical={1} paddingHorizontal={1} header={
            <View style={styles.header}>
                <View style={styles.headerItemLeft}>
                    <TouchableOpacity onPress={() => router.back()} style={{ zIndex: 10 }}>
                        <CaretLeftIcon color={theme.terciary} size={25} weight="thin" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerTitle}>{name ?? ''}</Text>

                <View style={styles.headerItemRight}>
                    <TouchableOpacity onPress={toggleTheme}>
                        <SwatchesIcon color={theme.terciary} size={25} weight="thin" />
                    </TouchableOpacity>
                </View>
            </View>
        }>
            {loadingMovies ?
                <ActivityIndicator size={50} color={theme.terciary} style={{ marginVertical: 20 }} />
                : error ? (
                    <Text style={[styles.empty, { color: theme.secondary, textAlign: "center", fontSize: 16 }]}>
                        {error}
                    </Text>
                ) : movies.length > 0 ?
                    <View style={styles.list}>
                        <FlatList
                            key="list"
                            data={movies}
                            numColumns={3}
                            renderItem={renderMovieItem}
                            keyExtractor={(item) => String(item.tmdbId)}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingLeft: 55, paddingBottom: 100, alignItems: "flex-start", justifyContent: "space-between" }}
                        />
                    </View>
                    : <Text style={styles.empty}>Nenhum filme encontrado na lista.</Text>
            }

            <TouchableOpacity style={[styles.btn, { position: "absolute", bottom: 15, right: 15, zIndex: 10 }]} onPress={() => setIsModalOpen(true)}>
                <PlusIcon size={30} color={theme.terciary}></PlusIcon>
            </TouchableOpacity>

            {isModalOpen && (<MoviesListModal onClose={handleCloseModal} listId={Number(listId ?? 0)} />)}
        </CamLenseScreen>
    );
}