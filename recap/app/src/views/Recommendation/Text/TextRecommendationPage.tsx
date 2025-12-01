import React, { useMemo } from "react";
import { View } from "react-native";
import { useRecommendationViewModel } from "../../../viewmodels/recommendation.vielmodel";
import { useThemeContext } from "../../../provider/ThemeProvider";
import { stylesheet } from "../Recommendation.style";

export default function TextRecommendationPage() {
  const { loading, filter, setFilter } = useRecommendationViewModel();
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  return (
    <View></View>
  );
};

