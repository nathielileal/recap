import * as ImagePicker from 'expo-image-picker';
import { FilePlusIcon, FloppyDiskIcon, PencilSimpleIcon, SignOutIcon } from 'phosphor-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../constants/colors';
import { CamLenseScreen } from '../../components/CamLenseScreen/CamLenseScreen';
import { FilterTabs } from '../../components/FilterTabs/FilterTabs';
import { useAuthContext } from '../../context/AuthContext';
import { useProfileViewModel } from '../../viewmodels//profile.viewlmodel';
import { styles } from "./Profile.style";

const STREAMINGS = [
  "Netflix",
  "Prime Video",
  "Disney+",
  "HBO Max",
  "Hulu",
  "Apple TV+",
  "Paramount+",
];

export default function ProfilePage() {
  const { logout: contextLogout } = useAuthContext();
  const { loading, username, setUsername, email, setEmail, password, setPassword, editUsername, setEditUsername, editEmail, setEditEmail, editPassword, setEditPassword, emailError, passwordError, validateAndSave, filter, setFilter } = useProfileViewModel();
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const [streamings, setStreamings] = useState<Record<string, boolean>>(
    STREAMINGS.reduce((acc, s) => ({ ...acc, [s]: false }), {})
  );

  const handleLogout = async () => {
    await contextLogout();
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
   
    if (status !== 'granted') {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  if (loading) {
    return (
      <View style={styles.scroll}>
        <ActivityIndicator size="large" color={COLORS.terciary} />
      </View>
    );
  }

  const toggleStreaming = (name: string) => {
    setStreamings(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <CamLenseScreen title='Configurações'>
      <View style={styles.card}>
        <FilterTabs firstOption="Meu perfil" secondOption="Notificações" filter={filter} setFilter={setFilter} />

        <ScrollView style={styles.innerScroll} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={true}>
          {filter === 'public' ? (
            <View>
              <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center', marginBottom: 16 }}>
                {image ? (
                  <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#E50914' }} />
                ) : (
                  <View style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#E50914', alignItems: 'center', justifyContent: 'center' }}>
                    <FilePlusIcon color={COLORS.terciary} size={30} weight='light'/>
                  </View>
                )}
              </TouchableOpacity>

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

              <TouchableOpacity onPress={validateAndSave} style={styles.saveButton}>
                <FloppyDiskIcon color="#fff" size={24} style={{ marginRight: 8 }} />
                <Text style={{ color: '#fff', fontSize: 16 }}>Salvar alterações</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <SignOutIcon color="#E50914" size={24} />
                <Text style={{ color: "#E50914", fontSize: 16, marginTop: 4 }}>Sair da conta</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.configRow}>
                <Text style={styles.configText}>Receber por e-mail</Text>
                <Switch
                  value={notifEmail}
                  onValueChange={setNotifEmail}
                  thumbColor={notifEmail ? "#E50914" : "#ccc"}
                />
              </View>

              <View style={styles.configRow}>
                <Text style={styles.configText}>Notificações push</Text>
                <Switch
                  value={notifPush}
                  onValueChange={setNotifPush}
                  thumbColor={notifPush ? "#E50914" : "#ccc"}
                />
              </View>

              <Text style={[styles.label, { marginTop: 20 }]}>Minhas Streamings</Text>
              {STREAMINGS.map((s) => (
                <View key={s} style={styles.configRow}>
                  <Text style={styles.configText}>{s}</Text>
                  <Switch
                    value={streamings[s]}
                    onValueChange={() => toggleStreaming(s)}
                    thumbColor={streamings[s] ? "#E50914" : "#ccc"}
                  />
                </View>
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </CamLenseScreen>
  );
}