import { XIcon } from "phosphor-react-native";
import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../../../constants/colors";
import { StarRating } from "../../StarRating/StarRating";
import { styles } from "./ReviewModal.styles";

interface Props {
    movie: string,
    onClosed: () => void,
}

const stars = Array.from({ length: 5 });

export function ReviewModal({ movie, onClosed }: Props) {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (value: number) => {
        setRating(value);
    };

    return (
        <Modal visible transparent animationType="slide">
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Avaliar filme</Text>

                        <TouchableOpacity onPress={() => onClosed()}>
                            <XIcon color={COLORS.secondary} size={32} weight="thin" style={styles.closeBtn}></XIcon>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.stars}>
                        {stars.map((_, index) => (<StarRating size={20} key={index + 1} index={index + 1} rate={rating} readonly={false} onPress={handleRatingChange}></StarRating>))}
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.title}>DATA:</Text>

                        <TouchableOpacity style={styles.input}>
                            <TextInput />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}