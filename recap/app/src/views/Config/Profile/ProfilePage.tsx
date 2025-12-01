import { useRouter } from 'expo-router';
import { CaretRightIcon, ImageSquareIcon, PencilSimpleIcon, SignOutIcon, UserIcon, UserListIcon } from 'phosphor-react-native';
import React, { useMemo, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ProfileModal } from '../../../components/Modal/Profile/ProfileModal';
import { useAuthContext } from '../../../context/AuthContext';
import { useThemeContext } from '../../../provider/ThemeProvider';
import { useProfileViewModel } from '../../../viewmodels/profile.viewlmodel';
import { stylesheet } from '../Config.style';
import icon from '../../../../../assets/images/icon.png';
import { getTimeAgo } from '../../../../../lib/utils';

export default function ProfilePage() {
  const router = useRouter();
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);
  const { logout: contextLogout } = useAuthContext();
  const { user, modal, handleModal, following, followers } = useProfileViewModel();

  const handleLogout = async () => {
    await contextLogout();
  };

  const closeModal = async () => {
    handleModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Image source={icon} style={styles.image} />
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>@{user?.name ?? 'usuário'}</Text>
          <Text style={styles.details}>Criado {getTimeAgo(user?.createdAt) ?? 'agora'}</Text>

          <View style={styles.options}>
            <View style={styles.option}>
              <Text style={styles.follow}>Seguindo</Text>
              <Text style={styles.follows}>{following}</Text>
            </View>
           
            <View style={styles.option}>
              <Text style={styles.follow}>Seguidores</Text>
              <Text style={styles.follows}>{followers}</Text>
            </View>
          </View>

           <View style={styles.options}>
            <View style={styles.option}>
              <Text style={styles.follow}>Avaliações</Text>
              <Text style={styles.follows}>{following}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={handleModal} style={[styles.btn, { backgroundColor: theme.primary }]}>
          <PencilSimpleIcon color={theme.terciary} size={20} />

          <Text style={styles.optionText}>Editar Perfil</Text>

          <CaretRightIcon color={theme.terciary} size={20} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push({ pathname: "/catalog" })} style={[styles.btn, { backgroundColor: theme.primary }]}>
          <UserListIcon color={theme.terciary} size={20} />

          <Text style={styles.optionText}>Watchlist</Text>

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