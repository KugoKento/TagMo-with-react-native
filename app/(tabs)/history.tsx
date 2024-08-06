import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { SwipeListView } from "react-native-swipe-list-view";
import { TagMoHeader } from "@/components/TagMoHeader";
import { useSQLiteContext } from "expo-sqlite";

type ListItemProps = {
  id: string;
  transaction_date: string;
  category: string;
  payment_location: string;
  amount: string;
};

// 日付をyyyy-mm-dd形式に変換する関数
const formatDateToMyFormat = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${month}/${day} ${hours}:${minutes}`;
};

const ListItem: React.FC<ListItemProps> = ({ ...ListItemProps }) => (
  <View style={styles.listItem}>
    {/* <Text style={styles.category}>{category}</Text> */}
    <Text
      style={styles.transaction_date}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {formatDateToMyFormat(ListItemProps.transaction_date)}
    </Text>
    <Text
      style={styles.payment_location}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {ListItemProps.payment_location}
    </Text>
    <Text style={styles.amount} numberOfLines={1} ellipsizeMode="tail">
      ¥{ListItemProps.amount}
    </Text>
  </View>
);

const History: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  const db = useSQLiteContext();
  const [listData, setListData] = useState<ListItemProps[]>([]);
  const [listHistory, setListHistory] = useState<ListItemProps[][]>([]);

  const formatNumberWithCommas = (value: string): string => {
    return Number(value).toLocaleString();
  };

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<ListItemProps>(
        "SELECT * FROM amount_list"
      );

      // amount をカンマ区切りにフォーマット
      const formattedResult = result.map((item) => ({
        ...item,
        amount: formatNumberWithCommas(item.amount),
      }));

      setListData(formattedResult);
      console.log("data in db:", result);
    }
    setup();
  }, []);

  const onCancelPress = () => {
    if (listHistory.length > 0) {
      Alert.alert(
        "取り消し確認",
        "最後の操作を取り消しますか?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              const previousState = listHistory[listHistory.length - 1];
              setListData(previousState);
              setListHistory(listHistory.slice(0, -1));
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("取り消し", "操作履歴がありません。");
    }
  };

  const deleteRow = (rowMap: { [key: string]: any }, rowKey: string) => {
    Alert.alert(
      "リスト項目削除",
      "この項目を削除しますか？",
      [
        {
          text: "No",
          onPress: () => {
            if (rowMap[rowKey]) {
              rowMap[rowKey].closeRow(); // スライドして削除ボタンが出ている項目を元に戻す
            }
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            if (rowMap[rowKey]) {
              rowMap[rowKey].closeRow();
            }
            const newData = [...listData];
            const prevIndex = listData.findIndex((item) => item.id === rowKey);
            if (prevIndex >= 0) {
              setListHistory([...listHistory, listData]); // 現在の状態を操作履歴に追加
              newData.splice(prevIndex, 1);
              setListData(newData);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = useCallback(
    ({ item }: { item: ListItemProps }) => (
      <ListItem
        transaction_date={item.transaction_date}
        amount={item.amount}
        payment_location={item.payment_location}
        id={""}
        category={""}
      />
    ),
    []
  );

  const renderHiddenItem = useCallback(
    (data: { item: ListItemProps }, rowMap: { [key: string]: any }) => (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => deleteRow(rowMap, data.item.id)}
        >
          <Text style={styles.backTextWhite}>削除</Text>
        </TouchableOpacity>
      </View>
    ),
    [deleteRow]
  );

  const handleTouchOutside = () => {
    Keyboard.dismiss(); // キーボードを閉じる
    // const result = db.getAllAsync<ListItemProps>(
    //   "SELECT * FROM amount_list WHERE payment_location = `%${searchText}%`"
    // );
    // setListData(await result);
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouchOutside}>
      <SafeAreaView style={styles.container}>
        <TagMoHeader
          hasLeftButton={false}
          hasRightButton={true}
          rightFontAwesomeName={"undo"}
          rightcolor={"black"}
          onRightPress={onCancelPress}
        />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <SwipeListView
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-75}
          closeOnRowPress={true} // 行を押したときに自動的に閉じる
          closeOnRowOpen={true} // 他の行が開いたときに自動的に閉じる
          disableRightSwipe={true} // 右へのスワイプを無効化
          keyExtractor={(item) => item.id} // 一意のキーを指定
          style={styles.list}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  microphoneIcon: {
    marginLeft: 10,
  },
  list: {
    flex: 1,
    marginHorizontal: 16,
  },
  listItem: {
    flexDirection: "row",

    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },

  transaction_date: {
    fontSize: 16,
  },

  payment_location: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left", // テキストを左寄せ
    flex: 1, // 幅を保つためにflexを使用
    marginLeft: 50, // 日付との間に幅を持たせる
  },

  amount: {
    fontSize: 16,
    flex: 1, // 幅を保つためにflexを使用
    textAlign: "right", // テキストを左寄せ
  },

  rowBack: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 15,
    paddingRight: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
  backTextWhite: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default History;
