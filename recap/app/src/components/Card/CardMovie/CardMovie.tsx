import { useMemo } from "react";
import { Image, Pressable, Text } from "react-native";
import { stylesheet } from "./CardMovie.styles";
import { useThemeContext } from "../../../provider/ThemeProvider";

interface Movie {
    tmdbId: number,
    title: string;
    poster_path: string;
}

interface Props {
    data: Movie,
    width?: number;
    height?: number;
    onPress?: () => void,
}

export function CardMovie({ data, width, height, ...rest }: Props) {
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);

    return (
        <Pressable {...rest} style={[styles.cardMovie, { width: width ?? 105, height: height ?? 150 }]}>
            {data.poster_path != null ? (
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`, }} style={styles.cardImage} ></Image>
            ) : (
                <Text style={{ color: theme.terciary, fontSize: 10, padding: 10 }}>{data.title}</Text>
            )}
        </Pressable>
    );
}