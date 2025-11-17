import React, { useMemo, useState } from "react";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";
import { FilterTabs } from "../../components/FilterTabs/FilterTabs";
import { useThemeContext } from "../../provider/ThemeProvider";
import { stylesheet } from "./Friends.style";
import { useFriendsViewModel } from "../../viewmodels/friends.viewmodel";
import { User } from "../../models/user";

export default function FriendsPage() {
  const { users, filter, setFilter, search, setSearch, loading, error } = useFriendsViewModel();
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  const handleRemoveFriend = (id: string) => {
  };

  const handleAddFriend = (user: User) => {
  };

  const renderCard = (item: User) => {
    return (
      <View key={item.id} style={styles.card}>
        <Image source={{ uri: "https://via.placeholder.com/50" }} style={styles.avatar} />

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
        </View>

        <TouchableOpacity style={[styles.addButtonSmall, { backgroundColor: theme.darkGrey }]} onPress={() => handleAddFriend(item)} >
          <Text style={styles.addButtonSmallText}>
            {"Seguir"}
          </Text>
        </TouchableOpacity>
      </View>
    )
  };

  const renderPage = () => {
    if (loading) {
      return <Text style={styles.emptyText}>Carregando usuários...</Text>;
    }

    if (error) {
      return <Text style={[styles.emptyText, { color: theme.terciary }]}>Erro ao carregar: {error}</Text>;
    }

    if (users.length === 0) {
      const emptyMessage = filter === "private"
        ? "Você ainda não segue nenhum usuário."
        : filter === "mine" ? "Você ainda não é seguido por nenhum usuário." : "Nenhum usuário encontrado.";

      return <Text style={styles.emptyText}>{emptyMessage}</Text>;
    }

    return (
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
        renderItem={({ item }) => renderCard(item)}
      />
    );
  }

  return (
    <CamLenseScreen title="Amigos">
      <FilterTabs firstOption="Todos os usuários" secondOption="Seguidores" thirdOption="Seguindo" hasMoreTabs={true} filter={filter} setFilter={setFilter} />

      {filter === "private" ? (
        <View style={styles.listContainer}>
          {renderPage()}
        </View>
      ) : filter === "mine" ? (
        <View style={styles.listContainer}>
          {renderPage()}
        </View>
      ) : (
        <View style={{ width: "100%" }}>
          <TextInput
            style={styles.input}
            placeholder="Buscar usuário..."
            placeholderTextColor={theme.grey}
            value={search}
            onChangeText={setSearch}
          />

          {renderPage()}
        </View>
      )}
    </CamLenseScreen>
  );
};