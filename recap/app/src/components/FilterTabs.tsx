import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../views/Lists/Lists.style";

type FilterType = "public" | "private";

interface Props {
  filter: FilterType;
  setFilter: (value: FilterType) => void;
}

const FilterTabs: React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => setFilter("public")}
      >
        <Text
          style={filter === "public" ? styles.tabActiveText : styles.tabText}
        >
          Todas as listas
        </Text>
        {filter === "public" && <View style={styles.tabUnderline} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => setFilter("private")}
      >
        <Text
          style={filter === "private" ? styles.tabActiveText : styles.tabText}
        >
          Minhas listas
        </Text>
        {filter === "private" && <View style={styles.tabUnderline} />}
      </TouchableOpacity>
    </View>
  );
};

export default FilterTabs;
