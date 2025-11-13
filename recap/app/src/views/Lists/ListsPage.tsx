import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";
import { FilterTabs } from "../../components/FilterTabs/FilterTabs";
import ListCard from "../../components/ListCard";
import CreateListModal from "../../components/Modal/CreateListModal";
import { useListsViewModel } from "../../viewmodels/list.viewmodel";
import { styles } from "./Lists.style";

const ListsPage = () => {
  const { lists, isModalOpen, setIsModalOpen, createList, updateList, deleteList, filter, setFilter, selectedList, setSelectedList } = useListsViewModel();

  const handleListPress = (list: any) => {
    setSelectedList(list);
    setIsModalOpen(true);
  };

  const handleDelete = (listId: string) => {
    Alert.alert(
      "Remover lista",
      "Tem certeza que deseja remover esta lista?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", style: "destructive", onPress: () => deleteList(listId) },
      ]
    );
  };

  const handleCloseModal = () => {
    setSelectedList(null);
    setIsModalOpen(false);
  };

  const handleSaveList = (
    name: string,
    description: string,
    image?: string,
    items?: string[],
    isPublic?: boolean
  ) => {
    if (selectedList) {
      updateList(selectedList.id, { name, description, image, items, isPublic });
    } else {
      createList(name, description, image, items, isPublic);
    }
    handleCloseModal();
  };

  return (
    <CamLenseScreen title="Listas">
      <FilterTabs firstOption="Todas as listas" secondOption="Minhas listas" filter={filter} setFilter={setFilter} />

      <View style={styles.listContainer}>
        {lists.length === 0 ? (
          <Text style={{ color: "#ccc", textAlign: "center", marginTop: 20 }}>
            Nenhuma lista criada ainda.
          </Text>
        ) : (
          lists.map((list) => (
            <TouchableOpacity
              key={list.id}
              onPress={() => handleListPress(list)}
              onLongPress={() => handleDelete(list.id)}
            >
              <ListCard list={list} />
            </TouchableOpacity>
          ))
        )}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalOpen(true)}
      >
        <Text style={styles.addButtonText}>+ Criar nova lista</Text>
      </TouchableOpacity>

      {isModalOpen && (
        <CreateListModal
          onClose={handleCloseModal}
          onCreate={handleSaveList}
          name={selectedList?.name}
          description={selectedList?.description}
          image={selectedList?.image}
          items={selectedList?.items}
          isPublic={selectedList?.isPublic}
        />
      )}
    </CamLenseScreen>
  );
};

export default ListsPage;
