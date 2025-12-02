import { useEffect, useState } from 'react';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Social } from '../models/social';
import { RatingService } from '../services/rating.service';
import { CatalogService } from '../services/catalog.service';

export const useProfileViewModel = (id: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"public" | "private" | "mine">("public");
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [modal, setModal] = useState(false);

  const [following, setFollowing] = useState<number>(0);
  const [followers, setFollowers] = useState<number>(0);
  const [ratings, setRatings] = useState<number>(0);
  const [watchlist, setWatchlist] = useState<number>(0);

  useEffect(() => {
    getWatchlist();
    getFollowing();
    getFollowers();
    getRatings();
    load();
  }, [id]);

  const load = async () => {
    setLoading(true);

    try {
      const userId = id ?? await AuthService.getAuthIDUser();
      const data = await UserService.getUser(userId);

      setUser(data);
    } catch (apiError: any) {
      setError(apiError.message || "Erro inesperado ao carregar informações do usuário.");
      setUser(null);

    } finally {
      setLoading(false);
    }
  };

  const validateAndSave = async () => {
    let valid = true;

    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Email inválido');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Senha deve ter pelo menos 6 caracteres');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      alert('Perfil atualizado com sucesso!');
    }
  };

  const getFollowing = async () => {
    try {
      const userId = id ?? await AuthService.getAuthIDUser();
      const follows: Social[] = await UserService.getFollowing(userId);

      setFollowing(follows.length);
    } catch (apiError: any) {
      setFollowing(0);
    }
  }

  const getFollowers = async () => {
    try {
      const userId = id ?? await AuthService.getAuthIDUser();
      const follows: Social[] = await UserService.getFollowers(userId);

      setFollowers(follows.length);
    } catch (apiError: any) {
      setFollowers(0);
    }
  }

  const getRatings = async () => {
    try {
      const userId = id ?? await AuthService.getAuthIDUser();
      const ratings = await RatingService.getUserRating(userId);

      setRatings(ratings.ratings.length);
    } catch (apiError: any) {
      setRatings(0);
    }
  }

  const getWatchlist = async () => {
    try {
      const userId = id ?? await AuthService.getAuthIDUser();
      const movies = await CatalogService.getCatalog(userId);

      setWatchlist(movies.movies.length);
    } catch (apiError: any) {
      setWatchlist(0);
    }
  }

  const logout = async () => {
    await AuthService.clearSession();
  };

  const handleModal = () => {
    setModal(!modal);
  };

  return {
    user, error, loading, username, setUsername, email, setEmail, password, setPassword, image, setImage, emailError, passwordError,
    validateAndSave, logout, filter, setFilter, modal, handleModal, showPassword, setShowPassword, following, followers, ratings, watchlist
  };
};