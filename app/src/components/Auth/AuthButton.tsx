import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function AuthButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#E50914',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
      }}
      onPress={onPress}
    >
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{label}</Text>
    </TouchableOpacity>
  );
}
