import React, { useMemo } from "react";
import { Text } from "react-native";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";
import { stylesheet } from "./Recommendation.style";
import { useThemeContext } from "../../provider/ThemeProvider";

export default function RecommendationPage() {
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  return (
    <CamLenseScreen title="Recomendações">
      <Text style={styles.empty}>Não é possível pedir uma recomendação personalizada no momento.</Text>
    </CamLenseScreen>
  );
};

