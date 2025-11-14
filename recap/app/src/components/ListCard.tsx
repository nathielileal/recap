import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { List } from "../models/list";
import { useThemeContext } from "../provider/ThemeProvider";
import { stylesheet } from "../views/Lists/Lists.style";

interface Props {
    data: List,
}

export function ListCard({ data }: Props) {
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  return (
    <View style={[styles.card, { width: "100%", marginBottom: 10 }]}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{data.name}</Text>
      </View>
    </View>
  )
};
