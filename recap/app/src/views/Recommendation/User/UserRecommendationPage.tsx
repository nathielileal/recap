import React, { useMemo } from "react";
import { useRecommendationViewModel } from "../../../viewmodels/recommendation.vielmodel";
import { useThemeContext } from "../../../provider/ThemeProvider";
import { stylesheet } from "../Recommendation.style";
import { View } from "react-native";

export default function UserRecommendationPage() {
  const { loading, filter, setFilter } = useRecommendationViewModel();
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  return (
    <View></View>
  );
};

