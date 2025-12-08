import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { CamLenseScreen } from '../../components/CamLenseScreen/CamLenseScreen';
import { useThemeContext } from '../../provider/ThemeProvider';
import { stylesheet } from './Notification.style';
import { CaretLeftIcon, SwatchesIcon } from 'phosphor-react-native';
import { router, useFocusEffect } from 'expo-router';
import { useNotificationViewModel } from '../../viewmodels/notification.viewmodel';
import { Notification } from '../../models/notification';
import { CardNotification } from '../../components/Card/CardNotification/CardNotification';
import { useNotificationContext } from '../../provider/NotificationProvider';

export default function NotificationPage() {
    const { toggleTheme, theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);
    const { refreshCount } = useNotificationContext();
    const { notif, get, loading, markRead, deleteNotif } = useNotificationViewModel();

    useFocusEffect(
        useCallback(() => {
            get();
        }, [get])
    );

    const handleAction = async (action: 'markRead' | 'delete', id: string) => {
        let success = false;

        try {
            if (action === 'markRead') {
                await markRead(id);
            } else if (action === 'delete') {
                await deleteNotif(id);
                Alert.alert("Sucesso", "Notificação excuída com sucesso!");
            }
            
            success = true;
        } catch (error) {
            console.error(`Erro ao realizar ação ${action}:`, error);
        }

        if (success) {
            await get();
            await refreshCount();
        }
    };

    const showNotif = ({ item }: { item: Notification }) => {
        return (<CardNotification notificaton={item} onPress={() => handleAction('markRead', item.id)} onDelete={() => handleAction('delete', item.id)}></CardNotification>);
    }

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
            <View style={styles.container}>
                {notif.length === 0 && !loading && (<Text style={styles.empty}>Você ainda não pediu nenhuma recomendação. Acesse a página de recomendações para descobrir novos filmes!</Text>)}

                {loading && notif.length === 0 ? (
                    <ActivityIndicator size={50} color={theme.terciary} style={{ marginVertical: 20 }} />
                ) : notif.length > 0 && (
                    <FlatList
                        data={notif}
                        style={{ flex: 1, marginVertical: 10 }}
                        renderItem={showNotif}
                        keyExtractor={(item) => String(item.id)}
                    />
                )}
            </View>
        </CamLenseScreen>
    );
}