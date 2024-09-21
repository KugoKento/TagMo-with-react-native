import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CommonHeader } from "@/components/header/CommonHeader";

type RootParamList = {
  History: undefined;
  HistoryDetail: { item: RegisteredProps };
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

const formatNumberWithCommas = (value: string): string => {
  return Number(value).toLocaleString();
};

const HistoryDetail: React.FC = ({ navigation }: any) => {
  const route = useRoute<RouteProp<RootParamList, "HistoryDetail">>();
  // const [registeredProps, setRegisteredProps] = useState<RegisteredProps>({
  //   id: route.params?.item?.id ?? "",
  //   transaction_date: route.params?.item?.transaction_date ?? new Date(),
  //   payment_location: route.params?.item?.payment_location ?? "",
  //   category: route.params?.item?.category ?? "",
  //   payment_method: route.params?.item?.payment_method ?? "",
  //   amount: route.params?.item?.amount ?? "",
  //   memo: "",
  // });

  // const [registeredProps, setRegisteredProps] = useState<RegisteredProps>({
  //   id: "",
  //   transaction_date: new Date(),
  //   payment_location: "",
  //   category: "",
  //   payment_method: "",
  //   amount: "",
  //   memo: "",
  // });

  const [id, setId] = useState<string>("");
  const [transactionDate, setTransactionDate] = useState<Date>(new Date());
  const [paymentLocation, setPaymentLocation] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [memo, setMemo] = useState<string>("");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <CommonHeader
          title={"項目詳細"}
          hasLeftButton={true}
          hasRightButton={false}
          leftFontAwesomeName={"chevron-left"}
          leftcolor={"black"}
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.inputRow}>
          <Text style={styles.label}>日付:</Text>
          <TextInput
            style={styles.input}
            value={amount}
            placeholder={formatDateToMyFormat(
              route.params.item.transaction_date,
            )}
            keyboardType="numeric"
            placeholderTextColor="#888"
            onChangeText={setAmount}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>金額:</Text>
          <TextInput
            style={styles.input}
            value={amount}
            placeholder={route.params.item.amount}
            keyboardType="numeric"
            placeholderTextColor="#888"
            onChangeText={setAmount}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>カテゴリ:</Text>
          <TextInput
            style={styles.input}
            value={category}
            placeholder={route.params.item.category}
            placeholderTextColor="#888"
            onChangeText={setCategory}
          />
        </View>
        <View style={styles.memoContainer}>
          <Text style={styles.label}>メモ:</Text>
          <TextInput
            style={styles.memoInput}
            value={memo}
            placeholder="メモを入力"
            multiline
            placeholderTextColor="#888"
            onChangeText={setMemo}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.saveButton]}>
            <Text style={styles.buttonText}>保存</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]}>
            <Text style={styles.buttonText}>削除</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF", // 背景を白に
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
  },
  label: {
    fontSize: 18,
    width: 80,
    color: "#333",
    fontWeight: "bold", // ラベルを太字に
  },
  input: {
    flex: 1,
    borderColor: "#E0E0E0", // 淡い灰色の枠線
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
  },
  memoContainer: {
    flex: 1,
    marginTop: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
  },
  memoInput: {
    flex: 1,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlignVertical: "top",
    backgroundColor: "#F9F9F9",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#4CAF50", // 保存ボタンを緑に
  },
  deleteButton: {
    backgroundColor: "#F44336", // 削除ボタンを赤に
  },
});

export default HistoryDetail;
