import { useEffect, useState } from "react";
import { List } from "../models/list";
import { AuthService } from "../services/auth.service";
import { ListService } from "../services/list.service";

export const useListsViewModel = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [userLists, setUserLists] = useState<List[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"public" | "private">("private");
  const [selectedList, setSelectedList] = useState<List | null>(null); 

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);

    try {
      const data = await ListService.getUserLists();

      setLists(data);
    } catch (error) {
      console.warn("Erro ao carregar listas.", error);
      setLists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const applyFilter = async () => {
      const userId = await AuthService.getAuthIDUser();
      const result = lists.filter(list => {
        if (filter === "public") {
          return list.userId === userId;
        }

        return true;
      });

      setUserLists(result);
    };

    applyFilter();
  }, [lists, filter]);

  const saveList = async (name: string) => {
    return await ListService.saveList(name);
  };

  const updateList = async (listId: number, name: string) => {
    return await ListService.updateList(listId, name)
  };

  const deleteList = async (listId: number) => {
    return await ListService.deleteList(listId);
  };

  return { lists: userLists, name, setName, loading, isModalOpen, setIsModalOpen, saveList, updateList, deleteList, filter, setFilter, selectedList, setSelectedList, load };
};
