import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CamLenseScreen } from '../../components/CamLenseScreen/CamLenseScreen';
import { useThemeContext } from '../../provider/ThemeProvider';
import { stylesheet } from './History.styles';
import { CaretLeftIcon, SwatchesIcon } from 'phosphor-react-native';
import { router } from 'expo-router';

export default function HistoryPage() {
    const { toggleTheme, theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);

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
                <Text style={styles.empty}>Você ainda não pediu nenhuma recomendação. Acesse a página de recomendações para descobrir novos filmes!</Text>
            </View>
        </CamLenseScreen>
    );
}