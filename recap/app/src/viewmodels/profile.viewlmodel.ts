import { useEffect, useState } from 'react';
import { AuthService } from '../services/auth.service';

export const useProfileViewModel = () => {
  const [filter, setFilter] = useState<"public" | "private">("public");
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const token = await AuthService.getAuthToken();

      if (token) {
        setUsername('Nome do Usuário');
        setEmail('email@exemplo.com');
        setPassword('Senha123');
      }

      setLoading(false);
    };

    loadUser();
  }, []);

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
    loading,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    validateAndSave,
    logout,
    filter,
    setFilter,
    modal,
    handleModal,
    showPassword, 
    setShowPassword
  };
};