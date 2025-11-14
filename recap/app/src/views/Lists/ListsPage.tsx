import React, { useMemo } from "react";
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";
import { FilterTabs } from "../../components/FilterTabs/FilterTabs";
import { ListCard } from "../../components/ListCard";
import CreateListModal from "../../components/Modal/List/ListModal";
import { List } from "../../models/list";
import { useThemeContext } from "../../provider/ThemeProvider";
import { useListsViewModel } from "../../viewmodels/list.viewmodel";
import { stylesheet } from "./Lists.style";

const ListsPage = () => {
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);
  const { lists, loading, isModalOpen, setIsModalOpen, deleteList, filter, setFilter, selectedList, setSelectedList, load } = useListsViewModel();

  const handleListPress = (list: List) => {
    setSelectedList(list);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedList(null);
    setIsModalOpen(false);
    load();
  };

  const handleDelete = async (listId: number) => {
    Alert.alert("Remover lista", "Tem certeza que deseja remover esta lista?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Remover", style: "destructive", onPress: () => deleteList(listId) },
    ]);
  };

  const renderItem = ({ item }: { item: List }) => (
    <TouchableOpacity key={item.id} onPress={() => handleListPress(item)} style={{ width: "100%" }}>
      <ListCard data={item} />
    </TouchableOpacity>
  );

  return (
    <CamLenseScreen title="Listas">
      <FilterTabs firstOption="Todas as listas" secondOption="Minhas listas" filter={filter} setFilter={setFilter} />

      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size={50} color={theme.terciary} style={{ marginVertical: 20 }} />
        ) : lists.length === 0 ? (
          <Text style={{ color: theme.terciary, textAlign: "center", marginTop: 20 }}>Nenhuma lista criada ainda.</Text>
        ) : (
          <FlatList
            key="lists"
            data={lists}
            numColumns={1}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "flex-start", justifyContent: "space-between" }}
            // ListFooterComponent={loading && lists.length > 0 ? <ActivityIndicator size={50} color={theme.terciary} style={{ marginVertical: 20 }} /> : null}
          />
        )}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalOpen(true)}>
        <Text style={styles.addButtonText}>+ Criar nova lista</Text>
      </TouchableOpacity>

      {isModalOpen && (<CreateListModal onClose={handleCloseModal} listId={selectedList?.id || 0} initialName={selectedList?.name || ""} />)}
    </CamLenseScreen>
  );
};

export default ListsPage;
