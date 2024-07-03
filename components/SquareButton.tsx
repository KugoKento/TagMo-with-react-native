import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons} from '@expo/vector-icons';
import {useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp } from '@react-navigation/native-stack';


type SquareButtonProps = {
  color:string;
  iconName:keyof typeof MaterialIcons.glyphMap;
  text:string;
  nextScreen:string;
}
export const SquareButton: React.FC<SquareButtonProps> = ({ color, iconName, text, nextScreen }) => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <TouchableOpacity
      style={[styles.squareButton, { borderColor: color }]}
      onPress={() => navigation.navigate(nextScreen)}
    >
      <MaterialIcons name={iconName} size={45} color={color} />
      <Text style={[styles.squareButtonText, { color }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  squareButton:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 122,
    height: 120,
    borderRadius: 10,
    borderWidth: 6,
  },
  squareButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
