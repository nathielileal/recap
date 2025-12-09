import React, { useMemo } from "react";
import { useRecommendationViewModel } from "../../../viewmodels/recommendation.vielmodel";
import { useThemeContext } from "../../../provider/ThemeProvider";
import { stylesheet } from "../Recommendation.style";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { FilmReelIcon, ThumbsDownIcon, ThumbsUpIcon, VinylRecordIcon } from "phosphor-react-native";
import { Movie } from "../../../models/movie";
import { CardMovie } from "../../../components/Card/CardMovie/CardMovie";
import { router } from "expo-router";

export default function UserRecommendationPage() {
  const { rec, movie, load, loading, hasRecommendations, rate, like } = useRecommendationViewModel();
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  const renderMovie = ({ item }: { item: Movie }) => (
    <CardMovie data={item} onPress={() => router.push({ pathname: "/(protected)/(app)/movie-detail", params: { id: item.tmdbId } })} />
  );

  const handleRate = async (liked: boolean | null) => {
    await rate(rec?.id ?? '', liked);
  }

  const header = (
    <>
      <View style={styles.context}>
        <FilmReelIcon size={40} color={theme.secondary} />

        <Text style={styles.title}>Recomendações personalizadas</Text>

        <Text style={styles.about}>Nossa IA analisa os filmes que você avaliou e curtiu para sugerir novos títulos que combinam com seus gostos.</Text>

        <TouchableOpacity style={styles.btn} onPress={() => load()}>
          <VinylRecordIcon size={20} color={theme.terciary} />
          <Text style={styles.btnText}>Gerar Recomendações</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const footer = () => {
    return (
      <View>
        {movie.length > 0 && !loading && (
          <View style={styles.footer}>
            <Text style={styles.review}>Essa avaliação foi útil?</Text>

            <View style={styles.options}>
              <TouchableOpacity onPress={() => handleRate(like === true ? null : true)}>
                <ThumbsUpIcon size={20} color={theme.terciary} weight={like != null && like === true ? 'fill' : 'light'} style={{ marginHorizontal: 10 }}></ThumbsUpIcon>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRate(like === false ? null : false)}>
                <ThumbsDownIcon size={20} color={theme.terciary} weight={like != null && like === false ? 'fill' : 'light'} style={{ marginHorizontal: 10 }}></ThumbsDownIcon>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  const empty = () => {
    if (loading && movie.length === 0) {
      return (<ActivityIndicator size="large" color={theme.secondary} style={{ marginTop: 50 }} />);
    }

    let message = 'Clique em "Gerar Recomendações" para descobrir novos filmes.';

    if (!hasRecommendations && !loading) {
      message = 'Nenhuma recomendação gerada. Avalie alguns filmes para receber sugestões personalizadas.';
    }

    return (
      <Text style={[hasRecommendations ? styles.about : styles.empty, { marginTop: 20 }]}>{message}</Text>
    );
  };

  return (
    <View style={[styles.container, { flex: 1, width: '100%' }]}>
      <FlatList
        data={movie}
        renderItem={renderMovie}
        numColumns={3}
        keyExtractor={(item, index) => `${item.tmdbId}-${index}`}
        contentContainerStyle={{ padding: 2, alignItems: "center", justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={header}
        ListHeaderComponentStyle={{ width: '100%', marginBottom: 10 }}
        ListEmptyComponent={empty}
      // ListFooterComponent={footer}
      // ListFooterComponentStyle={{ width: '100%', marginVertical: 30, justifyContent: "flex-end", alignItems: "flex-end" }}
      />
    </View>
  );
};

