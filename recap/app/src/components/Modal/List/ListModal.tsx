import { XIcon } from "phosphor-react-native";
import React, { useEffect, useMemo } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useThemeContext } from "../../../provider/ThemeProvider";
import { useListsViewModel } from "../../../viewmodels/list.viewmodel";
import { stylesheet } from "./ListModal.styles";

interface Props {
    listId: number;
    initialName: string;
    onClose: () => void,
}

const ListModal = ({ listId, initialName, onClose }: Props) => {
    const { name, setName, saveList, updateList } = useListsViewModel();
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);

    useEffect(() => {
        setName(initialName || ""); 

        return () => {
            setName("");
        };
    }, [initialName, setName]); 

    const handleSave = async () => {
        const success = listId > 0 ? await updateList(listId, name) : await saveList(name);;

        if (success) {
            onClose();

            alert("Lista salva com sucesso!");
        } else {
            alert("Erro ao salvar avaliação. Tente novamente mais tarde.");
        }
    };

    return (
        <Modal visible transparent animationType="slide">
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Criar lista</Text>

                        <TouchableOpacity onPress={() => onClose()}>
                            <XIcon color={theme.secondary} size={25} weight="thin"></XIcon>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.title}>NOME:</Text>
                        <TextInput value={name} onChangeText={setName} style={styles.input} autoCapitalize="none" placeholder="Digite o nome da lista" placeholderTextColor={theme.grey}></TextInput>
                    </View>

                    <View style={styles.btnView}>
                        <TouchableOpacity style={styles.btn} onPress={handleSave}>
                            <Text style={styles.btnText}>SALVAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ListModal;
