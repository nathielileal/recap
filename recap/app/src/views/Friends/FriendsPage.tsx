import React, { useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./Friends.style";

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar?: string; 
}

// (mock)
const allUsers: Friend[] = [
  { id: "1", name: "Alice Silva", username: "alice123", avatar: undefined },
  { id: "2", name: "Bruno Costa", username: "brunoc", avatar: undefined },
  { id: "3", name: "Carla Souza", username: "carla_s", avatar: undefined },
  { id: "4", name: "Daniel Rocha", username: "danielr", avatar: undefined },
  { id: "5", name: "Eva Lima", username: "eval", avatar: undefined },
];

const FriendsPage = () => {
  const [friends, setFriends] = useState<Friend[]>([allUsers[0], allUsers[1]]);
  const [tab, setTab] = useState<"friends" | "all">("friends");
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Amigos</Text>

          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setTab("friends")}
            >
              <Text
                style={tab === "friends" ? styles.tabActiveText : styles.tabText}
              >
                Seus Amigos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setTab("all")}
            >
              <Text
                style={tab === "all" ? styles.tabActiveText : styles.tabText}
              >
                Todos os Usuários
              </Text>
            </TouchableOpacity>
          </View>

          {tab === "friends" ? (
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FriendsPage;
