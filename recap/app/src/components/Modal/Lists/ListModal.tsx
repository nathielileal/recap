import { MinusCircleIcon, MinusIcon, PlusCircleIcon, PlusIcon, XIcon } from "phosphor-react-native";
import React, { useCallback, useEffect, useMemo } from "react";
import { Alert, FlatList, Keyboard, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useThemeContext } from "../../../provider/ThemeProvider";
import { useListsViewModel } from "../../../viewmodels/list.viewmodel";
import { stylesheet } from "./ListModal.styles";
import { ListCard } from "../../Card/ListCard";
import { List } from "../../../models/list";
import { useFocusEffect } from "expo-router";

interface Props {
    tmdbId: number,
    onClosed: () => void,
}

export function ListModal({ tmdbId, onClosed }: Props) {
    const { lists, load, addMovieToList, deleteMovieFromList } = useListsViewModel();
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);

    useFocusEffect(
        useCallback(() => {
            load("");
        }, [load])
    );

    const handleAddMovie = async (listId: number) => {
        const result = await addMovieToList(listId, tmdbId);

        if (result.success) {
            Alert.alert("Filme adiciona à lista com sucesso!");
            load('');
        } else {
            const message = result.error || "Ocorreu um erro inesperado ao tentar adicionar o filme à lista.";
            Alert.alert("Falha ao adicionar filme", message);
        }
    }

    const handleDeleteMovie = async (listId: number) => {
        const result = await deleteMovieFromList(listId, tmdbId);

        if (result.success) {
            Alert.alert("Filme excluído da lista com sucesso!");
            load('');
        } else {
            const message = result.error || "Ocorreu um erro ao excluir o filme da lista. Tente novamente mais tarde!";
            Alert.alert("Falha ao excluir filme", message);
        }
    }

    const renderItem = ({ item }: { item: List }) => {
        const isInList = item.movies.some(movie => movie.tmdbId === tmdbId);

        const handlePress = isInList
            ? () => handleDeleteMovie(item.id)
            : () => handleAddMovie(item.id);

        const Icon = isInList ? MinusCircleIcon : PlusCircleIcon;
        const color = isInList ? theme.secondary : theme.terciary;

        return (
            <ListCard data={item} showInfo={false} imageSize={15} imageArea={50} children={<View>
                <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={handlePress}>
                    <Icon size={20} color={color} />
                </TouchableOpacity>
            </View>} />
        );
    };

    return (
        <Modal visible transparent animationType="slide">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.modal}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Adicionar à lista</Text>

                            <TouchableOpacity onPress={() => onClosed()}>
                                <XIcon color={theme.secondary} size={25} weight="thin"></XIcon>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            key="lists"
                            data={lists}
                            numColumns={1}
                            renderItem={renderItem}
                            style={{ marginTop: 15 }}
                            keyExtractor={(item) => String(item.id)}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};