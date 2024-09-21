import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useSQLiteContext } from "expo-sqlite";
import { LoadListContext } from "@/app/_layout";
import { HOME_VALUE } from "@/constants/appConstants";

//支払い手法は一元管理し、そこから利用する形にする

type ListItemProps = {
  payment_method: string;
  total_amount_each_method: string;
};

const colorCodes: string[] = [
  "#0e0e0e",
  "#0b1828",
  "#0d404c",
  "#157473",
  "#2f9d8d",
  "#61cab0",
  "#8ff7d2",
  "#bdffd1",
  "#ecffef",
];

const colorLegendFont = "#7F7F7F";

const chartDataInitial = [
  {
    name: HOME_VALUE.AMOUNT.BUTTON_1.TEXT,
    population: 0,
    color: colorCodes[0],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.AMOUNT.BUTTON_2.TEXT,
    population: 0,
    color: colorCodes[1],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.AMOUNT.BUTTON_3.TEXT,
    population: 0,
    color: colorCodes[2],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.AMOUNT.BUTTON_4.TEXT,
    population: 0,
    color: colorCodes[3],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.AMOUNT.BUTTON_5.TEXT,
    population: 0,
    color: colorCodes[4],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.AMOUNT.BUTTON_6.TEXT,
    population: 0,
    color: colorCodes[5],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.AMOUNT.BUTTON_7.TEXT,
    population: 0,
    color: colorCodes[6],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.AMOUNT.BUTTON_8.TEXT,
    population: 0,
    color: colorCodes[7],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
  {
    name: HOME_VALUE.AMOUNT.BUTTON_9.TEXT,
    population: 0,
    color: colorCodes[8],
    legendFontColor: colorLegendFont,
    legendFontSize: 15,
  },
];

const amountTransition: React.FC = () => {
  return <></>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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

export default amountTransition;
