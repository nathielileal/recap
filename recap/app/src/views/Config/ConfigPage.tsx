import React, { useMemo } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { CamLenseScreen } from '../../components/CamLenseScreen/CamLenseScreen';
import { FilterTabs } from '../../components/FilterTabs/FilterTabs';
import { useThemeContext } from '../../provider/ThemeProvider';
import { useProfileViewModel } from '../../viewmodels/profile.viewlmodel';
import { stylesheet } from "./Config.style";
import NotificationPage from './Notification/NotificationPage';
import ProfilePage from './Profile/ProfilePage';

export default function ConfigPage() {
  const { loading, filter, setFilter } = useProfileViewModel('');
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  if (loading) {
    return (
      <View style={styles.scroll}>
        <ActivityIndicator size="large" color={theme.terciary} />
      </View>
    );
  }

  return (
    <CamLenseScreen title='Configurações'>
      <View style={styles.card}>
        <FilterTabs firstOption="Meu perfil" secondOption="Notificações" filter={filter} setFilter={setFilter} />

        <ScrollView style={styles.innerScroll} showsVerticalScrollIndicator={true}>
          {filter === 'public' ? (<ProfilePage />) : (<NotificationPage />)}
        </ScrollView>
      </View>
    </CamLenseScreen>
  );
}