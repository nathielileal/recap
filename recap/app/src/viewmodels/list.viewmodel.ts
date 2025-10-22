import { useState } from "react";

export interface MovieList {
  id: string;
  name: string;
  createdBy: string;
  description: string;
  date: string;
  items: string[];
  image?: string;
  isPublic: boolean;
}

export const useListsViewModel = () => {
  const [lists, setLists] = useState<MovieList[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"public" | "private">("private");

  const createList = (
    name: string,
    description: string,
    image: string | undefined,
    items: string[] = [],
    isPublic: boolean = false
  ) => {
    const newList: MovieList = {
      id: Date.now().toString(),
      name,
      createdBy: "mattheaa", // usuário atual
      description,
      date: new Date().toLocaleDateString("pt-BR"),
      items,
      image,
      isPublic,
    };
    setLists((prev) => [newList, ...prev]);
  };

  const updateList = (
    id: string,
    updated: Partial<Omit<MovieList, "id" | "createdBy" | "date">>
  ) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === id
          ? { ...list, ...updated } // mantém id, createdBy e date
          : list
      )
    );
  };

  const deleteList = (id: string) => {
    setLists((prev) => prev.filter((list) => list.id !== id));
  };

  // Filtra listas de acordo com a aba selecionada
  const filteredLists = lists.filter((list) => {
    if (filter === "public") {
      return list.isPublic; // Todas as listas públicas
    } else {
      return list.createdBy === "mattheaa"; // Todas as listas criadas pelo usuário
    }
  });

  return {
    lists: filteredLists,
    isModalOpen,
    setIsModalOpen,
    createList,
    updateList,
    deleteList,
    filter,
    setFilter,
  };
};
