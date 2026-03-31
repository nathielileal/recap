import { BellSimpleRingingIcon, CircleIcon, SwatchesIcon } from 'phosphor-react-native';
import React, { useMemo } from 'react';
import { Keyboard, SafeAreaView, StatusBar, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useAuthContext } from '../../context/AuthContext';
import { useThemeContext } from '../../provider/ThemeProvider';
import { SessionExpiredScreen } from '../SessionExpired/SessionExpiredScreen';
import { stylesheet } from './CamLenseScreen.styles';
import { router } from 'expo-router';
import { NotificationIcon } from '../Notification/NotificationIcon';

interface Props {
    title?: string,
    header?: React.ReactNode;
    children: React.ReactNode;
    paddingVertical?: number;
    paddingHorizontal?: number;
}

export function CamLenseScreen({ title, header, children, paddingVertical, paddingHorizontal }: Props) {
    const { toggleTheme, theme, currentThemeKey } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);
    const { sessionExpired } = useAuthContext();

    const genericHeader = (
        <View style={styles.header}>
            <View style={styles.headerItemLeft}>
                <View style={styles.logo}>
                    <CircleIcon color={theme.secondary} size={18} weight="fill" style={styles.icon} />
                    <Text style={styles.text}>RECAP</Text>
                </View>
            </View>

            <Text style={styles.title}>{title}</Text>

            <View style={styles.headerItemRight}>
                <View style={styles.functions}>
                    {/* <TouchableOpacity onPress={() => router.push({ pathname: "/(protected)/(app)/notification" })}>
                        <BellSimpleRingingIcon color={theme.terciary} size={25} weight="light" />
                    </TouchableOpacity> */}
                    <NotificationIcon/>

                    <TouchableOpacity onPress={toggleTheme}>
                        <SwatchesIcon color={theme.terciary} size={25} weight="light" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
                {/* status bar do sistema operacional */}
                <StatusBar barStyle={currentThemeKey === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={currentThemeKey === 'dark' ? theme.primary : 'white'}/>

                {header || genericHeader}

                <View style={[styles.container, { paddingVertical: paddingVertical ?? 18, paddingHorizontal: paddingHorizontal ?? 20 }]}>
                    {sessionExpired ? <SessionExpiredScreen /> : children}
                </View>
        </SafeAreaView>
    );
};