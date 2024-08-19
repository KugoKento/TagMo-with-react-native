import React, { useState, useCallback, useEffect, useContext } from "react";
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
  FlatList,
  Button,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { SwipeListView } from "react-native-swipe-list-view";
import { TagMoHeader } from "@/components/TagMoHeader";
import { useSQLiteContext } from "expo-sqlite";
import { LoadListContext } from "@/app/_layout";
import DBApi from "@/services/database/DBApi";
import { COMMON_MESSAGE, HISTORY_MESSAGE } from "@/constants/message";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateSelecter } from "@/components/DateSelecter";

type ListItemProps = {
  id: string;
  transaction_date: Date;
  category: string;
  payment_location: string;
  payment_method: string;
  amount: string;
};

// 日付をyyyy-mm-dd形式に変換する関数
const formatDateToMyFormat = (dateTime: Date) => {
  const dateString = dateTime.toString();
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${month}/${day} ${hours}:${minutes}`;
};

const ListItem: React.FC<ListItemProps> = ({ ...ListItemProps }) => (
  <View style={styles.listItemFirst}>
    {/* <Text style={styles.category}>{category}</Text> */}
    <Text
      style={styles.transaction_date}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {formatDateToMyFormat(ListItemProps.transaction_date)}
    </Text>
    <View style={styles.listItemSecond}>
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
  </View>
);

const History: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [listData, setListData] = useState<ListItemProps[]>([]);
  const [refreshing, setRefreshing] = useState(false); //Historyリストを更新するフラグ
  const { loadList, setLoadList } = useContext(LoadListContext);
  const [dates, setDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const formatNumberWithCommas = (value: string): string => {
    return Number(value).toLocaleString();
  };

  useEffect(() => {
    async function setup() {
      try {
        // データベースからデータを取得
        const result: ListItemProps[] = await DBApi.getAmountList(
          dates.startDate,
          dates.endDate
        );
        // console.log();
        // console.log("DBに登録されている項目確認");
        // console.log(result);
        // console.log();
        // amount をカンマ区切りにフォーマット
        const formattedResult = result.map((item) => ({
          ...item,
          amount: formatNumberWithCommas(item.amount),
        }));
        // フォーマットされたデータをセット
        setListData(formattedResult);
        setRefreshing(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    setup(); // setup関数を呼び出して非同期処理を開始
  }, [refreshing, loadList, dates]); // `refreshing` または `loadList` が変わったときに実行される

  const deleteRow = (rowMap: { [id: string]: any }, id: string) => {
    Alert.alert(
      HISTORY_MESSAGE.BUTTON_DELETE.CLICK_START.HEADER,
      HISTORY_MESSAGE.BUTTON_DELETE.CLICK_START.MESSAGE,
      [
        {
          text: COMMON_MESSAGE.BUTTON.PATTERN_NO,
          onPress: () => {
            if (rowMap[id]) {
              rowMap[id].closeRow(); // スライドして削除ボタンが出ている項目を元に戻す
            }
          },
          style: "cancel",
        },
        {
          text: COMMON_MESSAGE.BUTTON.PATTERN_YES,
          onPress: async () => {
            // if (rowMap[rowKey]) {
            //   rowMap[rowKey].closeRow();
            // }
            // const newData = [...listData];
            // const prevIndex = listData.findIndex((item) => item.id === rowKey);
            // if (prevIndex >= 0) {
            //   setListHistory([...listHistory, listData]); // 現在の状態を操作履歴に追加
            //   newData.splice(prevIndex, 1);
            //   setListData(newData);
            // }
            // console.log();
            // console.log("listHistory確認");
            // console.log(listHistory);
            // console.log(listData);
            // console.log(prevIndex);
            // console.log(newData);
            // console.log();
            await DBApi.deleteAmountList(id);
            await setLoadList(!loadList);
            await Alert.alert(HISTORY_MESSAGE.BUTTON_DELETE.CLICK_END.MESSAGE);
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
        payment_method={""}
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
          <Text style={styles.backTextWhite}>
            {HISTORY_MESSAGE.BUTTON_DELETE.DISPLAY}
          </Text>
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

  const handleDatesChange = (startDate: Date | null, endDate: Date | null) => {
    setDates({ startDate, endDate });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TagMoHeader
        hasLeftButton={false}
        hasRightButton={false}
        // rightFontAwesomeName={"undo"}
        // rightcolor={"black"}
        // onRightPress={onCancelPress}
      />
      {/* <View style={styles.searchContainer}> */}
      {/* <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        /> */}
      {/* </View> */}
      <View>
        <DateSelecter onDatesChange={handleDatesChange} />
      </View>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
        }}
        rightOpenValue={-75}
        closeOnRowPress={true} // 行を押したときに自動的に閉じる
        closeOnRowOpen={true} // 他の行が開いたときに自動的に閉じる
        disableRightSwipe={true} // 右へのスワイプを無効化
        keyExtractor={(item) => item.id} // 一意のキーを指定
        style={styles.list}
        // ListEmptyComponent={
        //   <View style={styles.list}>
        //     <Text>No items available</Text>
        //   </View>
        // }
      />
      {/* <FlatList
          data={listData}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
          }}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        /> */}
    </SafeAreaView>
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
  listItemFirst: {
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  listItemSecond: {
    flexDirection: "row",
    paddingVertical: 5,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  transaction_date: {
    fontSize: 16,
  },

  payment_location: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left", // テキストを左寄せ
    flex: 3, // 幅を保つためにflexを使用
    marginLeft: 20, // 日付との間に幅を持たせる
  },

  amount: {
    fontSize: 16,
    flex: 1, // 幅を保つためにflexを使用
    textAlign: "right", // テキストを右寄せ
  },

  rowBack: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%", // 高さをリストアイテムに合わせる
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
