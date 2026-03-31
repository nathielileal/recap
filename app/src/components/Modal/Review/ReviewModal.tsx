import { XIcon } from "phosphor-react-native";
import { useMemo } from 'react';
import { Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useThemeContext } from '../../../provider/ThemeProvider';
import { useReviewViewModel } from '../../../viewmodels/review.viewmodel';
import { StarRating } from "../../StarRating/StarRating";
import { stylesheet } from "./ReviewModal.styles";

interface Props {
    ratingId?: number;
    tbmdId: number;
    onClosed: () => void,
    initialScore?: number;
    initialReview?: string;
}

const stars = Array.from({ length: 5 });

export function ReviewModal({ ratingId, tbmdId, onClosed, initialScore, initialReview }: Props) {
    const { rate, setRate, description, setDescription, clearForm, saveRating, updateRating } = useReviewViewModel(tbmdId, initialScore, initialReview);
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);

    const handleRatingChange = (value: number) => {
        setRate(value);
    };

    const handleSave = async () => {
        const isPost = (ratingId ?? 0) === 0;
        let success;

        if (isPost) {
            success = await saveRating();
        } else {
            success = await updateRating(ratingId ?? 0);
        }

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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={styles.modal}>
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>Avaliar filme</Text>

                                <TouchableOpacity onPress={() => onClosed()}>
                                    <XIcon color={theme.secondary} size={25} weight="thin" style={styles.closeBtn}></XIcon>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.stars}>
                                {stars.map((_, index) => (<StarRating size={20} key={index + 1} index={index + 1} rate={rate} readonly={false} onPress={handleRatingChange}></StarRating>))}
                            </View>

                            <View>
                                <Text style={styles.title}>DESCRIÇÃO:</Text>
                                <TextInput value={description} onChangeText={setDescription} style={styles.multiline} autoCapitalize="none" multiline={true} placeholder="Insira a descrição da sua avaliação" placeholderTextColor={theme.grey}></TextInput>
                            </View>

                            <View style={styles.btnView}>
                                <TouchableOpacity style={styles.btn} onPress={handleSave}>
                                    <Text style={styles.btnText}>SALVAR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}