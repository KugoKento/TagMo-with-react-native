import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useFonts } from "expo-font";
// import Voice from 'react-native-voice';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

const Home: React.FC = ({navigation}:any) => {
  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(false);

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
    Alert.alert('Settings', 'Settings button pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TagMo</Text>
        <TouchableOpacity onPress={onSettingsPress} style={styles.settingsIconContainer}>
          <FontAwesome name="gear" size={28} color="black" />
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
        <TouchableOpacity style={[styles.footerRedButton, styles.button]} onPress={() => navigation.navigate('Amount')}>
          <MaterialIcons name="shopping-cart" size={50} color="red" />
          <Text style={styles.footerRedButtonText}>EC</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.footerOrangeButton, styles.button]} onPress={() => navigation.navigate('Amount')}>
          <MaterialIcons name="commute" size={50} color="orange" />
          <Text style={styles.footerOrangeButtonText}>交通</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.footerGreenButton, styles.button]} onPress={() => navigation.navigate('Amount')}>
          <MaterialIcons name="help-outline" size={50} color="green" />
          <Text style={styles.footerGreenButtonText}>その他</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Amount = ({navigation}:any) => {
  
  const [amount, setAmount] = useState('');

  const handleChange = (text:any) => {
    // 数字と小数点のみ許可する正規表現
    const formattedText = text.replace(/[^0-9.]/g, '');
    setAmount(formattedText);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backIcon}>
            <FontAwesome name="chevron-left" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>TagMo</Text>
          {/* <TouchableOpacity onPress={onSettingsPress} style={styles.settingsIconContainer}>
            <FontAwesome name="gear" size={28} color="black" />
          </TouchableOpacity> */}
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.currency}>¥</Text>
            <TextInput
              style={styles.amountInput}
              keyboardType="numeric"
              placeholder="000000"
              value={amount}
              onChangeText={handleChange}
            />
          
        </View>
        {/* <FlatList
          data={DATA}
          renderItem={({ item }) => <ListItem title={item.title} distance={item.distance} />}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        /> */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.footerRedButton, styles.button]} onPress={() => navigation.navigate('Amount')}>
            <MaterialIcons name="shopping-cart" size={50} color="red" />
            <Text style={styles.footerRedButtonText}>EC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footerOrangeButton, styles.button]}>
            <MaterialIcons name="commute" size={50} color="orange" />
            <Text style={styles.footerOrangeButtonText}>交通</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footerGreenButton, styles.button]}>
            <MaterialIcons name="help-outline" size={50} color="green" />
            <Text style={styles.footerGreenButtonText}>その他</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.footerRedButton, styles.button]} onPress={() => navigation.navigate('Amount')}>
            <MaterialIcons name="shopping-cart" size={50} color="red" />
            <Text style={styles.footerRedButtonText}>EC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footerOrangeButton, styles.button]}>
            <MaterialIcons name="commute" size={50} color="orange" />
            <Text style={styles.footerOrangeButtonText}>交通</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footerGreenButton, styles.button]}>
            <MaterialIcons name="help-outline" size={50} color="green" />
            <Text style={styles.footerGreenButtonText}>その他</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.footerRedButton, styles.button]} onPress={() => navigation.navigate('Amount')}>
            <MaterialIcons name="shopping-cart" size={50} color="red" />
            <Text style={styles.footerRedButtonText}>EC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footerOrangeButton, styles.button]} onPress={() => navigation.navigate('Amount')}>
            <MaterialIcons name="commute" size={50} color="orange" />
            <Text style={styles.footerOrangeButtonText}>交通</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footerGreenButton, styles.button]} onPress={() => navigation.navigate('Amount')}>
            <MaterialIcons name="help-outline" size={50} color="green" />
            <Text style={styles.footerGreenButtonText}>その他</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer  independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Amount" component={Amount} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
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
  backIcon: {
    position: 'absolute',
    left: 20,
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
  footerRedButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 122,
    height: 120,
    borderRadius: 10,
    borderColor: 'red',
    borderWidth: 8,
  },
  footerOrangeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 122,
    height: 120,
    borderRadius: 10,
    borderColor: 'orange',
    borderWidth: 8,
  },
  footerGreenButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 122,
    height: 120,
    borderRadius: 10,
    borderColor: 'green',
    borderWidth: 8,
  },
  button: {
    backgroundColor: 'white',
  },
  footerRedButtonText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerOrangeButtonText: {
    color: 'orange',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerGreenButtonText: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
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
    backgroundColor: '#4A5A6A',
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

export default App;
