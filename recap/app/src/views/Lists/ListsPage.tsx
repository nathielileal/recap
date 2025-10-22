import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FilterTabs from "../../components/FilterTabs";
import ListCard from "../../components/ListCard";
import CreateListModal from "../../components/Modal/CreateListModal";
import { useListsViewModel } from "../../viewmodels/list.viewmodel";
import { styles } from "./Lists.style";

const ListsPage = () => {
  const {
    lists,
    isModalOpen,
    setIsModalOpen,
    createList,
    updateList,
    deleteList,
    filter,
    setFilter,
  } = useListsViewModel();

  const [selectedList, setSelectedList] = useState<any>(null);

  // Abrir modal para editar lista
  const handleListPress = (list: any) => {
    setSelectedList(list);
    setIsModalOpen(true);
  };

  // Remover lista
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

  // Fechar modal
  const handleCloseModal = () => {
    setSelectedList(null);
    setIsModalOpen(false);
  };

  // Criar ou atualizar lista
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Listas</Text>

          <FilterTabs filter={filter} setFilter={setFilter} />

          <View style={styles.listContainer}>
            {lists.length === 0 ? (
              <Text style={{ color: "#ccc", textAlign: "center", marginTop: 20 }}>
                Nenhuma lista criada ainda
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
        </View>

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListsPage;
