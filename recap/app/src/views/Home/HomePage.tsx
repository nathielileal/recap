import { useRouter } from "expo-router";
import { MagnifyingGlassIcon } from "phosphor-react-native";
import { useMemo } from "react";
import { ActivityIndicator, FlatList, Text, TextInput, View } from "react-native";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";
import { CardMovie } from "../../components/Card/CardMovie/CardMovie";
import { Movie } from "../../models/movie";
import { useThemeContext } from "../../provider/ThemeProvider";
import { useHomeViewModel } from "../../viewmodels/home.viewmodel";
import { stylesheet } from "./Home.styles";

export default function HomePage() {
    const router = useRouter();
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);
    const { movies, loading, empty, search, setSearch, loadMore, error } = useHomeViewModel();

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <CardMovie data={item} onPress={() => router.push({ pathname: "/movie-detail", params: { id: item.tmdbId } })} />
    );

    return (
        <CamLenseScreen title="Filmes">
            <View style={styles.header}>
                <View style={styles.input}>
                    <TextInput placeholder="Buscar" placeholderTextColor={theme.terciary} style={styles.textInput} value={search} onChangeText={setSearch} autoCapitalize="none" />
                    <MagnifyingGlassIcon color={theme.terciary} size={25} weight="light"></MagnifyingGlassIcon>
                </View>

                {empty && (<Text style={styles.empty}>Nenhum filme encontrado para "{search}"</Text>)}
            </View>

            <View style={styles.list}>
                {loading ? (
                    <ActivityIndicator size={50} color={theme.terciary} style={{ marginVertical: 20 }} />
                ) : error ? (
                    <Text style={[styles.empty, { color: theme.secondary, textAlign: "center", fontSize: 16 }]}>
                        {error}
                    </Text>
                ) : (
                    <FlatList
                        key="list"
                        data={movies}
                        numColumns={3}
                        renderItem={renderMovieItem}
                        keyExtractor={(item) => String(item.tmdbId)}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ alignItems: "center", justifyContent: "space-between" }}
                        ListFooterComponent={loading && movies.length > 0 ? <ActivityIndicator size={50} color={theme.terciary} style={{ marginVertical: 20 }} /> : null}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.5}
                    />
                )}
            </View>
        </CamLenseScreen>
    );
}