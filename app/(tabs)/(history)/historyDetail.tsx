/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext,  useState } from "react";
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
  Alert,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonHeader } from "@/components/header/CommonHeader";
import RNPickerSelect from "react-native-picker-select";
import { HOME_VALUE } from "@/constants/appConstants";
import { COMMON_MESSAGE } from "@/constants/message";
import DBApi from "@/services/database/DBApi";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { LoadListContext } from "@/app/_layout";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

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
  // const hours = String(date.getHours()).padStart(2, "0");
  // const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const formatNumberWithCommas = (value: string): string => {
  return Number(value).toLocaleString();
};

const HistoryDetail: React.FC = () => {
  const route = useRoute<RouteProp<RootParamList, "HistoryDetail">>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { loadList, setLoadList } = useContext(LoadListContext);
  const [formData, setFormData] = useState<RegisteredProps>({
    id: route.params.item.id,
    transaction_date: new Date(route.params.item.transaction_date), // デフォルトで現在の日付をセット
    payment_location: route.params.item.payment_location,
    category: route.params.item.category,
    payment_method: route.params.item.payment_method,
    amount: route.params.item.amount,
    memo: route.params.item.memo,
  });

  console.log("=== Transaction Form Data ===");
  console.log(
    "Transaction Date:",
    formData.transaction_date,
    "Is empty:",
    !formData.transaction_date,
  );
  console.log(
    "Payment Location:",
    formData.payment_location,
    "Is empty:",
    !formData.payment_location,
  );
  console.log("Category:", formData.category, "Is empty:", !formData.category);
  console.log(
    "Payment Method:",
    formData.payment_method,
    "Is empty:",
    !formData.payment_method,
  );
  console.log("Amount:", formData.amount, "Is empty:", !formData.amount);
  console.log("Memo:", formData.memo, "Is empty:", !formData.memo);
  console.log("=============================");

  console.log(route);

  const handleFieldChange = (field: keyof RegisteredProps, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const date = selectedDate || route.params.item.transaction_date;
    handleFieldChange("transaction_date", date);
  };

  const onUpdateHistory = async () => {
    Alert.alert(
      "入力内容の保存",
      "入力内容を保存しますか？",
      [
        {
          text: COMMON_MESSAGE.BUTTON.PATTERN_NO,
          style: "cancel",
        },
        {
          text: COMMON_MESSAGE.BUTTON.PATTERN_YES,
          onPress: async () => {
            await DBApi.updateAmountList(formData);
            await setLoadList(!loadList);
            await navigation.navigate("History");
            await Alert.alert("保存が完了しました");
          },
        },
      ],
      { cancelable: false },
    );
  };

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
          <DateTimePicker
            style={styles.inputDate}
            value={formData.transaction_date}
            mode="date"
            display="spinner"
            onChange={onChangeDate}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>金額:</Text>
          <TextInput
            style={styles.input}
            value={formData.amount}
            placeholder={formatNumberWithCommas(route.params.item.amount)}
            keyboardType="numeric"
            // placeholderTextColor="#888"
            onChangeText={(value) => handleFieldChange("amount", value)}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>カテゴリ:</Text>
          <RNPickerSelect
            items={[
              {
                label: HOME_VALUE.CATEGORY.BUTTON_1.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_1.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_2.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_2.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_3.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_3.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_4.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_4.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_5.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_5.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_6.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_6.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_7.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_7.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_8.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_8.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_9.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_9.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_10.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_10.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_11.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_11.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_12.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_12.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_13.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_13.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_14.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_14.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_15.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_15.TEXT,
              },
            ]}
            placeholder={{
              label: route.params.item.category,
              value: null,
              color: "#9EA0A4",
            }}
            style={{
              inputIOS: styles.input,
            }}
            value={formData.category}
            onValueChange={(value) => handleFieldChange("category", value)}
          />
        </View>
        <View style={styles.memoContainer}>
          <Text style={styles.label}>メモ:</Text>
          <TextInput
            style={styles.memoInput}
            value={formData.memo}
            placeholder="メモを入力"
            multiline
            placeholderTextColor="#888"
            onChangeText={(value) => handleFieldChange("memo", value)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={onUpdateHistory}
          >
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
    marginBottom: 4,
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
  },
  dateButton: {
    color: "#888",
    fontSize: 16,
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
  inputDate: {
    flex: 1,
    borderColor: "#E0E0E0", // 淡い灰色の枠線
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 0,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#F9F9F9",

    height: 100,
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
