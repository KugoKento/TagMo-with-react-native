import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { TagMoHeader } from "@/components/TagMoHeader";
import { useSQLiteContext } from "expo-sqlite";

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
    <Text style={styles.category}>{ListItemProps.category}</Text>
    <Text style={styles.total_amount}>¥{ListItemProps.total_amount}</Text>
  </View>
);

const History: React.FC = () => {
  const [listData, setListData] = useState<ListItemProps[]>([]);
  const db = useSQLiteContext();

  const renderItem = useCallback(
    ({ item }: { item: ListItemProps }) => (
      <ListItem category={item.category} total_amount={item.total_amount} />
    ),
    []
  );

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
        setListData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [db]);

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
  },
  total_amount: {
    fontSize: 16,
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
