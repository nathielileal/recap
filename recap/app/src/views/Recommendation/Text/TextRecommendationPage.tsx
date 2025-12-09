import React, { useMemo } from "react";
import { useRecommendationViewModel } from "../../../viewmodels/recommendation.vielmodel";
import { useThemeContext } from "../../../provider/ThemeProvider";
import { stylesheet } from "../Recommendation.style";
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MagnifyingGlassIcon, ThumbsDownIcon, ThumbsUpIcon } from "phosphor-react-native";
import { Movie } from "../../../models/movie";
import { CardMovie } from "../../../components/Card/CardMovie/CardMovie";
import { router } from "expo-router";

export default function TextRecommendationPage() {
  const { loading, textMovie, hasRecommendations, search, setSearch, saveTextRec } = useRecommendationViewModel();
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  const renderMovie = ({ item }: { item: Movie }) => (
    <CardMovie data={item} onPress={() => router.push({ pathname: "/(protected)/(app)/movie-detail", params: { id: item.tmdbId } })} />
  );

  const header = (
    <>
      <View style={styles.context}>
        <View style={styles.header}>
          <View style={styles.input}>
            <TextInput placeholder="Ex: Filmes com viagem no tempo" placeholderTextColor={theme.terciary} value={search} onChangeText={setSearch} style={styles.textInput} multiline autoCapitalize="none" />
          </View>

          <TouchableOpacity style={[styles.btn, { marginLeft: 15 }]} onPress={() => saveTextRec(search)}>
            <MagnifyingGlassIcon size={15} color={theme.terciary} />
            <Text style={styles.btnText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.about}>Descreva o tipo de filme que você quer assistir e a IA irá sugerir títulos.</Text>

      </View>
    </>
  );

  const empty = () => {
    if (loading) {
      return (<ActivityIndicator size="large" color={theme.secondary} style={{ marginTop: 50 }} />);
    }

    let message;

    if (!hasRecommendations && !loading) {
      message = 'Não foi possível gerar uma recomendação agora. Tente novamente mais tarde!.';
    }

    return (
      <Text style={[hasRecommendations ? styles.about : styles.empty, { marginTop: 20 }]}>{message}</Text>
    );
  };

  return (
    <View style={[styles.container, { flex: 1, width: '100%' }]}>
      <FlatList
        data={textMovie}
        renderItem={renderMovie}
        numColumns={3}
        keyExtractor={(item, index) => `${item.tmdbId}-${index}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={header}
        ListEmptyComponent={empty}
        contentContainerStyle={{ padding: 2, alignItems: "center", justifyContent: "center" }}
        columnWrapperStyle={{ justifyContent: 'flex-start', paddingHorizontal: 5 }}
      />
    </View>
  );
};

