import { MagnifyingGlassIcon } from "phosphor-react-native";
import { ActivityIndicator, FlatList, Text, TextInput, View } from "react-native";
<<<<<<<< HEAD:recap/app/src/views/pages/home-page.tsx
import { styles } from "../../styles/home-style";
import { CardMovie } from "../../components/CardMovie/card-movie-component";
import { useHomeViewModel } from "../../viewmodels/use-home-view-model";
========
import { CardMovie } from "../../components/CardMovie/card-movie-component";
import { useHomeViewModel } from "../../viewmodels/useHomeViewModel";
import { styles } from "./home-style";
>>>>>>>> 9c56f8a8a182fa59536a8a49244f6bdf032b422e:recap/app/src/views/Home/homePage.tsx

export default function HomePage() {
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