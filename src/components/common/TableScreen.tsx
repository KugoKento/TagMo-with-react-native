import React from "react";
import { StyleSheet, FlatList, SafeAreaView, TouchableHighlight, View, Text } from "react-native";

// 位置情報リスト定義

const locationList = [
  { id: "0", name: "名古屋三交ビル" },
  { id: "1", name: "セブンイレブン国際センター1号店" },
  { id: "2", name: "すき家 名駅一丁目店" },
  { id: "3", name: "青果 石川" },
  { id: "4", name: "名古屋三交ビル" },
  { id: "5", name: "セブンイレブン国際センター1号店" },
  { id: "6", name: "すき家 名駅一丁目店" },
  { id: "7", name: "青果 石川" },
  { id: "8", name: "名古屋三交ビル" },
  { id: "9", name: "セブンイレブン国際センター1号店" },
  { id: "10", name: "すき家 名駅一丁目店" },
  { id: "11", name: "青果 石川" },
  { id: "12", name: "名古屋三交ビル" },
  { id: "13", name: "セブンイレブン国際センター1号店" },
  { id: "14", name: "すき家 名駅一丁目店" },
  { id: "15", name: "青果 石川" },
];

const TableScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={locationList}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() => console.log("pushed")}
            underlayColor={"#808080"}
          >
            <View style={styles.listItem}>
              <Text style={styles.listTitle}>{item.name}</Text>
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={(locationList) => locationList.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container:{
      width:'80%',
      height:'55%'
    },
    listItem:{
      padding:8,
      borderBottomWidth:1,
      borderBottomColor:'#ddd',
      backgroundColor:'#fff'
    },
    listTitle:{
      fontSize:18,
    }
   });

export default TableScreen;
