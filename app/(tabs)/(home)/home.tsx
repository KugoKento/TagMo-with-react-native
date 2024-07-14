import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { SquareButton } from '@/components/SquareButton';
import { TagMoHeader } from '@/components/TagMoHeader';
import { createDrawerNavigator } from '@react-navigation/drawer';

const DATA = [
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

type ListItemProps = {
  title: string;
  distance: string;
};

const ListItem: React.FC<ListItemProps> = ({ title, distance }) => (
  <View style={styles.listItem}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.distance}>{distance}</Text>
  </View>
);

const Drawer = createDrawerNavigator();

const HomeMain: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

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

const HomeSettings: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const [loaded] = useFonts({
    "russo-one": require("@/assets/fonts/Russo_One.ttf"),
  });

  if (!loaded) {
    return null; // フォントがロードされるまで何も表示しない
  }

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

    </SafeAreaView>
  );
}

const Home: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="HomeMain" screenOptions={{
      drawerPosition: 'right', // ドロワーを右から開く設定
    }}>
      <Drawer.Screen name="Home" component={HomeMain} options={{ headerShown: false }}/>
      <Drawer.Screen name="Settings" component={HomeSettings} options={{ headerShown: false }}/>
    </Drawer.Navigator>
  );
}

export default Home;

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
});