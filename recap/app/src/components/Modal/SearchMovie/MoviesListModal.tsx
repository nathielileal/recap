import { XIcon } from "phosphor-react-native";
import React, { useMemo } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useThemeContext } from "../../../provider/ThemeProvider";
import { useListsViewModel } from "../../../viewmodels/list.viewmodel";
import { stylesheet } from "./MoviesListModal.styles";

interface Props {
    listId: number;
    onClose: () => void,
}

export function MoviesListModal({ listId, onClose }: Props) {
    const { addMovieToList } = useListsViewModel();
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);

    return (
        <Modal visible transparent animationType="slide">
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Adicionar filmes</Text>

                        <TouchableOpacity onPress={() => onClose()}>
                            <XIcon color={theme.secondary} size={25} weight="thin"></XIcon>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btnView}>
                        <TouchableOpacity style={styles.btn} onPress={() => null}>
                            <Text style={styles.btnText}>SALVAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};