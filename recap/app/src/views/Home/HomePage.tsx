import { useRouter } from "expo-router";
import { MagnifyingGlassIcon } from "phosphor-react-native";
import { ActivityIndicator, FlatList, Text, TextInput, View } from "react-native";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";
import { CardMovie } from "../../components/CardMovie/CardMovie";
import { Movie } from "../../models/movie";
import { Category, useHomeViewModel } from "../../viewmodels/home.viewmodel";
import { styles } from "./Home.styles";

export default function HomePage() {
    const router = useRouter();

    const { categories, searchMovies, loading, empty, search, onSearchChange } = useHomeViewModel();

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <CardMovie data={item} onPress={() => router.push({ pathname: "/src/views/Details/DetailsPage", params: { id: item.id } })} />
    );

    const items = ({ item }: { item: Category }) => (
        <View key={item.id}>
            <Text style={styles.categoryTitle}>{item.title}</Text>

            <FlatList
                data={item.data.slice(0, 30)}
                horizontal
                renderItem={renderMovieItem}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );

    return (
        <CamLenseScreen title="Filmes">
            <View style={styles.header}>
                <View style={styles.input}>
                    <TextInput placeholder="Buscar" placeholderTextColor="#ffffff" style={styles.textInput} value={search} onChangeText={onSearchChange} />
                    <MagnifyingGlassIcon color="#ffffff" size={25} weight="light"></MagnifyingGlassIcon>
                </View>

                {empty && (<Text style={styles.empty}>Nenhum filme encontrado para "{search}"</Text>)}
            </View>
            <View style={styles.list}>
                {search.length <= 2 ? (
                    <FlatList
                        data={categories}
                        renderItem={items}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: 30, paddingRight: 30, paddingBottom: 100 }}
                        ListFooterComponent={loading ? <ActivityIndicator size={50} color="#ffffff" /> : null}
                    />
                ) : (
                    <FlatList
                        key="search-list"
                        data={searchMovies}
                        numColumns={3}
                        renderItem={renderMovieItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ padding: 35, paddingBottom: 100, alignItems: "center", justifyContent: "space-between" }}
                    />
                )}
            </View>
        </CamLenseScreen>
    );
}