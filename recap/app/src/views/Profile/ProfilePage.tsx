import * as ImagePicker from 'expo-image-picker';
import { FloppyDiskIcon, PencilSimpleIcon, SignOutIcon } from 'phosphor-react-native';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
  } = useProfileViewModel();

  const [activeTab, setActiveTab] = useState<'perfil' | 'config'>('perfil');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  // Estado das streamings
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

  const windowHeight = Dimensions.get('window').height;
  const TAB_BAR_SAFE_AREA = 90;
  const CARD_VERTICAL_MARGIN = 48;
  const maxInnerScrollHeight = useMemo(() => {
    const available = windowHeight - TAB_BAR_SAFE_AREA - CARD_VERTICAL_MARGIN;
    return Math.max(300, Math.min(available, 1000));
  }, [windowHeight]);

  if (loading) {
    return (
      <View style={styles.scroll}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const toggleStreaming = (name: string) => {
    setStreamings(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.scroll}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.tabSelector}>
              <TouchableOpacity
                onPress={() => setActiveTab('perfil')}
                style={[styles.tabButton, activeTab === 'perfil' && styles.tabActive]}
              >
                <Text style={styles.tabText}>Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTab('config')}
                style={[styles.tabButton, activeTab === 'config' && styles.tabActive]}
              >
                <Text style={styles.tabText}>Configurações</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={{ maxHeight: maxInnerScrollHeight, width: '100%' }}
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={true}
            >
              {activeTab === 'perfil' ? (
                <>
                  <Text style={styles.subtitle}>Meu perfil</Text>

                  {/* Foto de Perfil */}
                  <Text style={styles.label}>Foto de Perfil</Text>
                  <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center', marginBottom: 16 }}>
                    {image ? (
                      <Image
                        source={{ uri: image }}
                        style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#E50914' }}
                      />
                    ) : (
                      <View
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 50,
                          borderWidth: 2,
                          borderColor: '#E50914',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ color: '#fff' }}>Selecionar</Text>
                      </View>
                    )}
                  </TouchableOpacity>

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

                  <TouchableOpacity onPress={validateAndSave} style={styles.saveButton}>
                    <FloppyDiskIcon color="#fff" size={24} style={{ marginRight: 8 }} />
                    <Text style={{ color: '#fff', fontSize: 16 }}>Salvar alterações</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <SignOutIcon color="#E50914" size={24} />
                    <Text style={{ color: "#E50914", fontSize: 16, marginTop: 4 }}>Sair da conta</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.subtitle}>Configurações</Text>

                  <Text style={styles.label}>Notificações</Text>
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

                  {/* Nova seção: Streamings */}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
