import React from "react";
import { Image, Text, View } from "react-native";
import { MovieList } from "../viewmodels/list.viewmodel";
import { styles } from "../views/Lists/Lists.style";

const ListCard: React.FC<{ list: MovieList }> = ({ list }) => (
  <View style={styles.card}>
    {list.image ? (
      <Image source={{ uri: list.image }} style={styles.cardImage} />
    ) : (
      <View style={styles.cardImage} />
    )}

    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{list.name}</Text>
      <Text style={styles.cardSubtitle}>Criado por {list.createdBy}</Text>
      <Text style={styles.cardDescription}>{list.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardDate}>{list.date}</Text>
        <Text style={styles.cardItems}>{list.items.length} itens</Text>
      </View>
    </View>
  </View>
);

export default ListCard;
