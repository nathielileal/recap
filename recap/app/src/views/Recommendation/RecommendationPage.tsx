import React from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    View
} from "react-native";
import { styles } from "./Recommendation.style";


const RecommendationPage = () => {

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Recomendações</Text>

          

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecommendationPage;
