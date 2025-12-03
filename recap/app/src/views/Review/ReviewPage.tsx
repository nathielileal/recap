import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { CamLenseScreen } from '../../components/CamLenseScreen/CamLenseScreen';
import { useThemeContext } from '../../provider/ThemeProvider';
import { stylesheet } from './Review.styles';
import { router, useFocusEffect } from 'expo-router';
import { CaretLeftIcon, SwatchesIcon } from 'phosphor-react-native';
import { CardReview } from '../../components/Card/CardReview/CardReview';
import { Rating } from '../../models/rating';
import { useReviewViewModel } from '../../viewmodels/review.viewmodel';

export default function ReviewPage() {
    const { toggleTheme, theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);
    const { review, loading, empty, load, handleModal } = useReviewViewModel(0);

    useFocusEffect(
        useCallback(() => {
            load();
        }, [load])
    );

    const showReviews = ({ item }: { item: Rating }) => {
        return (<CardReview data={item} username={item.username ?? 'usuário'} onClosed={handleModal} hasMovieName={true}></CardReview>);
    }

    return (
        <CamLenseScreen title='' paddingVertical={1} paddingHorizontal={1} header={
            <View style={styles.header}>
                <View style={styles.headerItemLeft}>
                    <TouchableOpacity onPress={() => router.back()} style={{ zIndex: 10 }}>
                        <CaretLeftIcon color={theme.terciary} size={25} weight="thin" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerTitle}>Minhas avaliações</Text>

                <View style={styles.headerItemRight}>
                    <TouchableOpacity onPress={toggleTheme}>
                        <SwatchesIcon color={theme.terciary} size={25} weight="thin" />
                    </TouchableOpacity>
                </View>
            </View>
        }>
            <View>
                {empty && (<Text style={styles.empty}>Você ainda não avaliou nenhum filme.</Text>)}

                {loading && review.length === 0 ? (
                    <ActivityIndicator size={50} color={theme.terciary} style={{ marginVertical: 20 }} />
                ) : review.length > 0 && (
                    <FlatList
                        data={review}
                        style={{ flex: 1, marginVertical: 10, marginHorizontal: 20 }}
                        renderItem={showReviews}
                        keyExtractor={(item) => String(item.id)}
                    />
                )}
            </View>
        </CamLenseScreen>
    );
}