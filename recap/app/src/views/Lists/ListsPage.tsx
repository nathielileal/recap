import { router } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator, Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";
import { ListCard } from "../../components/Card/ListCard";
import { FilterTabs } from "../../components/FilterTabs/FilterTabs";
import { List } from "../../models/list";
import { useThemeContext } from "../../provider/ThemeProvider";
import { useListsViewModel } from "../../viewmodels/list.viewmodel";
import { stylesheet } from "./Lists.style";
import { MagnifyingGlassIcon, PlusIcon } from "phosphor-react-native";
import { ListFormModal } from "../../components/Modal/ListForm/ListFormModal";

const ListsPage = () => {
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);
  const { lists, loading, search, setSearch, empty, isModalOpen, setIsModalOpen, deleteList, filter, setFilter, selectedList, setSelectedList, load, error } = useListsViewModel();

  const handleListPress = (list: List) => {
    setSelectedList(list);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedList(null);
    setIsModalOpen(false);

    load("");
  };

  const handleDelete = async (listId: number) => {
    Alert.alert("Remover lista", "Tem certeza que deseja remover esta lista?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover", style: "destructive", onPress: async () => {
          const response = await deleteList(listId);

          if (response.success) {
            Alert.alert("Lista excuída com sucesso!");
            load("");
          } else {
            const message = response.error || "Ocorreu um erro ao excluir a lista. Tente novamente mais tarde!";
            Alert.alert("Falha ao excluir lista", message);
          }
        }
      },
    ]);
  };

  const showMovies = (listId: number, name: string) => {
    router.push({ pathname: "/movies-list", params: { listId: listId, name: name } });
  }

  const renderItem = ({ item }: { item: List }) => (
    <TouchableOpacity key={item.id} onPress={() => showMovies(item.id, item.name)} style={{ width: "100%" }}>
      <ListCard data={item} onEditPress={() => handleListPress(item)} onDeletePress={() => handleDelete(item.id)} />
    </TouchableOpacity>
  );

  return (
    <CamLenseScreen title="Listas">
      <FilterTabs firstOption="Todas as listas" secondOption="Minhas listas" filter={filter} setFilter={setFilter} />

      <View style={styles.header}>
        <View style={styles.input}>
          <TextInput placeholder="Buscar" placeholderTextColor={theme.terciary} style={styles.textInput} value={search} onChangeText={setSearch} autoCapitalize="none" />
          <MagnifyingGlassIcon color={theme.terciary} size={25} weight="light"></MagnifyingGlassIcon>
        </View>

        {empty && (<Text style={styles.empty}>Nenhum filme encontrado para "{search}"</Text>)}
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size={50} color={theme.terciary} style={{ marginVertical: 20 }} />
        ) : error ? (
          <Text style={{ color: theme.secondary, textAlign: "center", fontSize: 16 }}>
            {error}
          </Text>
        ) : lists.length === 0 ? (
          <Text style={{ color: theme.terciary, textAlign: "center", fontSize: 16 }}>Nenhuma lista criada ainda.</Text>
        ) : (
          <FlatList
            key="lists"
            data={lists}
            numColumns={1}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <TouchableOpacity style={[styles.btn, { position: "absolute", bottom: 15, right: 15, zIndex: 10 }]} onPress={() => setIsModalOpen(true)}>
        <PlusIcon size={30} color={theme.terciary}></PlusIcon>
      </TouchableOpacity>

      {isModalOpen && (<ListFormModal onClose={handleCloseModal} listId={selectedList?.id || 0} initialName={selectedList?.name || ""} />)}
    </CamLenseScreen>
  );
};

export default ListsPage;
