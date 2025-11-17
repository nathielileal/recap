import { ImageSquareIcon, PencilSimpleLineIcon, TrashSimpleIcon } from "phosphor-react-native";
import React, { useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { List } from "../../models/list";
import { useThemeContext } from "../../provider/ThemeProvider";
import { stylesheet } from "../../views/Lists/Lists.style";

interface Props {
  data: List,
  onEditPress: () => void,
  onDeletePress: () => void,
}

export function ListCard({ data, onEditPress, onDeletePress }: Props) {
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  return (
    <View style={[styles.card, { width: "100%", marginBottom: 10 }]}>
      <View style={styles.cardContent}>
        {data.image_path === null ? (
          <View>
            <Image source={{ uri: data.image_path, }} style={styles.cardImage} ></Image>
          </View>
        ) : (
          <View style={styles.cardImage}>
            <ImageSquareIcon size={20} color={theme.secondary} />
          </View>
        )}

        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{data.name}</Text>
          <Text style={styles.cardDescription}>{data.description ?? 'Descrição da lista'}</Text>

          <View style={styles.cardOptions}>
            <TouchableOpacity onPress={onEditPress}>
              <PencilSimpleLineIcon size={20} color={theme.secondary} style={{ marginRight: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDeletePress}>
              <TrashSimpleIcon size={20} color={theme.secondary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
};
