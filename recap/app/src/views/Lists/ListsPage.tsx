import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import CreateListModal from "../../components/CreateListModal";
import FilterTabs from "../../components/FilterTabs";
import ListCard from "../../components/ListCard";
import { useListsViewModel } from "../../viewmodels/list.viewmodel";
import { styles } from "./Lists.style";

const ListsPage = () => {
  const {
    lists,
    isModalOpen,
    setIsModalOpen,
    createList,
    filter,
    setFilter,
  } = useListsViewModel();

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>Listas</Text>


      <View style={styles.container}>
        <FilterTabs filter={filter} setFilter={setFilter} />

        <View style={styles.listContainer}>
          {lists.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalOpen(true)}
      >
        <Text style={styles.addButtonText}>+ Criar nova lista</Text>
      </TouchableOpacity>

      {isModalOpen && (
        <CreateListModal
          onClose={() => setIsModalOpen(false)}
          onCreate={createList}
        />
      )}
    </ScrollView>
  );
};

export default ListsPage;
