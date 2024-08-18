import React, { useState, useEffect, useCallback, useContext } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { TagMoHeader } from "@/components/TagMoHeader";
import { useSQLiteContext } from "expo-sqlite";
import { LoadListContext } from "@/app/_layout";

type ListItemProps = {
  category: string;
  total_amount: string;
};

const screenWidth = Dimensions.get("window").width;

const chartData = [
  {
    name: "Google",
    population: 30,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Apple",
    population: 30,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Microsoft",
    population: 15,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Samsung",
    population: 15,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Other",
    population: 10,
    color: "green",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

const ListItem: React.FC<ListItemProps> = ({ ...ListItemProps }) => (
  <View style={styles.listItem}>
    <Text style={styles.category} numberOfLines={1} ellipsizeMode="tail">
      {ListItemProps.category}
    </Text>
    <Text style={styles.amount} numberOfLines={1} ellipsizeMode="tail">
      ¥{ListItemProps.total_amount}
    </Text>
  </View>
);

const History: React.FC = () => {
  const [listData, setListData] = useState<ListItemProps[]>([]);
  const db = useSQLiteContext();
  const [refreshing, setRefreshing] = useState(false);
  const { loadList, setLoadList } = useContext(LoadListContext);

  const renderItem = useCallback(
    ({ item }: { item: ListItemProps }) => (
      <ListItem category={item.category} total_amount={item.total_amount} />
    ),
    []
  );

  const formatNumberWithCommas = (value: string): string => {
    return Number(value).toLocaleString();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await db.getAllAsync<ListItemProps>(
          `
        SELECT 
          category, 
          SUM(amount) as total_amount 
        FROM amount_list
        GROUP BY category
        ORDER BY total_amount DESC
        `
        );

        // amount をカンマ区切りにフォーマット
        const formattedResult = await result.map((item) => ({
          ...item,
          total_amount: formatNumberWithCommas(item.total_amount),
        }));

        await setListData(formattedResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setRefreshing(false);
    // console.log();
    // console.log("balanceがloadListの変更に反応しているか確認");
    // console.log(loadList);
    // console.log(listData);
    // console.log();
  }, [refreshing, loadList]);

  return (
    <SafeAreaView style={styles.container}>
      <TagMoHeader hasLeftButton={false} hasRightButton={false} />
      <View>
        <PieChart
          data={chartData}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
      <FlatList
        data={listData}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
        }}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
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
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left", // テキストを左寄せ
    flex: 1, // 幅を保つためにflexを使用
  },

  amount: {
    fontSize: 16,
    flex: 1, // 幅を保つためにflexを使用
    textAlign: "right", // テキストを左寄せ
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
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

  // Amountのスタイル
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 4,
    backgroundColor: "#fff",
  },
  amountContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 40,
    backgroundColor: "#495B6D",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  currency: {
    color: "#fff",
    fontSize: 60,
    marginRight: 10,
  },
  amountInput: {
    color: "#fff",
    fontSize: 60,
    textAlign: "center",
  },
});

export default History;
