import { useState } from 'react';
import { signIn } from '../services/authService';

export function useLoginViewModel() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!username || !password) return;
    await signIn({ username, password });
  };

  return { username, password, setUsername, setPassword, handleSignIn };
}
