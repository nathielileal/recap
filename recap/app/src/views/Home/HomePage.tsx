import { useRouter } from "expo-router";
import { MagnifyingGlassIcon } from "phosphor-react-native";
import { ActivityIndicator, FlatList, Text, TextInput, View } from "react-native";
import { CardMovie } from "../../components/CardMovie/CardMovie";
import { Movie } from "../../models/movie";
import { useHomeViewModel } from "../../viewmodels/useHomeViewModel";
import { styles } from "./Home.styles";

export default function HomePage() {
    const router = useRouter();

    const { movieData, loading, empty, search, load, onSearchChange } = useHomeViewModel();

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <CardMovie data={item} onPress={() => router.push({ pathname: "/src/views/Details/DetailsPage", params: { id: item.id } })} />
    )

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Filmes</Text>

                <View style={styles.input}>
                    <TextInput placeholder="Buscar" placeholderTextColor="#ffffff" style={styles.textInput} value={search} onChangeText={onSearchChange} />
                    <MagnifyingGlassIcon color="#ffffff" size={25} weight="light"></MagnifyingGlassIcon>
                </View>

                {empty && (<Text style={styles.empty}>Nenhum filme encontrado para "{search}"</Text>)}
            </View>
            <View style={styles.list}>
                <FlatList
                    data={movieData}
                    numColumns={3}
                    renderItem={renderMovieItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 35, paddingBottom: 100 }}
                    onEndReached={() => load()}
                    onEndReachedThreshold={0.5}
                />

                {loading && <ActivityIndicator size={50} color="#ffffff" />}
            </View>
        </View>
    );
}