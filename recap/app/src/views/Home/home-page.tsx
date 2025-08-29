import { MagnifyingGlassIcon } from "phosphor-react-native";
import { ActivityIndicator, FlatList, Text, TextInput, View } from "react-native";
import { styles } from "./home-style";
import { CardMovie } from "../../components/CardMovie/card-movie-component";
import { useHomeViewModel } from "../../viewmodels/use-home-view-model";

export function HomePage() {
    const { movieData, loading, empty, search, load, onSearchChange } = useHomeViewModel();

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
                    renderItem={(item) => <CardMovie data={item.item} />}
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