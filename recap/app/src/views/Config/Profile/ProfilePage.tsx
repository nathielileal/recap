import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { CaretRightIcon, ImageSquareIcon, PencilSimpleIcon, SignOutIcon, UserIcon, UserListIcon } from 'phosphor-react-native';
import React, { useMemo, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ProfileModal } from '../../../components/Modal/Profile/ProfileModal';
import { useAuthContext } from '../../../context/AuthContext';
import { useThemeContext } from '../../../provider/ThemeProvider';
import { useProfileViewModel } from '../../../viewmodels/profile.viewlmodel';
import { stylesheet } from '../Config.style';

export default function ProfilePage() {
  const router = useRouter();
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);
  const { logout: contextLogout } = useAuthContext();
  const { user, error, username, modal, handleModal, image, setImage } = useProfileViewModel();

  const handleLogout = async () => {
    await contextLogout();
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.warn("Erro ao selecionar imagem:", err);
    }
  };

  const closeModal = async () => {
    handleModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.image}>
              <ImageSquareIcon size={35} color={theme.secondary} />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={pickImage} style={styles.icon}>
          <PencilSimpleIcon color={theme.terciary} size={20} />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{user?.name ?? 'Nome de usuário'}</Text>

      <View style={styles.section}>
        <TouchableOpacity onPress={handleModal} style={[styles.btn, { backgroundColor: theme.primary }]}>
          <PencilSimpleIcon color={theme.terciary} size={20} />

          <Text style={styles.optionText}>Editar Perfil</Text>

          <CaretRightIcon color={theme.terciary} size={20} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push({ pathname: "/catalog"})} style={[styles.btn, { backgroundColor: theme.primary }]}>
          <UserListIcon color={theme.terciary} size={20} />

          <Text style={styles.optionText}>Ver catálogo pessoal</Text>

          <CaretRightIcon color={theme.terciary} size={20} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={[styles.btn, { backgroundColor: theme.secondary }]}>
          <UserIcon color={theme.terciary} size={20} />

          <Text style={styles.optionText}>Sair</Text>

          <SignOutIcon color={theme.terciary} size={20} />
        </TouchableOpacity>
      </View>

      {modal && (
        <ProfileModal userId={user?.id ?? ''} initialName={user?.name ?? ''} initialEmail={user?.email ?? ''} onClosed={closeModal} ></ProfileModal>
      )}
    </View>
  );
}