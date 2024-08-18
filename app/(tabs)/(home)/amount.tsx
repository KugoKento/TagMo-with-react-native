import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome, MaterialIcons, Entypo } from "@expo/vector-icons";
import { SquareButtonInAmount } from "@/components/SquareButtonInAmount";
import { TagMoHeader } from "@/components/TagMoHeader";
import { RouteProp, useRoute } from "@react-navigation/native";

const NEXT_SCREEN = "Home";

type ListItemProps = {
  shopName: string;
  shopLocationName: string;
};

type RootParamList = {
  Home: undefined;
  Amount: { item: ListItemProps };
};

type RegisteredProps = {
  transaction_date: Date;
  payment_location: string;
  category: string;
  payment_method: string;
  amount: string;
};

// const ListItem: React.FC<ListItemProps> = ({ title, distance }) => (
//   <View style={styles.listItem}>
//     <Text style={styles.title}>{title}</Text>
//     <Text style={styles.distance}>{distance}</Text>
//   </View>
// );

const Amount: React.FC = ({ navigation }: any) => {
  const [amount, setAmount] = useState(""); //入力金額
  const route = useRoute<RouteProp<RootParamList, "Amount">>(); //Home画面から変数を受ける
  // const { shopName, shopLocationName } = route.params as {
  //   shopName: string;
  //   shopLocationName: string;
  // };

  // 受け取ったパラメータを安全に確認
  console.log();
  // console.log(shopName);
  // console.log(shopLocationName);
  // console.log("item : " + route.params.item.shopLocationName);
  // console.log("shopName : " + route.params.item.shopName);
  // console.log("shopName : " + route.params.item.shopLocationName);
  // const item = route.params?.item ?? {
  //   shopName: "Unknown",
  //   shopLocationName: "Unknown",
  // };
  // console.log("item : " + item);
  // console.log(route);
  // console.log(route.params);
  // console.log(route.params.item.shopName);
  // console.log();
  const [registeredProps, setRegisteredProps] = useState<RegisteredProps>({
    transaction_date: new Date(),
    payment_location:
      (route.params.item.shopName ?? "") +
      " " +
      (route.params.item.shopLocationName ?? ""),
    category: "",
    payment_method: "",
    amount: "0",
  });

  // console.log(route.params.item.shopLocationName);

  useEffect(() => {
    setRegisteredProps((prev) => ({
      ...prev,
      amount: amount,
    }));
  }, [amount]);

  // console.log("Shop Name:", shopName);
  // console.log("Shop Location Name:", shopLocationName);
  // console.log("Distance:", distance);

  const squareButtonColor: string = "#495B6D";

  const formatNumberWithCommas = (value: string): string => {
    return Number(value).toLocaleString();
  };

  const handleAmount = (amount: string) => {
    setAmount(formatNumberWithCommas(amount));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <TagMoHeader
          hasLeftButton={true}
          hasRightButton={false}
          leftFontAwesomeName={"chevron-left"}
          leftcolor={"black"}
          onLeftPress={() => navigation.navigate("Home")}
        />
        <View style={styles.amountContainer}>
          <Text style={styles.currency}>¥</Text>
          <TextInput
            style={styles.amountInput}
            keyboardType="numeric"
            placeholder={"0"}
            value={amount}
            onChangeText={setAmount}
          />
        </View>
        {/* <FlatList
          data={DATA}
          renderItem={({ item }) => <ListItem title={item.title} distance={item.distance} />}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        /> */}
        <View style={styles.buttonGroup}>
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName="payments"
            text="現金"
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName="credit-card"
            text="クレジット"
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName="qr-code-2"
            text="QRコード"
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
        </View>
        <View style={styles.buttonGroup}>
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName="commute"
            text="交通系IC"
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName="savings"
            text="口座振込"
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName="currency-exchange"
            text="立て替え"
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
        </View>
        <View style={styles.buttonGroup}>
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName="thumb-up"
            text="ポイント"
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName="card-giftcard"
            text="商品券"
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName="help-outline"
            text="その他"
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 16,
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

export default Amount;
