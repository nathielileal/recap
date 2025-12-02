import { router, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { BookmarkSimpleIcon, CaretLeftIcon, CaretRightIcon, FilmStripIcon, HeartStraightIcon, PencilSimpleIcon, SignOutIcon, SwatchesIcon, UserIcon } from 'phosphor-react-native';
import React, { useCallback, useMemo } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ProfileModal } from '../../../components/Modal/Profile/ProfileModal';
import { useAuthContext } from '../../../context/AuthContext';
import { useThemeContext } from '../../../provider/ThemeProvider';
import { useProfileViewModel } from '../../../viewmodels/profile.viewlmodel';
import { stylesheet } from '../Config.style';
import icon from '../../../../../assets/images/icon.png';
import { getTimeAgo } from '../../../../../lib/utils';
import { CamLenseScreen } from '../../../components/CamLenseScreen/CamLenseScreen';

export default function ProfilePage() {
  const { id } = useLocalSearchParams();
  const { toggleTheme, theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);
  const { logout: contextLogout } = useAuthContext();
  const { user, modal, handleModal, following, followers, ratings, watchlist } = useProfileViewModel(id as string);

  const isCurrentUser = !id;

  const handleLogout = async () => {
    await contextLogout();
  };

  const closeModal = async () => {
    handleModal();
  };

  const Page = (<View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.icon}>
        <Image source={icon} style={styles.image} />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>@{user?.name ?? 'usuário'}</Text>
        <Text style={styles.details}>Criado {getTimeAgo(user?.createdAt) ?? 'agora'}</Text>

        <View style={styles.options}>
          <View style={styles.option}>
            <Text style={styles.follow}>Avaliações</Text>
            <Text style={styles.follows}>{ratings}</Text>
          </View>

          <View style={styles.option}>
            <Text style={styles.follow}>Watchlist</Text>
            <Text style={styles.follows}>{watchlist}</Text>
          </View>
        </View>

        <View style={styles.options}>
          <View style={styles.option}>
            <Text style={styles.follow}>Seguidores</Text>
            <Text style={styles.follows}>{followers}</Text>
          </View>

          <View style={styles.option}>
            <Text style={styles.follow}>Seguindo</Text>
            <Text style={styles.follows}>{following}</Text>
          </View>
        </View>
      </View>
    </View>

    <View style={styles.section}>
      {isCurrentUser && (
        <TouchableOpacity onPress={handleModal} style={[styles.btn, { backgroundColor: theme.primary }]}>
          <PencilSimpleIcon color={theme.terciary} size={20} />

          <Text style={styles.optionText}>Editar Perfil</Text>

          <CaretRightIcon color={theme.terciary} size={20} />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => router.push({ pathname: "/catalog", params: { type: "Favoritos" } })} style={[styles.btn, { backgroundColor: theme.primary }]}>
        <HeartStraightIcon color={theme.terciary} size={20} />

        <Text style={styles.optionText}>Favoritos</Text>

        <CaretRightIcon color={theme.terciary} size={20} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push({ pathname: "/catalog", params: { type: "Watchlist" } })} style={[styles.btn, { backgroundColor: theme.primary }]}>
        <BookmarkSimpleIcon color={theme.terciary} size={20} />

        <Text style={styles.optionText}>Watchlist</Text>

        <CaretRightIcon color={theme.terciary} size={20} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push({ pathname: "/catalog", params: { type: "Assistidos" } })} style={[styles.btn, { backgroundColor: theme.primary }]}>
        <FilmStripIcon color={theme.terciary} size={20} />

        <Text style={styles.optionText}>Assistidos</Text>

        <CaretRightIcon color={theme.terciary} size={20} />
      </TouchableOpacity>

      {isCurrentUser && (
        <TouchableOpacity onPress={handleLogout} style={[styles.btn, { backgroundColor: theme.secondary }]}>
          <UserIcon color={theme.terciary} size={20} />

          <Text style={styles.optionText}>Sair</Text>

          <SignOutIcon color={theme.terciary} size={20} />
        </TouchableOpacity>
      )}
    </View>

    {modal && (
      <ProfileModal userId={user?.id ?? ''} initialName={user?.name ?? ''} initialEmail={user?.email ?? ''} onClosed={closeModal} ></ProfileModal>
    )}
  </View>);

  if (!isCurrentUser) {
    return (
      <CamLenseScreen title="" paddingVertical={1} paddingHorizontal={1} header={
        <View style={styles.headerCam}>
          <View style={styles.headerItemLeft}>
            <TouchableOpacity onPress={() => router.back()} style={{ zIndex: 10 }}>
              <CaretLeftIcon color={theme.terciary} size={25} weight="thin" />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTitle}>Pefil</Text>

          <View style={styles.headerItemRight}>
            <TouchableOpacity onPress={toggleTheme}>
              <SwatchesIcon color={theme.terciary} size={25} weight="thin" />
            </TouchableOpacity>
          </View>
        </View>
      }>
        <View style={[styles.card, { padding: 20 }]}>
          <ScrollView style={styles.innerScroll} showsVerticalScrollIndicator={true}>
            {Page}
          </ScrollView>
        </View>
      </CamLenseScreen>
    );
  }

  return Page;
}