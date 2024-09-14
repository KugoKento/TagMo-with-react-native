import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { TagMoHeader } from "@/components/TagMoHeader";
import { LoadListContext } from "@/app/_layout";
import DBApi from "@/services/database/DBApi";
import { COMMON_MESSAGE, HISTORY_MESSAGE } from "@/constants/message";
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
  return `${year}/${month}/${day} ${hours}:${minutes}`;
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
  // const [searchText, setSearchText] = useState("");
  const [listData, setListData] = useState<ListItemProps[]>([]);
  const [totalAmount, setTotalAmount] = useState("0");
  const [refreshing, setRefreshing] = useState(false); //Historyリストを更新するフラグ
  const { loadList, setLoadList } = useContext(LoadListContext);
  const [dates, setDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

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

        const sumAmount = (result: ListItemProps[]) => {
          const sum: number = result.reduce(
            (sum, item) => sum + Number(item.amount),
            0
          );
          return sum.toString();
        };

        // フォーマットされたデータをセット
        setListData(formattedResult);
        setTotalAmount(sumAmount(result));
        setRefreshing(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    setup(); // setup関数を呼び出して非同期処理を開始
  }, [refreshing, loadList, dates]); // `refreshing` または `loadList` が変わったときに実行される

  const formatNumberWithCommas = (value: string): string => {
    return Number(value).toLocaleString();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deleteRow = (rowMap: { [id: string]: any }, id: string): void => {
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
            await DBApi.deleteAmountList(id);
            setLoadList(!loadList);
            Alert.alert(HISTORY_MESSAGE.BUTTON_DELETE.CLICK_END.MESSAGE);
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
      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmountLabel}>合計金額：</Text>
        <Text
          style={styles.totalAmountText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          ¥ {formatNumberWithCommas(totalAmount)}
        </Text>
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
        // disableRightSwipe={true} // 右へのスワイプを無効化
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
  totalAmountContainer: {
    marginVertical: 10,
    marginHorizontal: 16,
    flexDirection: "row", // 横方向にアイテムを配置
    justifyContent: "space-between", // スペースを均等に配置
    alignItems: "center", // 垂直方向に中央揃え
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: "black", // 下線のスタイルを追加
    overflow: "hidden", // はみ出る部分を隠す
  },
  totalAmountLabel: {
    flex: 2, // ラベルの幅を少し狭くする
    fontSize: 20, // ラベルの文字サイズを大きくする
    fontWeight: "bold",
    color: "#333",
    textAlign: "left", // テキストを左寄せ
  },
  totalAmountText: {
    flex: 4, // 金額の幅を広くする
    fontSize: 30, // 金額の文字をさらに大きくする
    fontWeight: "bold",
    color: "#333",
    textAlign: "right", // テキストを右寄せ
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
