import React, { useState } from "react";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";
import { FilterTabs } from "../../components/FilterTabs/FilterTabs";
import { Friend } from "../../models/friend";
import { styles } from "./Friends.style";

// (mock)
const allUsers: Friend[] = [
  { id: "1", name: "Alice Silva", username: "alice123", avatar: undefined },
  { id: "2", name: "Bruno Costa", username: "brunoc", avatar: undefined },
  { id: "3", name: "Carla Souza", username: "carla_s", avatar: undefined },
  { id: "4", name: "Daniel Rocha", username: "danielr", avatar: undefined },
  { id: "5", name: "Eva Lima", username: "eval", avatar: undefined },
];

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([allUsers[0], allUsers[1]]);
  const [filter, setFilter] = useState<"public" | "private">("private");
  const [search, setSearch] = useState("");

  const handleRemoveFriend = (id: string) => {
    setFriends((prev) => prev.filter((f) => f.id !== id));
  };

  const handleAddFriend = (user: Friend) => {
    if (!friends.find((f) => f.id === user.id)) {
      setFriends((prev) => [...prev, user]);
    }
  };

  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
  );

  const renderCard = (item: Friend, isFriendTab: boolean) => (
    <View key={item.id} style={styles.card}>
      <Image
        source={{ uri: item.avatar || "https://via.placeholder.com/50" }}
        style={styles.avatar}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>@{item.username}</Text>
      </View>
      {isFriendTab ? (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveFriend(item.id)}
        >
          <Text style={styles.removeButtonText}>Remover</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.addButtonSmall}
          onPress={() => handleAddFriend(item)}
          disabled={!!friends.find((f) => f.id === item.id)}
        >
          <Text style={styles.addButtonSmallText}>
            {friends.find((f) => f.id === item.id) ? "Adicionado" : "Adicionar"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <CamLenseScreen title="Amigos">
      <FilterTabs firstOption="Todos os amigos" secondOption="Seus amigos" filter={filter} setFilter={setFilter} />

      {filter === "public" ? (
        <View style={styles.listContainer}>
          {friends.length === 0 ? (
            <Text style={styles.emptyText}>Você ainda não adicionou amigos</Text>
          ) : (
            friends.map((item) => renderCard(item, true))
          )}
        </View>
      ) : (
        <View style={{ width: "100%" }}>
          <TextInput
            style={styles.input}
            placeholder="Buscar usuário..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            style={styles.listContainer}
            renderItem={({ item }) => renderCard(item, false)}
          />
        </View>
      )}
    </CamLenseScreen>
  );
};