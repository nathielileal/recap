import { CircleIcon, SwatchesIcon } from 'phosphor-react-native';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../constants/colors';
import { styles } from './CamLenseScreen.styles';

interface Props {
    title: string,
    children: React.ReactNode;
    onToggleTheme?: () => void;
}

export function CamLenseScreen({ title, children, onToggleTheme }: Props) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <View style={styles.headerItemLeft}>
                    <View style={styles.logo}>
                        <CircleIcon color={COLORS.secondary} size={18} weight="fill" style={styles.icon} />
                        <Text style={styles.text}>RECAP</Text>
                    </View>
                </View>

                <Text style={styles.title}>{title}</Text>

                <View style={styles.headerItemRight}>
                    <TouchableOpacity onPress={onToggleTheme || (() => { })}>
                        <SwatchesIcon color={COLORS.terciary} size={25} weight="light" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.container}>
                {children}
            </View>
        </SafeAreaView>
    );
};