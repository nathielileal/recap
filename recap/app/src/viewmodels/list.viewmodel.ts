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
      createdBy: "mattheaa",
      description,
      date: new Date().toLocaleDateString("pt-BR"),
      items,
      image,
      isPublic,
    };
    setLists((prev) => [newList, ...prev]);
  };

  const filteredLists = lists.filter((list) =>
    filter === "public" ? list.isPublic : !list.isPublic
  );

  return {
    lists: filteredLists,
    isModalOpen,
    setIsModalOpen,
    createList,
    filter,
    setFilter,
  };
};
