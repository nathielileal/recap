import React, { useMemo, useState } from "react";
import { Alert, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";
import { FilterTabs } from "../../components/FilterTabs/FilterTabs";
import { useThemeContext } from "../../provider/ThemeProvider";
import { stylesheet } from "./Friends.style";
import { useFriendsViewModel } from "../../viewmodels/friends.viewmodel";
import { User } from "../../models/user";
import { MagnifyingGlassIcon, UserCircleIcon } from "phosphor-react-native";

export default function FriendsPage() {
  const { load, users, filter, setFilter, search, setSearch, loading, error, follow, unfollow, following } = useFriendsViewModel();
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  const handleRemoveFriend = async (followingId: string) => {
    const response = await unfollow(followingId);

    if (response.success) {
      Alert.alert("Deixou de seguir usuário com sucesso!");
      load();
    } else {
      Alert.alert("Falha ao deixar de seguir usuário", response.error);
    }
  };

  const handleAddFriend = async (followingId: string) => {
    const response = await follow(followingId);

    if (response.success) {
      Alert.alert("Usuário seguido com sucesso!");
      load();
    } else {
      Alert.alert("Falha ao seguir usuário", response.error);
    }
  };

  const BtnFollow = (item: User) => {
    return (
      <TouchableOpacity style={[styles.btn, { backgroundColor: theme.darkGrey }]} onPress={() => handleAddFriend(item.id)}>
        <Text style={styles.btnText}>Seguir</Text>
      </TouchableOpacity>
    );
  }

  const BtnFollowing = (item: User) => {
    return (
      <TouchableOpacity style={[styles.btn, { backgroundColor: theme.secondary }]} onPress={() => handleRemoveFriend(item.id)} >
        <Text style={styles.btnText}>Seguindo</Text>
      </TouchableOpacity>);
  }

  const renderCard = (item: User) => {
    const isFollowing = following.has(item.id);
    let button;

    if (filter === "public") {
      button = isFollowing ? BtnFollowing(item) : BtnFollow(item);
    } else if (filter === "private") {
      button = isFollowing ? BtnFollowing(item) : BtnFollow(item);
    } else if (filter === "mine") {
      button = BtnFollowing(item);
    }

    return (
      <View style={styles.card}>
        <UserCircleIcon size={35} color={theme.secondaryOpacity}></UserCircleIcon>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>@{item.name}</Text>
        </View>

        {button}
      </View>
    )
  };

  const renderPage = () => {
    if (loading) {
      return <Text style={styles.empty}>Carregando usuários...</Text>;
    }

    if (error) {
      return <Text style={[styles.empty, { color: theme.terciary }]}>Erro ao carregar: {error}</Text>;
    }

    if (users.length === 0) {
      return <Text style={styles.empty}>Nenhum usuário encontrado.</Text>;
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

      <View style={{ width: "100%" }}>
          <View style={styles.input}>
            <TextInput placeholder="Buscar" placeholderTextColor={theme.terciary} style={styles.textInput} value={search} onChangeText={setSearch} autoCapitalize="none" />
            <MagnifyingGlassIcon color={theme.terciary} size={25} weight="light"></MagnifyingGlassIcon>
          </View>

          {renderPage()}
        </View>
    </CamLenseScreen>
  );
};