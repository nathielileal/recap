import React, { useMemo } from "react";
import { useRecommendationViewModel } from "../../../viewmodels/recommendation.vielmodel";
import { useThemeContext } from "../../../provider/ThemeProvider";
import { stylesheet } from "../Recommendation.style";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { FilmReelIcon, VinylRecordIcon } from "phosphor-react-native";
import { Movie } from "../../../models/movie";
import { CardMovie } from "../../../components/Card/CardMovie/CardMovie";
import { router } from "expo-router";

export default function TextRecommendationPage() {
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

        <Text style={styles.about}>Descreva o tipo de filme que você quer assistir e a IA vai sugerir títulos.</Text>

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
        ListEmptyComponent={() => {
          if (loading) return null;

          if (rec.length > 0) {
            return (
              <Text style={[styles.about, { textAlign: 'center', marginTop: 20 }]}>A IA gerou a recomendação, mas a lista de filmes está vazia. Tente novamente.</Text>
            );
          }

          return (
            <Text style={[styles.about, { textAlign: 'center', marginTop: 20 }]}>Não há recomendações disponíveis. Clique em Gerar para começar.</Text>
          );
        }}
      />
    </View>
  );
};

