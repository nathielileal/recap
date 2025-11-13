import { Image, Pressable } from "react-native";
import { styles } from "./CardMovie.styles";

interface Movie {
    tmdbId: string,
    posterPath: string;
}

interface Props {
    data: Movie,
    onPress?: () => void,
}

export function CardMovie({ data, ...rest }: Props) {
    return (
        <Pressable {...rest} style={styles.cardMovie}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${data.posterPath}`, }} style={styles.cardImage} ></Image>
        </Pressable>
    );
}