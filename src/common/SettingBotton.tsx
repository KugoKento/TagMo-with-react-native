import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button} from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

// 設定ボタン定義

const SettingButton = () => {
  return <Button 
  buttonStyle={{ backgroundColor: "#fff" }}
  style={styles.style}
  icon={
    <Ionicons
      name="settings-outline"
      size={100}
      color="black"
      type="solid"
    />
  }
/>;
};

const styles = StyleSheet.create({
  style: {
    backgroundColor: "white",
    // position: "absolute",
    marginTop: 100,
  },
});

export default SettingButton;