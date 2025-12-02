import { useLocalSearchParams, useRouter } from "expo-router";
import { CaretLeftIcon, SwatchesIcon } from "phosphor-react-native";
import { useMemo } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";
import { CardMovie } from "../../components/Card/CardMovie/CardMovie";
import { Movie } from "../../models/movie";
import { useThemeContext } from "../../provider/ThemeProvider";
import { useCatalogViewModel } from "../../viewmodels/catalog.viewmodel";
import { stylesheet } from "./Catalog.styles";

export default function CatalogPage() {
    const { type } = useLocalSearchParams();
    const router = useRouter();
    const { toggleTheme, theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);
    const { movies, loading, error } = useCatalogViewModel(type);

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <CardMovie data={item} onPress={() => router.push({ pathname: "/movie-detail", params: { id: item.tmdbId } })} />
    );

    return (
        <CamLenseScreen title="" paddingVertical={1} paddingHorizontal={1} header={
            <View style={styles.header}>
                <View style={styles.headerItemLeft}>
                    <TouchableOpacity onPress={() => router.back()} style={{ zIndex: 10 }}>
                        <CaretLeftIcon color={theme.terciary} size={25} weight="thin" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerTitle}>{type}</Text>

                <View style={styles.headerItemRight}>
                    <TouchableOpacity onPress={toggleTheme}>
                        <SwatchesIcon color={theme.terciary} size={25} weight="thin" />
                    </TouchableOpacity>
                </View>
            </View>
        }>
            {loading ?
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
                            contentContainerStyle={{ alignItems: "center", justifyContent: "space-between" }}
                        />
                    </View>
                    : <Text style={styles.empty}>Nenhum filme encontrado no seu catálogo pessoal.</Text>
            }

        </CamLenseScreen>
    );
}