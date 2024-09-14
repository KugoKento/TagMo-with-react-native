import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { COMMON_MESSAGE } from "@/constants/message";

type Props = {
  //ヘッダの左側のボタン設定
  hasLeftButton: boolean;
  leftFontAwesomeName?: React.ComponentProps<typeof FontAwesome>["name"];
  leftcolor?: string;
  onLeftPress?: () => void;
  //ヘッダの右側のボタン設定
  hasRightButton: boolean;
  rightFontAwesomeName?: React.ComponentProps<typeof FontAwesome>["name"];
  rightcolor?: string;
  onRightPress?: () => void;
};

export const AmountHeader: React.FC<Props> = ({
  hasLeftButton,
  leftFontAwesomeName,
  leftcolor,
  onLeftPress,
  hasRightButton,
  rightFontAwesomeName,
  rightcolor,
  onRightPress,
}) => {
  return (
    <View style={styles.header}>
      {hasLeftButton && (
        <TouchableOpacity onPress={onLeftPress} style={styles.leftButton}>
          <FontAwesome name={leftFontAwesomeName} size={28} color={leftcolor} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>金額/支払方法</Text>
      {hasRightButton && (
        <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
          <FontAwesome
            name={rightFontAwesomeName}
            size={28}
            color={rightcolor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: "bold",
    fontFamily: "meiryo",
  },
  leftButton: {
    position: "absolute",
    left: 16,
  },
  rightButton: {
    position: "absolute",
    right: 16,
  },
});
