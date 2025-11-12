import React from "react";
import { Text } from "react-native";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";
import { styles } from "./Recommendation.style";

export default function RecommendationPage() {
  return (
    <CamLenseScreen title="Recomendação">
      <Text style={styles.empty}>Não é possível pedir uma recomendação personalizada no momento.</Text>
    </CamLenseScreen>
  );
};

