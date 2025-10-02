import { BlurView } from 'expo-blur';
import { ChatCircleIcon, HeartIcon, UserCircleIcon, WarningIcon } from "phosphor-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../../constants/colors";
import { getTimeAgo } from "../../../../lib/utils";
import { Review } from "../../models/review";
import { StarRating } from "../StarRating/StarRating";
import { styles } from "./CardReview.styles";

interface Props {
    data: Review;
}

const stars = Array.from({ length: 5 });
const max_char = 220;

export function CardReview({ data }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [blur, setBlur] = useState(data.spoiler);

    const handleExpansion = () => {
        setIsExpanded(prev => !prev);
    };

    const handleSpoiler = () => {
        setBlur(false);
        setIsExpanded(true);
    };

    const truncatedText = data.description.length > max_char ? data.description.substring(0, max_char).trim() + "..." : data.description;

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <UserCircleIcon color={COLORS.terciary} size={30} weight="light" />

                <View style={styles.info}>
                    <View style={styles.infoUser}>
                        <Text style={styles.title}>{data.user}</Text>
                        <Text style={styles.time}>{getTimeAgo(data.date)}</Text>
                    </View>

                    <View style={styles.stars}>
                        {stars.map((_, index) => (<StarRating key={index + 1} index={index + 1} rate={data.rate}></StarRating>))}
                    </View>
                </View>
            </View>

            <View>
                <Text style={styles.description}>
                    {isExpanded ? data.description : truncatedText}
                    {data.description.length > max_char && (<Text onPress={handleExpansion} style={styles.more}>{isExpanded ? " Mostrar menos" : " Mostrar mais"}</Text>)}
                </Text>

                {blur && (
                    <BlurView intensity={30} tint="dark" style={styles.blur} >
                        <TouchableOpacity onPress={handleSpoiler} style={styles.btn}>
                            <WarningIcon color={COLORS.secondary} size={10} />
                            <Text style={styles.spoiler}>SPOILER!</Text>
                        </TouchableOpacity>
                    </BlurView>
                )}
            </View>

            <View style={styles.options}>
                <View>
                    <TouchableOpacity style={styles.option}>
                        <HeartIcon color={COLORS.secondary} size={10} />
                        <Text style={styles.icon}>{data.likes}</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={styles.option}>
                        <ChatCircleIcon color={COLORS.orange} size={10} />
                        <Text style={styles.icon}>{data.comments}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}