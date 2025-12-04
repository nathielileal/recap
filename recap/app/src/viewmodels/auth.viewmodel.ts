import { useState } from 'react';
import { AuthService } from '../services/auth.service';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const useAuthViewModel = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const getSignIn = async () => {
    setIsLoading(true);
    setAuthError('');

    if (!email.includes('@') || !email.includes('.')) {
      setAuthError('Email inválido.');
      setIsLoading(false);

      return false;
    }

    const result = await AuthService.signIn({ email, password });

    if (!result?.success) {
      setAuthError(result?.error || 'Email ou senha incorretos.');
    }

    setIsLoading(false);
    return result?.success;
  };

  const getSignUp = async () => {
    let isValid = true;
    setIsLoading(true);
    setAuthError('');

    // validações locais
    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Email inválido');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (username.trim().length < 3) {
      setUsernameError('Nome de usuário deve conter pelo menos 3 caracteres');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (password !== confirmPassword) {
      setPasswordError('As senhas não coincidem');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Senha deve conter pelo menos 6 caracteres');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isValid) {
      setIsLoading(false);

      return false;
    }

    // validações da api
    setEmailError('');
    setUsernameError('');
    setPasswordError('');

    const signUpResult = await AuthService.sighUp({ email, name: username, password });

    if (!signUpResult?.success) {
      setAuthError(signUpResult?.error || 'Não foi possível criar a conta. Tente novamente.');

      setIsLoading(false);

      return false;
    }

    await delay(500);

    const signInResult = await AuthService.signIn({ email, password });

    if (!signInResult?.success) {
      setAuthError(signUpResult?.error || 'Não foi possível criar a conta. Tente novamente.');

      setIsLoading(false);

      return false;
    }

    setIsLoading(false);

    return true;
  };

  const getRecover = async () => {
    setIsLoading(true);
    setAuthError('');

    if (!email.includes('@') || !email.includes('.')) {
      setAuthError('Email inválido.');
      setIsLoading(false);

      return false;
    }

    const result = await AuthService.recover({ email });

    if (!result?.success) {
      setAuthError(result?.error || 'Email incorreto.');
    }

    setIsLoading(false);
    return result?.success;
  };

  return {
    email, setEmail,
    username, setUsername,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    emailError,
    usernameError,
    passwordError,
    authError,
    isLoading,
    showPassword, setShowPassword,
    showConfirm, setShowConfirm,
    getSignIn,
    getSignUp,
    getRecover
  };
};