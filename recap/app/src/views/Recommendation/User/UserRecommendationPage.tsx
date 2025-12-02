import React, { useMemo } from "react";
import { useRecommendationViewModel } from "../../../viewmodels/recommendation.vielmodel";
import { useThemeContext } from "../../../provider/ThemeProvider";
import { stylesheet } from "../Recommendation.style";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { FilmReelIcon, VinylRecordIcon } from "phosphor-react-native";
import { Movie } from "../../../models/movie";
import { CardMovie } from "../../../components/Card/CardMovie/CardMovie";
import { router } from "expo-router";

export default function UserRecommendationPage() {
  const { rec, load, loading, movie } = useRecommendationViewModel();
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  const renderMovie = ({ item }: { item: Movie }) => (
    <CardMovie data={item} onPress={() => router.push({ pathname: "/movie-detail", params: { id: item.tmdbId } })} />
  );

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

      {rec.length > 0 && (
        <View style={styles.divider}></View>
      )}
    </>
  );

  return (
    <View style={[styles.container, { flex: 1, width: '100%' }]}>
      {loading && movie.length > 0 && (
        <ActivityIndicator size="large" color={theme.secondary} style={{ marginVertical: 20 }} />
      )}

      <FlatList
        data={movie}
        renderItem={renderMovie}
        numColumns={3}
        keyExtractor={(item, index) => `${item.tmdbId}-${index}`}
        contentContainerStyle={{ padding: 2 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={header}
        ListEmptyComponent={() => (<Text style={[styles.about, { textAlign: 'center', marginTop: 20 }]}>Clique em "Gerar Recomendações" para descobrir novos filmes.</Text>)}
      />
    </View>
  );
};

