import { useEffect, useState } from 'react';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

export const useProfileViewModel = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"public" | "private">("public");
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);

    try {
      const data = await UserService.getUser();

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

  const logout = async () => {
    await AuthService.clearSession();
  };

  const handleModal = () => {
    setModal(!modal);
  };

  return {
    user, error, loading, username, setUsername, email, setEmail, password, setPassword, image, setImage, emailError, passwordError, 
    validateAndSave, logout, filter, setFilter, modal, handleModal, showPassword, setShowPassword
  };
};