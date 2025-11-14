import { useRouter } from "expo-router";
import { CaretLeftIcon, SwatchesIcon } from "phosphor-react-native";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../../constants/colors";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";
import { CardMovie } from "../../components/CardMovie/CardMovie";
import { Movie } from "../../models/movie";
import { useCatalogViewModel } from "../../viewmodels/catalog.viewmodel";
import { styles } from "./Catalog.styles";

export default function CatalogPage() {
    const router = useRouter();

    const { movies, loading } = useCatalogViewModel();

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <CardMovie data={item} onPress={() => router.push({ pathname: "/src/views/MovieDetails/MovieDetailsPage", params: { id: item.tmdbId } })} />
    );

    return (
        <CamLenseScreen title="" paddingVertical={1} paddingHorizontal={1} header={
            <View style={styles.header}>
                <View style={styles.headerItemLeft}>
                    <TouchableOpacity onPress={() => router.back()} style={{ zIndex: 10 }}>
                        <CaretLeftIcon color={COLORS.terciary} size={25} weight="thin" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerTitle}>Catálogo pessoal</Text>

                <View style={styles.headerItemRight}>
                    <TouchableOpacity onPress={() => null}>
                        <SwatchesIcon color={COLORS.terciary} size={25} weight="thin" />
                    </TouchableOpacity>
                </View>
            </View>
        }>
            {loading ?
                <ActivityIndicator size={50} color={COLORS.terciary} style={{ marginVertical: 20 }} /> :
                movies.length > 0 ?
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
                    : <Text style={styles.empty}>Nenhum filme encontrado no seu catálogo pessoal.</Text>
            }

        </CamLenseScreen>
    );
}