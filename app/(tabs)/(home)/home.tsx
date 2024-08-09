import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import { SquareButton } from "@/components/SquareButton";
import { TagMoHeader } from "@/components/TagMoHeader";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RectangleButton } from "@/components/RectangleButton";
import { router } from "expo-router";
import getShopList from "@/services/api/shopListApi";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import ReactLoading from "react-loading";

type ListItemProps = {
  shopName: string;
  shopLocationName: string;
  distance: number;
};

const ListItem: React.FC<ListItemProps> = ({ ...ListItemProps }) => (
  <View style={styles.listItem}>
    <Text style={styles.shopName}>{ListItemProps.shopName}</Text>
    <Text style={styles.shopLocationName}>
      {ListItemProps.shopLocationName}
    </Text>
    <Text style={styles.distance}>{ListItemProps.distance}m</Text>
  </View>
);

const Drawer = createDrawerNavigator();

const handlePress = () => {
  Alert.alert(
    "ログアウト",
    "ログアウトしますか？",
    [
      {
        text: "No",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          router.replace("/auth/login");
        },
      },
    ],
    { cancelable: false }
  );
};

const HomeMain: React.FC = () => {
  console.log("HomeMainが呼び出されてるか確認");
  const [searchText, setSearchText] = useState("");
  const [shopList, setShopList] = useState<ListItemProps[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const { currentLocation, error } = useCurrentLocation();
  const navigation = useNavigation();

  useEffect(() => {
    setIsloading(true);
    console.log("isLoading：" + isLoading);
    console.log("useEffectが呼び出されてるか確認");
    const fetchShops = async () => {
      console.log("fetchShopsが呼び出されてるか確認");
      if (currentLocation.latitude && currentLocation.longitude) {
        console.log("現在地緯度経度確認");
        console.log(currentLocation.latitude);
        console.log(currentLocation.longitude);
        const list = await getShopList(searchText, currentLocation);
        console.log("APIデバッグ用", list); // デバッグ用ログ
        setShopList(list);
        setIsloading(false);
      }
    };

    fetchShops();
  }, [searchText, currentLocation]);

  const handleTouchOutside = () => {
    Keyboard.dismiss(); // キーボードを閉じる
  };

  const onSettingsPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
    Keyboard.dismiss(); // キーボードを閉じる
  };

  return (
    // <TouchableWithoutFeedback onPress={handleTouchOutside}>
    <SafeAreaView style={styles.container}>
      <TagMoHeader
        hasLeftButton={false}
        hasRightButton={true}
        rightFontAwesomeName={"bars"}
        rightcolor={"black"}
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
      <>
        {isLoading ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={shopList}
            renderItem={({ item }) => (
              <ListItem
                shopName={item.shopName}
                shopLocationName={item.shopLocationName}
                distance={item.distance}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
          />
        )}
      </>
      <View style={styles.footer}>
        <SquareButton
          color="red"
          iconName="shopping-cart"
          text="EC"
          nextScreen="Amount"
        />
        <SquareButton
          color="orange"
          iconName="commute"
          text="交通"
          nextScreen="Amount"
        />
        <SquareButton
          color="green"
          iconName="help-outline"
          text="その他"
          nextScreen="Amount"
        />
      </View>
    </SafeAreaView>
    // </TouchableWithoutFeedback>
  );
};

const HomeSettings: React.FC = () => {
  const navigation = useNavigation();

  const onSettingsPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      <TagMoHeader
        hasLeftButton={false}
        hasRightButton={true}
        rightFontAwesomeName={"bars"}
        rightcolor={"black"}
        onRightPress={onSettingsPress}
      />
      <View style={styles.innerContainer}>
        <RectangleButton title="Log Out" onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
};

const Home: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeMain"
      screenOptions={{
        drawerPosition: "right", // ドロワーを右から開く設定
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeMain}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Settings"
        component={HomeSettings}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default Home;

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
  list: {
    flex: 1,
    marginHorizontal: 16,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  shopName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  shopLocationName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left", // テキストを左寄せ
    flex: 1, // 幅を保つためにflexを使用
    marginLeft: 50, // 日付との間に幅を持たせる
  },
  distance: {
    color: "#888",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },

  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: -100,
  },
});
