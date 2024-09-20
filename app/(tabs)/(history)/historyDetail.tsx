import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StatusBar,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HistoryDetailHeader } from "@/components/HistoryDetailHeader";

type RootParamList = {
  History: undefined;
  HistoryDetail: { registerItems: RegisteredProps };
};

type RegisteredProps = {
  id: string;
  transaction_date: Date;
  payment_location: string;
  category: string;
  payment_method: string;
  amount: string;
  memo: string;
};

const formatDateToMyFormat = (dateTime: Date) => {
  const dateString = dateTime.toString();
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

const HistoryDetail: React.FC = ({ navigation }: any) => {
  const route = useRoute<RouteProp<RootParamList, "HistoryDetail">>();
  const [registeredProps, setRegisteredProps] = useState<RegisteredProps>({
    id: route.params?.registerItems?.id ?? "",
    transaction_date:
      route.params?.registerItems?.transaction_date ?? new Date(),
    payment_location: route.params?.registerItems?.payment_location ?? "",
    category: route.params?.registerItems?.category ?? "",
    payment_method: route.params?.registerItems?.payment_method ?? "",
    amount: route.params?.registerItems?.amount ?? "",
    memo: "",
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <HistoryDetailHeader
          hasLeftButton={true}
          hasRightButton={false}
          leftFontAwesomeName={"chevron-left"}
          leftcolor={"black"}
          onLeftPress={() => navigation.goBack()}
        />
        {/* <View style={styles.inputContainer}> */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>日付</Text>
          <TextInput
            style={styles.input}
            // value={formatDateToMyFormat(registeredProps.transaction_date)}
            placeholder={formatDateToMyFormat(registeredProps.transaction_date)}
            // editable={false} // 日付は編集不可
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>金額</Text>
          <TextInput
            style={styles.input}
            value={registeredProps.amount}
            placeholder={registeredProps.amount}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>カテゴリ:</Text>
          <TextInput
            style={styles.input}
            value={registeredProps.category}
            placeholder={registeredProps.category}
          />
        </View>
        <View style={styles.memoContainer}>
          <Text style={styles.label}>メモ:</Text>
          <TextInput
            style={styles.memoInput}
            value={registeredProps.memo}
            placeholder="メモを入力"
            multiline
          />
        </View>
        {/* ボタンを下部に配置 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.saveButton]}>
            <Text style={styles.buttonText}>保存</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]}>
            <Text style={styles.buttonText}>削除</Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 16,
  },
  inputContainer: {
    paddingVertical: 10,
  },
  inner: {
    flex: 1,
    justifyContent: "space-between", // 上下に要素を配置し、ボタンを下に配置
  },
  inputRow: {
    flexDirection: "row", // 横並び
    alignItems: "center", // 垂直方向で中央揃え
    marginBottom: 8,
  },
  label: {
    fontSize: 18,
    width: 80, // ラベルの固定幅
    color: "#333",
  },
  input: {
    flex: 1, // 入力フィールドが横幅いっぱいに広がる
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  memoContainer: {
    flex: 1, // メモ欄に残りの高さを割り当てる
  },
  memoInput: {
    flex: 1, // メモ欄が最大限の高さを取る
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
    textAlignVertical: "top",
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: "#4CAF50", // 保存ボタンの背景色
  },
  deleteButton: {
    backgroundColor: "#F44336", // 削除ボタンの背景色
  },
});

export default HistoryDetail;
