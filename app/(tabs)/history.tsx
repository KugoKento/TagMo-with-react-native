import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import { SwipeListView } from 'react-native-swipe-list-view';

type ListItemProps = {
  item: string;
  amount: string;
};

const initialData: ListItemProps[] = [
  { item: '名古屋三交ビル', amount: '¥350' },
  { item: 'セブンイレブン国際センター1号店', amount: '¥350' },
  { item: 'すき家 名駅一丁目店', amount: '¥350' },
  { item: '青果 石川', amount: '¥350' },
  { item: 'Item', amount: 'Label' },
  { item: 'Item', amount: 'Label' },
  { item: 'Item', amount: 'Label' },
  { item: 'Item', amount: 'Label' },
  { item: 'Item', amount: 'Label' },
  { item: 'Item', amount: 'Label' },
  { item: 'Item', amount: 'Label' },
  { item: 'Item', amount: 'Label' },
  { item: 'Item', amount: 'Label' },
  { item: 'Item', amount: 'Label' },
];

const ListItem: React.FC<ListItemProps> = ({ item, amount }) => (
  <View style={styles.listItem}>
    <Text style={styles.item}>{item}</Text>
    <Text style={styles.amount}>{amount}</Text>
  </View>
);

const History: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [listData, setListData] = useState(initialData);

  const [loaded] = useFonts({
    "russo-one": require("@/assets/fonts/Russo_One.ttf"),
  });

  if (!loaded) {
    return null; // フォントがロードされるまで何も表示しない
  }

  const onSettingsPress = () => {
    Alert.alert(
      '取り消し',
      '今までの操作を取り消しますか?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'OK', onPress: () => setListData(initialData) },
      ],
      { cancelable: false }
    );
  };

  const deleteRow = (rowMap: { [key: string]: any }, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.item === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const renderItem = useCallback((data: { item: ListItemProps }) => (
    <ListItem item={data.item.item} amount={data.item.amount} />
  ), []);

  const renderHiddenItem = useCallback((data: { item: ListItemProps }, rowMap: { [key: string]: any }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.item)}
      >
        <Text style={styles.backTextWhite}>削除</Text>
      </TouchableOpacity>
    </View>
  ), [deleteRow]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TagMo</Text>
        <TouchableOpacity onPress={onSettingsPress} style={styles.settingsIconContainer}>
          <FontAwesome name="undo" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity>
          <FontAwesome name="microphone" size={20} color={isListening ? "red" : "#888"} style={styles.microphoneIcon} />
        </TouchableOpacity>
      </View>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        closeOnRowPress={true} // 行を押したときに自動的に閉じる
        closeOnRowOpen={true}  // 他の行が開いたときに自動的に閉じる
        disableRightSwipe={true} // 右へのスワイプを無効化
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: "russo-one",
  },
  settingsIconContainer: {
    position: 'absolute',
    right: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    borderWidth: 1,
    borderColor: '#ccc',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  item: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 15,
    paddingRight: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default History;
