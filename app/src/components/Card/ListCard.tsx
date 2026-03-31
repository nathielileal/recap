import { ImageSquareIcon, PencilSimpleLineIcon, TrashSimpleIcon } from "phosphor-react-native";
import React, { useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { List } from "../../models/list";
import { useThemeContext } from "../../provider/ThemeProvider";
import { stylesheet } from "../../views/Lists/Lists.style";

interface Props {
  data: List,
  onEditPress?: () => void,
  onDeletePress?: () => void,
  showInfo?: boolean,
  children?: React.ReactNode,
}

export function ListCard({ data, onEditPress, onDeletePress, showInfo, children }: Props) {
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  const options = (
    <View style={styles.cardOptions}>
      <TouchableOpacity onPress={onEditPress}>
        <PencilSimpleLineIcon size={20} color={theme.terciary} style={{ marginRight: 5 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDeletePress}>
        <TrashSimpleIcon size={20} color={theme.secondary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.card, { width: "100%", marginBottom: 10 }]}>
      <View style={styles.cardContent}>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{data.name}</Text>

          <View style={styles.options}>
            <Text style={styles.cardDescription}>{`${data.movies.length} ${data.movies.length === 1 ? 'filme' : 'filmes'}`}</Text>

            {children || options}
          </View>
        </View>
      </View>
    </View>
  )
};
