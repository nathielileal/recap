import React, { useMemo } from "react";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";
import { stylesheet } from "./Recommendation.style";
import { useThemeContext } from "../../provider/ThemeProvider";
import { useRecommendationViewModel } from "../../viewmodels/recommendation.vielmodel";
import { ScrollView, View } from "react-native";
import { FilterTabs } from "../../components/FilterTabs/FilterTabs";
import UserRecommendationPage from "./User/UserRecommendationPage";
import TextRecommendationPage from "./Text/TextRecommendationPage";

export default function RecommendationPage() {
  const { loading, filter, setFilter } = useRecommendationViewModel();
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  return (
    <CamLenseScreen title='Recomendação'>
      <View style={styles.card}>
        <FilterTabs firstOption="Baseada no seu perfil" secondOption="Buscar por texto" filter={filter} setFilter={setFilter} />

          {filter === 'public' ? (<UserRecommendationPage />) : (<TextRecommendationPage />)}
      </View>
    </CamLenseScreen>
  );
};

