import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { stylesheet } from "./FilterTabs.styles";
import { useThemeContext } from "../../provider/ThemeProvider";

type FilterType = "public" | "private" | "mine";

interface Props {
  firstOption: string,
  secondOption: string,
  thirdOption?: string,
  hasMoreTabs?: boolean,
  filter: FilterType;
  setFilter: (value: FilterType) => void;
}

export function FilterTabs({ firstOption, secondOption, thirdOption, hasMoreTabs, filter, setFilter }: Props) {
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  const showThirdTab = hasMoreTabs && thirdOption;

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

      {showThirdTab && (
        <TouchableOpacity style={styles.item} onPress={() => setFilter("mine")}>
          <Text style={filter === "mine" ? styles.tabActiveText : styles.tabText}>
            {thirdOption}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};