import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { TagMoHeader } from '@/components/TagMoHeader';

type SendIdButtonProps = {
  title:string;
  onPress: () => void;
}

export const SendIdButton: React.FC<SendIdButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => {onPress}}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: '70%',  // ボタンの幅を100%に設定
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
