import * as ImagePicker from 'expo-image-picker';
import { CaretRightIcon, ImageSquareIcon, PencilSimpleIcon, SignOutIcon, UserIcon } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../../constants/colors';
import { ProfileModal } from '../../../components/Modal/Profile/ProfileModal';
import { useAuthContext } from '../../../context/AuthContext';
import { useProfileViewModel } from '../../../viewmodels/profile.viewlmodel';
import { styles } from '../Config.style';

export default function ProfilePage() {
  const { logout: contextLogout } = useAuthContext();
  const { username, modal, handleModal } = useProfileViewModel();
  const [image, setImage] = useState<string | null>(null);

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
    // await getReviews();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.image}>
              <ImageSquareIcon size={35} color={COLORS.secondary} />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={pickImage} style={styles.icon}>
          <PencilSimpleIcon color={COLORS.terciary} size={20} />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{username}</Text>

      <View style={styles.section}>
        <TouchableOpacity onPress={handleModal} style={[styles.btn, { backgroundColor: COLORS.primary }]}>
          <PencilSimpleIcon color={COLORS.terciary} size={20} />

          <Text style={styles.optionText}>Editar Perfil</Text>

          <CaretRightIcon color={COLORS.terciary} size={20} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLogout} style={[styles.btn, { backgroundColor: COLORS.secondary }]}>
          <UserIcon color={COLORS.terciary} size={20} />

          <Text style={styles.optionText}>Sair</Text>

          <SignOutIcon color={COLORS.terciary} size={20} />
        </TouchableOpacity>
      </View>

      {modal && (
        <ProfileModal id_user={"0"} onClosed={closeModal} ></ProfileModal>
      )}
    </View>
  );
}