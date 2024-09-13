import React, { useState, useEffect, useCallback, useContext } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { TagMoHeader } from "@/components/TagMoHeader";
import { useSQLiteContext } from "expo-sqlite";
import { LoadListContext } from "@/app/_layout";
import { HOME_VALUE } from "@/constants/appConstants";

type ListItemProps = {
  category: string;
  total_amount_each_category: string;
};

const colorCodes: string[] = [
  "#2c5f72",
  "#5b8ca1",
  "#8bbcd2",
  "#548ea6",
  "#85bed7",
  "#b7f1ff",
  "#f38c8d",
  "#ffbdbd",
  "#fff1f0",
  "#f2b8a2",
  "#ffead3",
  "#ffffff",
  "#f3d2b3",
  "#ffffe5",
  "#ffffff",
];

const colorLegendFont = "#7F7F7F";

const chartDataInitial = [
  {
    name: HOME_VALUE.CATEGORY.BUTTON_1.TEXT,
    population: 0,
    color: colorCodes[0],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.CATEGORY.BUTTON_2.TEXT,
    population: 0,
    color: colorCodes[1],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.CATEGORY.BUTTON_3.TEXT,
    population: 0,
    color: colorCodes[2],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.CATEGORY.BUTTON_4.TEXT,
    population: 0,
    color: colorCodes[3],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.CATEGORY.BUTTON_5.TEXT,
    population: 0,
    color: colorCodes[4],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.CATEGORY.BUTTON_6.TEXT,
    population: 0,
    color: colorCodes[5],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.CATEGORY.BUTTON_7.TEXT,
    population: 0,
    color: colorCodes[6],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.CATEGORY.BUTTON_8.TEXT,
    population: 0,
    color: colorCodes[7],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.CATEGORY.BUTTON_9.TEXT,
    population: 0,
    color: colorCodes[8],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.CATEGORY.BUTTON_10.TEXT,
    population: 0,
    color: colorCodes[9],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.CATEGORY.BUTTON_11.TEXT,
    population: 0,
    color: colorCodes[10],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.CATEGORY.BUTTON_12.TEXT,
    population: 0,
    color: colorCodes[11],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.CATEGORY.BUTTON_13.TEXT,
    population: 0,
    color: colorCodes[12],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.CATEGORY.BUTTON_14.TEXT,
    population: 0,
    color: colorCodes[13],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.CATEGORY.BUTTON_15.TEXT,
    population: 0,
    color: colorCodes[14],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
];

const screenWidth = Dimensions.get("window").width;

const ListItem: React.FC<ListItemProps> = ({ ...ListItemProps }) => (
  <View style={styles.listItem}>
    <Text style={styles.category} numberOfLines={1} ellipsizeMode="tail">
      {ListItemProps.category}
    </Text>
    <Text style={styles.amount} numberOfLines={1} ellipsizeMode="tail">
      ¥{ListItemProps.total_amount_each_category}
    </Text>
  </View>
);

const BalanceCategory: React.FC = () => {
  const [listData, setListData] = useState<ListItemProps[]>([]);
  const db = useSQLiteContext();
  const [refreshing, setRefreshing] = useState(false);
  const { loadList } = useContext(LoadListContext);
  const [chartData, setChartData] = useState(chartDataInitial);

  const renderItem = useCallback(
    ({ item }: { item: ListItemProps }) => (
      <ListItem
        category={item.category}
        total_amount_each_category={item.total_amount_each_category}
      />
    ),
    []
  );

  const formatNumberWithCommas = (value: string): string => {
    return Number(value).toLocaleString();
  };

  useEffect(() => {
    const fetchData = async (createChart: {
      (result: ListItemProps[]): void;
    }) => {
      try {
        const result = await db.getAllAsync<ListItemProps>(
          `
        SELECT 
          category, 
          SUM(amount) as total_amount_each_category
        FROM amount_list
        GROUP BY category
        ORDER BY total_amount_each_category DESC
        `
        );

        await createChart(result);

        // amount をカンマ区切りにフォーマット
        const formattedResult = await result.map((item) => ({
          ...item,
          total_amount_each_category: formatNumberWithCommas(
            item.total_amount_each_category
          ),
        }));

        await setListData(formattedResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const createChart = (result: ListItemProps[]): void => {
      let newChartData = [...chartDataInitial];

      //円グラフのためのデータ作成
      let sumAmount: number = 0;
      result.forEach((item) => {
        sumAmount += Number(item.total_amount_each_category);
      });
      result.forEach((item) => {
        const per: number = Math.floor(
          ((Number(item.total_amount_each_category) || 0) * 100) / sumAmount
        );
        const targetItem = newChartData.find(
          (targetItem) => targetItem.name === item.category
        );
        if (targetItem) {
          targetItem.population = per;
        }
        setChartData(newChartData);
      });
    };

    fetchData(createChart);
    setRefreshing(false);
  }, [refreshing, loadList]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chartBackground}>
        <PieChart
          data={chartData}
          width={screenWidth}
          height={260}
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
  chartBackground: {
    backgroundColor: "white",
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

export default BalanceCategory;
