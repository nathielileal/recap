import { useEffect, useState } from 'react';
import { AuthService } from '../services/auth.service';

export const useProfileViewModel = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      const token = await AuthService.getAuthToken();
      
      if (token) {
        setUsername('Nome do Usuário');
        setEmail('email@exemplo.com');
        setPassword('********');
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
     
      setEditUsername(false);
      setEditEmail(false);
      setEditPassword(false);
    }
  };

  const logout = async () => {
    await AuthService.clearSession();
  };

  return {
    loading,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    editUsername,
    setEditUsername,
    editEmail,
    setEditEmail,
    editPassword,
    setEditPassword,
    emailError,
    passwordError,
    validateAndSave,
    logout,
  };
};