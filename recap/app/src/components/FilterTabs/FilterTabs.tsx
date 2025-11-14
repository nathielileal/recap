import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { stylesheet } from "./FilterTabs.styles";
import { useThemeContext } from "../../provider/ThemeProvider";

type FilterType = "public" | "private";

interface Props {
  firstOption: string,
  secondOption: string,
  filter: FilterType;
  setFilter: (value: FilterType) => void;
}

export function FilterTabs({ firstOption, secondOption, filter, setFilter }: Props) {
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);
      
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