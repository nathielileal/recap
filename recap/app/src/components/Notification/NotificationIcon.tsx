import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BellSimpleRingingIcon } from 'phosphor-react-native';
import { useThemeContext } from '../../provider/ThemeProvider';
import { router } from 'expo-router';
import { useNotificationContext } from '../../provider/NotificationProvider';
import { stylesheet } from './NotificationIcon.styles';

export function NotificationIcon() {
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);
    const { unreadCount } = useNotificationContext();

    const displayCount = unreadCount > 99 ? '99+' : unreadCount;
    const hasUnread = unreadCount > 0;

    return (
        <TouchableOpacity onPress={() => router.push({ pathname: "/(protected)/(app)/notification" })}>
            <BellSimpleRingingIcon color={theme.terciary} size={25} weight="light" />
            
            {hasUnread && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{displayCount}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}