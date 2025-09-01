import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';

export default function WelcomePage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={{ flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
      <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 40 }}>
        Bem-vindo ao RECAP
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#E50914',
          paddingVertical: 14,
          paddingHorizontal: 32,
          borderRadius: 8,
          marginBottom: 16,
          width: '100%',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#333',
          paddingVertical: 14,
          paddingHorizontal: 32,
          borderRadius: 8,
          width: '100%',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Já tenho conta</Text>
      </TouchableOpacity>
    </View>
  );
}
