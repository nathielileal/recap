import { Checkbox } from 'expo-checkbox';
import { XIcon } from "phosphor-react-native";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../../../constants/colors";
import { useReviewViewModel } from '../../../viewmodels/review.viewmodel';
import { StarRating } from "../../StarRating/StarRating";
import { styles } from "./ReviewModal.styles";

interface Props {
    id_movie: string;
    onClosed: () => void,
}

const stars = Array.from({ length: 5 });

export function ReviewModal({ id_movie, onClosed }: Props) {
    const { rating, setRating, title, setTitle, description, setDescription, isChecked, setChecked, saveReview, clearForm } = useReviewViewModel(id_movie);

    const handleRatingChange = (value: number) => {
        setRating(value);
    };

    const handleSave = async () => {
        const success = await saveReview();

        if (success) {
            clearForm();
            onClosed();

            alert("Avaliação salva com sucesso!");
        } else {
            alert("Erro ao salvar avaliação. Tente novamente.");
        }
    };

    return (
        <Modal visible transparent animationType="slide">
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Avaliar filme</Text>

                        <TouchableOpacity onPress={() => onClosed()}>
                            <XIcon color={COLORS.secondary} size={25} weight="thin" style={styles.closeBtn}></XIcon>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.stars}>
                        {stars.map((_, index) => (<StarRating size={20} key={index + 1} index={index + 1} rate={rating} readonly={false} onPress={handleRatingChange}></StarRating>))}
                    </View>

                    <View>
                        <Text style={styles.title}>TÍTULO:</Text>
                        <TextInput value={title} onChangeText={setTitle} style={styles.input} autoCapitalize="none" placeholder="Insira o título da sua avaliação" placeholderTextColor={COLORS.grey}></TextInput>

                        <Text style={styles.title}>DESCRIÇÃO:</Text>
                        <TextInput value={description} onChangeText={setDescription} style={styles.multiline} autoCapitalize="none" multiline={true} placeholder="Insira a descrição da sua avaliação" placeholderTextColor={COLORS.grey}></TextInput>

                        <View style={styles.form}>
                            <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked}></Checkbox>
                            <Text style={styles.inputText}>Contém spoiler</Text>
                        </View>
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
}