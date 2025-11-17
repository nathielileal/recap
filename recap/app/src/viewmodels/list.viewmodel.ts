import { useEffect, useState } from "react";
import { List } from "../models/list";
import { AuthService } from "../services/auth.service";
import { ListService } from "../services/list.service";
import { Movie } from "../models/movie";

export const useListsViewModel = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [userLists, setUserLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"public" | "private">("private");
  const [selectedList, setSelectedList] = useState<List | null>(null);

  useEffect(() => {
    load();
  }, []);

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

  const load = async () => {
    setLoading(true);

    try {
      const data = await ListService.getUserLists();

      setLists(data);
    } catch (apiError: any) {
      setError(apiError.message || "Erro inesperado ao carregar listas.");
      setLists([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMovies = async (listId: number) => {
    setLoadingMovies(true);

    try {
      const data = await ListService.getMoviesPerList(listId);

      setMovies(data);
    } catch (apiError: any) {
      setError(apiError.message || "Erro inesperado ao carregar filmes da lista.");
      setMovies([]);
    } finally {
      setLoadingMovies(false);
    }
  };

  const saveList = async (name: string) => {
    return await ListService.saveList(name);
  };

  const updateList = async (listId: number, name: string) => {
    return await ListService.updateList(listId, name)
  };

  const deleteList = async (listId: number) => {
    return await ListService.deleteList(listId);
  };

  const addMovieToList = async (listId: number, tmdbId: number) => {
    return await ListService.addMovieToList(listId, tmdbId);
  };

  return { lists: userLists, name, setName, loading, isModalOpen, setIsModalOpen, saveList, updateList, deleteList, filter, setFilter, selectedList, setSelectedList, load, error, movies, loadMovies, loadingMovies, addMovieToList };
};
