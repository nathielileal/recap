import { useMemo } from "react";
import { Image, Pressable } from "react-native";
import { stylesheet } from "./CardMovie.styles";
import { useThemeContext } from "../../../provider/ThemeProvider";

interface Movie {
    tmdbId: number,
    poster_path: string;
}

interface Props {
    data: Movie,
    onPress?: () => void,
}

export function CardMovie({ data, ...rest }: Props) {
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);

    return (
        <Pressable {...rest} style={styles.cardMovie}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`, }} style={styles.cardImage} ></Image>
        </Pressable>
    );
}