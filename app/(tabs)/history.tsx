import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import { SwipeListView } from 'react-native-swipe-list-view';
import { TagMoHeader } from '@/components/TagMoHeader';

type ListItemProps = {
  id: string;
  category: string; // 'item' を 'category' に修正
  amount: string;
};

const initialData: ListItemProps[] = [
  { id: '1', category: '名古屋三交ビル', amount: '¥350' },
  { id: '2', category: 'セブンイレブン国際センター1号店', amount: '¥350' },
  { id: '3', category: 'すき家 名駅一丁目店', amount: '¥350' },
  { id: '4', category: '青果 石川', amount: '¥350' },
  { id: '5', category: 'Item', amount: 'Label' },
  { id: '6', category: 'Item', amount: 'Label' },
  { id: '7', category: 'Item', amount: 'Label' },
  { id: '8', category: 'Item', amount: 'Label' },
  { id: '9', category: 'Item', amount: 'Label' },
  { id: '10', category: 'Item', amount: 'Label' },
  { id: '11', category: 'Item', amount: 'Label' },
  { id: '12', category: 'Item', amount: 'Label' },
  { id: '13', category: 'Item', amount: 'Label' },
];

const ListItem: React.FC<ListItemProps> = ({ category, amount }) => (
  <View style={styles.listItem}>
    <Text style={styles.category}>{category}</Text>
    <Text style={styles.amount}>{amount}</Text>
  </View>
);

const History: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [listData, setListData] = useState(initialData);
  const [listHistory, setListHistory] = useState<ListItemProps[][]>([]);

  const [loaded] = useFonts({
    "russo-one": require("@/assets/fonts/Russo_One.ttf"),
  });

  if (!loaded) {
    return null; // フォントがロードされるまで何も表示しない
  }

  const onCancelPress = () => {
    if (listHistory.length > 0) {
      Alert.alert(
        '取り消し確認',
        '最後の操作を取り消しますか?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'OK',
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
      Alert.alert('取り消し', '操作履歴がありません。');
    }
  };

  const deleteRow = (rowMap: { [key: string]: any }, rowKey: string) => {
    Alert.alert(
      'リスト項目削除',
      'この項目を削除しますか？',
      [
        {
          text: 'No',
          onPress: () => {
            if (rowMap[rowKey]) {
              rowMap[rowKey].closeRow(); // スライドして削除ボタンが出ている項目を元に戻す
            }
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            if (rowMap[rowKey]) {
              rowMap[rowKey].closeRow();
            }
            const newData = [...listData];
            const prevIndex = listData.findIndex(item => item.id === rowKey);
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

  const renderItem = useCallback(({ item }: { item: ListItemProps }) => (
    <ListItem category={item.category} amount={item.amount} id={''} />
  ), []);

  const renderHiddenItem = useCallback((data: { item: ListItemProps }, rowMap: { [key: string]: any }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.id)}
      >
        <Text style={styles.backTextWhite}>削除</Text>
      </TouchableOpacity>
    </View>
  ), [deleteRow]);

  return (
    <SafeAreaView style={styles.container}>
      <TagMoHeader 
        hasLeftButton={false}
        hasRightButton={true} 
        rightFontAwesomeName={'undo'} 
        rightcolor={'black'} 
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
        closeOnRowOpen={true}  // 他の行が開いたときに自動的に閉じる
        disableRightSwipe={true} // 右へのスワイプを無効化
        keyExtractor={(item) => item.id} // 一意のキーを指定
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
  category: {
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
