import { useMemo } from 'react';
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { getTimeAgo } from '../../../../../lib/utils';
import { useThemeContext } from '../../../provider/ThemeProvider';
import { TrashIcon } from 'phosphor-react-native';
import { stylesheet } from './CardNotification.styles';
import { Notification } from '../../../models/notification';
import { router } from 'expo-router';

interface Props {
    notificaton: Notification;
    onPress: (notificationId: string) => Promise<any>;
    onDelete: (id: string) => Promise<any>;
}

export function CardNotification({ notificaton, onPress, onDelete }: Props) {
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme, notificaton.read), [theme]);

    const content = notificaton.data;

    const handlePress = async () => {
        const sucess = await onPress(notificaton.id);

        if (sucess) {
            router.push({ pathname: "/(protected)/(app)/profile", params: { id: content.followerId } });
        }
    }
    
    const handleDelete = async () => {
        await onDelete(notificaton.id);
    }

    return (
        <View style={styles.card}>
            <View style={styles.options}>
                <Text style={styles.title}>{content.message}</Text>

                <TouchableOpacity onPress={handleDelete}>
                    <TrashIcon size={18} color={theme.terciary} weight={'light'} style={{ flex: 1, marginTop: 5 }}></TrashIcon>
                </TouchableOpacity>
            </View>

            <Text style={styles.time}>{getTimeAgo(content.timestamp ?? '')}</Text>

            <TouchableOpacity onPress={handlePress}>
                <Text style={styles.option}>Ver perfil</Text>
            </TouchableOpacity>
        </View>
    );
}