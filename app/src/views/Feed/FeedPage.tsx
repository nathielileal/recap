import { useEffect, useMemo } from "react";
import { Text, View } from "react-native";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";
import { useThemeContext } from "../../provider/ThemeProvider";
import { stylesheet } from "./Feed.styles";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native";
import { CardReview } from "../../components/Card/CardReview/CardReview";
import { Rating } from "../../models/rating";
import { useFeedViewModel } from "../../viewmodels/feed.vielmodel";

export default function FeedPage() {
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);
    const { review, empty, loading, error, load } = useFeedViewModel();

    useEffect(() => {
        load();
    }, [load]);

    const showReviews = ({ item }: { item: Rating }) => {
        return (<CardReview data={item} username={item.username ?? 'usuário'} onClosed={() => null} hasMovieName={true}></CardReview>);
    }

    return (
        <CamLenseScreen title="Feed">
            <View style={{ flex: 1 }}> 
                {error && (<Text style={styles.empty}>Erro ao carregar: {error}</Text>)}
                
                {empty && !loading && !error && (<Text style={styles.empty}>Nenhuma movimentação dos seus amigos.</Text>)}

                {loading && review.length === 0 && ( 
                    <ActivityIndicator size={50} color={theme.terciary} style={{ marginVertical: 20 }} />
                )}
                
                {review.length > 0 && (
                    <FlatList
                        data={review}
                        onRefresh={load}
                        refreshing={loading} 
                        style={{ flex: 1, marginVertical: 10, marginHorizontal: 20 }}
                        renderItem={showReviews}
                        keyExtractor={(item) => String(item.id)}
                    />
                )}
            </View>
        </CamLenseScreen>
    );
}