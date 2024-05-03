import React from "react";
import { StyleSheet, Text } from "react-native";

// アプリタイトル定義

const Title = () => {
  return <Text style={styles.title}>TagMo</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "russo-one",
  },
});

export default Title;