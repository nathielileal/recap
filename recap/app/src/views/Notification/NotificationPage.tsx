import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CamLenseScreen } from '../../components/CamLenseScreen/CamLenseScreen';
import { useThemeContext } from '../../provider/ThemeProvider';
import { stylesheet } from './Notification.style';
import { CaretLeftIcon, SwatchesIcon } from 'phosphor-react-native';
import { router } from 'expo-router';

export default function NotificationPage() {
    //   const { loading, filter, setFilter } = useProfileViewModel();
    const { toggleTheme, theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);

    return (
        <CamLenseScreen title="" paddingVertical={1} paddingHorizontal={1} header={
            <View style={styles.header}>
                <View style={styles.headerItemLeft}>
                    <TouchableOpacity onPress={() => router.back()} style={{ zIndex: 10 }}>
                        <CaretLeftIcon color={theme.terciary} size={25} weight="thin" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerTitle}>Notificações</Text>

                <View style={styles.headerItemRight}>
                    <TouchableOpacity onPress={toggleTheme}>
                        <SwatchesIcon color={theme.terciary} size={25} weight="thin" />
                    </TouchableOpacity>
                </View>
            </View>
        }>
            <View></View>
        </CamLenseScreen>
    );
}