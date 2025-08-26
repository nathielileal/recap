import { Image, Pressable } from "react-native";
import { styles } from "./card-movie-style";

interface Movie {
    id: number,
    poster_path: string;
}

interface Props {
    data: Movie,
    onPress?: () => void,
}

export function CardMovie({ data, ...rest }: Props) {
    return (
        <Pressable {...rest} style={styles.cardMovie}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`, }} style={styles.cardImage} ></Image>
        </Pressable>
    );
}