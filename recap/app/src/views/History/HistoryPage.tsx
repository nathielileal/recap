import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { CamLenseScreen } from '../../components/CamLenseScreen/CamLenseScreen';
import { useThemeContext } from '../../provider/ThemeProvider';
import { stylesheet } from './History.styles';
import { CaretLeftIcon, SwatchesIcon } from 'phosphor-react-native';
import { router, useFocusEffect } from 'expo-router';
import { useRecommendationViewModel } from '../../viewmodels/recommendation.vielmodel';
import { CardRec } from '../../components/Card/CardRec/CardRec';
import { RecommendationType } from '../../models/recommendation';

export default function HistoryPage() {
    const { toggleTheme, theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);
    const { rec, movie, get, loading, rate } = useRecommendationViewModel();

    useFocusEffect(
        useCallback(() => {
            get();
        }, [get])
    );

    const showRec = ({ item }: { item: RecommendationType }) => {
        return (<CardRec data={item} movies={movie} rate={rate}></CardRec>);
    }

    return (
        <CamLenseScreen title='' paddingVertical={1} paddingHorizontal={1} header={
            <View style={styles.header}>
                <View style={styles.headerItemLeft}>
                    <TouchableOpacity onPress={() => router.back()} style={{ zIndex: 10 }}>
                        <CaretLeftIcon color={theme.terciary} size={25} weight="thin" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerTitle}>Histórico de recomendações</Text>

                <View style={styles.headerItemRight}>
                    <TouchableOpacity onPress={toggleTheme}>
                        <SwatchesIcon color={theme.terciary} size={25} weight="thin" />
                    </TouchableOpacity>
                </View>
            </View>
        }>
            <View>
                {rec.length === 0 && !loading && (<Text style={styles.empty}>Você ainda não pediu nenhuma recomendação. Acesse a página de recomendações para descobrir novos filmes!</Text>)}

                {loading && rec.length === 0 ? (
                    <ActivityIndicator size={50} color={theme.terciary} style={{ marginVertical: 20 }} />
                ) : rec.length > 0 && (
                    <FlatList
                        data={rec}
                        style={{ flex: 1, marginVertical: 10 }}
                        renderItem={showRec}
                        keyExtractor={(item) => String(item.id)}
                    />
                )}
            </View>
        </CamLenseScreen>
    );
}