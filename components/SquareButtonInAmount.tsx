import React from "react";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { registerShopList } from "@/services/api/ShopListApi";

type RegisteredProps = {
  transaction_date: Date;
  payment_location: string;
  category: string;
  payment_method: string;
  amount: string;
};

type SquareButtonProps = {
  color: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  text: string;
  nextScreen: string;
  doRegisterAmountFlag?: boolean;
  registeredProps?: RegisteredProps;
};

export const SquareButtonInAmount: React.FC<SquareButtonProps> = ({
  color,
  iconName,
  text,
  nextScreen,
  registeredProps,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handlePress = () => {
    navigation.navigate(nextScreen);
    //undefinedがありえるため避けた
    if (registeredProps === undefined) {
      return;
    }
    registeredProps.payment_method = text;
    console.log("DBに登録する項目");
    console.log(registeredProps);
    console.log("registeredProps : " + registeredProps);
    registerShopList(registeredProps);
    console.log("データベース登録が実行されているか確認");
    Alert.alert("入力完了", "入力が完了しました。");
  };
  return (
    <TouchableOpacity
      style={[styles.squareButton, { borderColor: color }]}
      onPress={handlePress}
    >
      <MaterialIcons name={iconName} size={45} color={color} />
      <Text style={[styles.squareButtonText, { color }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  squareButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 122,
    height: 120,
    borderRadius: 10,
    borderWidth: 6,
  },
  squareButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
