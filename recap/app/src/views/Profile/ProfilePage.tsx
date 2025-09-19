import { FloppyDiskIcon, PencilSimpleIcon, SignOutIcon } from 'phosphor-react-native';
import React from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuthContext } from '../../context/AuthContext';
import { useProfileViewModel } from '../../viewmodels/profile.viewlmodel';
import { styles } from "./Profile.style";

export default function ProfilePage() {
  const { logout: contextLogout } = useAuthContext();
  const {
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
  } = useProfileViewModel();

  const handleLogout = async () => {
    await contextLogout();
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
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <SignOutIcon color="#E50914" size={24} />
          <Text style={{ color: "#E50914", fontSize: 16, marginTop: 4 }}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}