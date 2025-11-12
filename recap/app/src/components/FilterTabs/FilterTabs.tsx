import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./FilterTabs.styles";

type FilterType = "public" | "private";

interface Props {
  firstOption: string,
  secondOption: string,
  filter: FilterType;
  setFilter: (value: FilterType) => void;
}

export function FilterTabs({ firstOption, secondOption, filter, setFilter }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => setFilter("public")} >
        <Text style={filter === "public" ? styles.tabActiveText : styles.tabText}>
          {firstOption}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => setFilter("private")}>
        <Text style={filter === "private" ? styles.tabActiveText : styles.tabText}>
          {secondOption}
        </Text>
      </TouchableOpacity>
    </View>
  );
};