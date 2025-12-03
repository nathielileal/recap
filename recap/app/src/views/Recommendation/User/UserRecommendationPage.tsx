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
  const { rec, load, loading, movie, hasRecommendations } = useRecommendationViewModel();
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  const renderMovie = ({ item }: { item: Movie }) => (
    <CardMovie data={item} onPress={() => router.push({ pathname: "/(protected)/(app)/movie-detail", params: { id: item.tmdbId } })} />
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
    </>
  );

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
        ListEmptyComponent={empty}
      />
    </View>
  );
};

