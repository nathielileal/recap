import React from 'react';
import { TextInput } from 'react-native';

export default function InputField({ ...props }) {
  return (
    <TextInput
      style={{
        backgroundColor: '#1E1E1E',
        color: '#fff',
        padding: 14,
        marginBottom: 16,
        borderRadius: 8,
        fontSize: 16,
      }}
      placeholderTextColor="#888"
      {...props}
    />
  );
}
