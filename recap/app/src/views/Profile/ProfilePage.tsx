import { router } from 'expo-router';
import { FloppyDiskIcon, PencilSimpleIcon, SignOutIcon } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { AuthSession } from '../../services/authService';

export default function ProfilePage() {
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
      const user = await AuthSession.getLoggedUser();
      console.log('Usuário logado:', user);

      if (user) {
        setUsername(user.username);
        setEmail(user.email);
        setPassword(user.password);
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
      await AuthSession.setLoggedUser({ username, email, password });
      Alert.alert('Perfil atualizado com sucesso!');
      setEditUsername(false);
      setEditEmail(false);
      setEditPassword(false);
    }
  };

  const logout = async () => {
    await AuthSession.clearSession();
    router.replace('/(auth)/sign-in');
  };

  if (loading) {
    return (
      <View style={styles.scroll}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.scroll}
    >
      <View style={styles.card}>
        <Text style={styles.title}>RECAP</Text>
        <Text style={styles.subtitle}>Meu perfil</Text>

        {/* Nome de usuário */}
        <Text style={styles.label}>Nome de usuário</Text>
        <View style={styles.fieldRow}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            editable={editUsername}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setEditUsername(!editUsername)}>
            <PencilSimpleIcon color="#fff" size={20} />
          </TouchableOpacity>
        </View>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.fieldRow}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            editable={editEmail}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setEditEmail(!editEmail)}>
            <PencilSimpleIcon color="#fff" size={20} />
          </TouchableOpacity>
        </View>
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        {/* Senha */}
        <Text style={styles.label}>Senha</Text>
        <View style={styles.fieldRow}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={editPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setEditPassword(!editPassword)}>
            <PencilSimpleIcon color="#fff" size={20} />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

        {/* Botão salvar */}
        <TouchableOpacity onPress={validateAndSave} style={styles.saveButton}>
          <FloppyDiskIcon color="#fff" size={24} style={{ marginRight: 8 }} />
          <Text style={{ color: '#fff', fontSize: 16 }}>Salvar alterações</Text>
        </TouchableOpacity>

        {/* Botão logout */}
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <SignOutIcon color="#E50914" size={24} />
          <Text style={{ color: "#E50914", fontSize: 16, marginTop: 4 }}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 12,
    padding: 24,
    backgroundColor: "#121212",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  subtitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  error: {
    color: "#E50914",
    marginBottom: 16,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E50914",
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: "center",
    marginBottom: 24,
  },
  logoutButton: {
    alignItems: "center",
    marginTop: 8,
  },
});
