import { Text } from "@react-navigation/elements";
import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BookmarkSimpleIcon, CalendarBlankIcon, CaretLeftIcon, ClockIcon, StarIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { getYear } from "../../../../lib/utils";
import { Movie } from "../../models/movie";
import { api } from "../../services/movieService";
import { styles } from "./Details.styles";

export default function Details() {
    const router = useRouter();

    const [detail, setDetail] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(false);

    const route = useRoute();
    const { id } = useLocalSearchParams();

    useEffect(() => {
        const getDetail = async () => {
            try {
                setLoading(true);

                const response = await api.get(`/movie/${id}`);
                // console.log(JSON.stringify(response.data, null, 2));
                setDetail(response.data);

                setLoading(false);
            } catch (error) {
                console.log(error);

                setLoading(false);
            }
        };

        getDetail();
    }, [id]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <CaretLeftIcon color="#FFFFFF" size={32} weight="thin" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Detalhes</Text>

                <TouchableOpacity>
                    <BookmarkSimpleIcon color="#FFFFFF" size={32} weight="thin" />
                </TouchableOpacity>
            </View>

            <View>
                <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w500${detail?.backdrop_path}` }} />

                <Image style={styles.poster} source={{ uri: `https://image.tmdb.org/t/p/w500${detail?.poster_path}` }} />

                <Text style={styles.title}>{detail?.title}</Text>

                <View style={styles.description}>
                    <View style={styles.descriptionGroup}>
                        <CalendarBlankIcon color="#92929D" size={25} weight="thin" />

                        <Text style={styles.descriptionText}>{getYear(detail?.release_date ?? "")}</Text>
                    </View>

                    <View style={styles.descriptionGroup}>
                        <ClockIcon color="#92929D" size={25} weight="thin" />

                        <Text style={styles.descriptionText}>{`${detail?.runtime} minutos`}</Text>
                    </View>

                    <View style={styles.descriptionGroup}>
                        <StarIcon color={(detail?.vote_average ?? 0) >= 7 ? "#FF8700" : "#92929D"} size={25} weight={(detail?.vote_average ?? 0) >= 7 ? "duotone" : "thin"} />

                        <Text style={[(detail?.vote_average ?? 0) >= 7 ? styles.descriptionTextHighScore : styles.descriptionText]}>{detail?.vote_average.toFixed(1)}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.about}>
                <Text style={styles.aboutText}>Sinopse:</Text>
                <Text style={styles.aboutText}>{detail?.overview === "" ? "Ops! Parece que esse filme ainda não tem sinopse." : detail?.overview}</Text>
            </View>
        </View>
    );
}