import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useFonts } from "expo-font";
// import Voice from 'react-native-voice';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DrawerActions } from '@react-navigation/native';
import { SquareButton } from '@/components/SquareButton';
import { TagMoHeader } from '@/components/TagMoHeader';


type ListItemProps = {
  title: string;
  distance: string;
};

const DATA: ListItemProps[] = [
  { title: '名古屋三交ビル', distance: '350m' },
  { title: 'セブンイレブン国際センター1号店', distance: '400m' },
  { title: 'すき家 名駅一丁目店', distance: '400m' },
  { title: '青果 石川', distance: '450m' },
  { title: 'Title', distance: 'Label' },
  { title: 'Title', distance: 'Label' },
  { title: 'Title', distance: 'Label' },
  { title: 'Title', distance: 'Label' },
  { title: 'Title', distance: 'Label' },
];

const ListItem: React.FC<ListItemProps> = ({ title, distance }) => (
  <View style={styles.listItem}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.distance}>{distance}</Text>
  </View>
);

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const [loaded] = useFonts({
    "russo-one": require("@/assets/fonts/Russo_One.ttf"),
  });

  if (!loaded) {
    return null; // フォントがロードされるまで何も表示しない
  }

  const onSpeechStart = () => {
    setIsListening(true);
  };

  const onSpeechEnd = () => {
    setIsListening(false);
  };

  const onSpeechResults = (event: any) => {
    setSearchText(event.value[0]);
  };

  const onSettingsPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      <TagMoHeader 
        hasLeftButton={false}
        hasRightButton={true} 
        rightFontAwesomeName={'bars'} 
        rightcolor={'black'} 
        onRightPress={onSettingsPress}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity /*onPress={startListening}*/>
          <FontAwesome name="microphone" size={20} color={isListening ? "red" : "#888"} style={styles.microphoneIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <ListItem title={item.title} distance={item.distance} />}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
      <View style={styles.footer}>
        <SquareButton
          color="red"
          iconName="shopping-cart"
          text="EC"
          nextScreen='Amount'
        />
        <SquareButton
          color="orange"
          iconName="commute"
          text="交通"
          nextScreen='Amount'
        />
        <SquareButton
          color="green"
          iconName="help-outline"
          text="その他"
          nextScreen='Amount'
        />
      </View>
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
  // listContainer: {
  //   flex: 2,
  //   // position: 'absolute',
  //   marginHorizontal: 5,
  //   marginVertical: 0,
  //   borderRadius: 10,
  //   borderWidth: 8,
  //   borderColor: '#D8D8D8',
  // },
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
  },
  title: {
    fontSize: 16,
  },
  distance: {
    color: '#888',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },

  // Amountのスタイル
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 4,
    backgroundColor: '#fff',
  },
  amountContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 40,
    backgroundColor: '#495B6D',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  currency: {
    color: '#fff',
    fontSize: 60,
    marginRight: 10,
  },
  amountInput: {
    color: '#fff',
    fontSize: 60,
    textAlign: 'center',
  },
});

export default Home;
