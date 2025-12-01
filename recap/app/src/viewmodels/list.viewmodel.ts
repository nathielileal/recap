import { useEffect, useState } from "react";
import { List } from "../models/list";
import { AuthService } from "../services/auth.service";
import { ListService } from "../services/list.service";
import { Movie } from "../models/movie";
import { CatalogService } from "../services/catalog.service";

export const useListsViewModel = () => {
  // geral
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [empty, setEmpty] = useState(false);

  // list page
  const [lists, setLists] = useState<List[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [userLists, setUserLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState<"public" | "private" | "mine">("private");
  const [selectedList, setSelectedList] = useState<List | null>(null);

  // movie page
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [searchMovies, setSearchMovies] = useState<Movie[]>([]);

  useEffect(() => {
    load(search);
  }, [search]);

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

  const load = async (strsearch: string) => {
    setLoading(true);
    setEmpty(false);

    try {
      let data: List[] = [];
      data = await ListService.getUserLists();

      if (search) {
        data = data.filter(movie => movie.name.toLowerCase().includes(search.toLowerCase()));
        // data = await ListService.searchList(strsearch);
      }

      setLists(data);
      setEmpty(data.length === 0 && strsearch.length > 0);
    } catch (apiError: any) {
      setError(apiError.message || "Erro inesperado ao carregar listas.");
      setLists([]);
      setEmpty(false);
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

  const deleteMovieFromList = async (listId: number, tmdbId: number) => {
    return await ListService.deleteMovieFromList(listId, tmdbId);
  };

  const onSearchChange = (text: string) => {
    setSearch(text);

    if (text.length > 2) {
      // searchMovie(text);
    } else {
      setSearchMovies([]);
    }
  };

  return {
    lists: userLists, empty, name, setName, loading, isModalOpen, setIsModalOpen, saveList, updateList, deleteList, filter, setFilter, selectedList, setSelectedList, load, error,
    movies, loadMovies, loadingMovies, addMovieToList, deleteMovieFromList, search, setSearch, searchMovies, onSearchChange
  };
};
