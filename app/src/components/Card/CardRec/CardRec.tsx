import { useMemo } from 'react';
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { getTimeAgo } from '../../../../../lib/utils';
import { useThemeContext } from '../../../provider/ThemeProvider';
import { stylesheet } from "./CardRec.styles";
import { RecommendationType } from "../../../models/recommendation";
import { CardMovie } from "../CardMovie/CardMovie";
import { Movie } from "../../../models/movie";
import { router } from "expo-router";
import { ThumbsDownIcon, ThumbsUpIcon } from 'phosphor-react-native';

interface Props {
    data: RecommendationType;
    movies: Movie[];
    rate: (id: string, liked: boolean | null) => Promise<any>;
}

export function CardRec({ data, movies, rate }: Props) {
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);

    const movieIds = data.movies?.map(m => m.tmdbId).filter(id => id > 0);

    const movie = useMemo(() => {
        if (!movies || movies.length === 0) return [];

        return movies.filter(m => movieIds?.includes(m.tmdbId));
    }, [movies, movieIds]);

    const renderMovie = ({ item }: { item: Movie }) => (
        <CardMovie data={item} onPress={() => router.push({ pathname: "/(protected)/(app)/movie-detail", params: { id: item.tmdbId } })} width={60} height={80} />
    );

    const handleRate = async (liked: boolean | null) => {
        await rate(data.id ?? '', liked);
    }

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>{data.textPrompt}</Text>
                <Text style={styles.time}>{getTimeAgo(data.createdAt ?? '')}</Text>
            </View>

            <FlatList
                data={movie}
                renderItem={renderMovie}
                numColumns={5}
                keyExtractor={(item, index) => `${item.tmdbId}-${index}`}
                contentContainerStyle={{ padding: 2, alignItems: "center", justifyContent: "center" }}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.options}>
                <TouchableOpacity onPress={() => handleRate(data.liked === true ? null : true)}>
                    <ThumbsUpIcon size={20} color={theme.terciary} weight={data.liked === true ? 'fill' : 'light'} style={{ marginHorizontal: 5 }}></ThumbsUpIcon>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRate(data.liked === false ? null : false)}>
                    <ThumbsDownIcon size={20} color={theme.terciary} weight={data.liked === false ? 'fill' : 'light'} style={{ marginHorizontal: 5 }}></ThumbsDownIcon>
                </TouchableOpacity>
            </View>
        </View>
    );
}