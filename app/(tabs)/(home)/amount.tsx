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
import { SquareButton } from "@/components/SquareButton";
import { TagMoHeader } from "@/components/TagMoHeader";

type ListItemProps = {
  title: string;
  distance: string;
};

const DATA: ListItemProps[] = [
  { title: "名古屋三交ビル", distance: "350m" },
  { title: "セブンイレブン国際センター1号店", distance: "400m" },
  { title: "すき家 名駅一丁目店", distance: "400m" },
  { title: "青果 石川", distance: "450m" },
  { title: "Title", distance: "Label" },
  { title: "Title", distance: "Label" },
  { title: "Title", distance: "Label" },
  { title: "Title", distance: "Label" },
  { title: "Title", distance: "Label" },
];

const ListItem: React.FC<ListItemProps> = ({ title, distance }) => (
  <View style={styles.listItem}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.distance}>{distance}</Text>
  </View>
);

const Amount = ({ navigation }: any) => {
  const [amount, setAmount] = useState("");

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
          <SquareButton
            color={squareButtonColor}
            iconName="payments"
            text="現金"
            nextScreen="Amount"
          />
          <SquareButton
            color={squareButtonColor}
            iconName="credit-card"
            text="クレジット"
            nextScreen="Amount"
          />
          <SquareButton
            color={squareButtonColor}
            iconName="qr-code-2"
            text="QRコード"
            nextScreen="Amount"
          />
        </View>
        <View style={styles.buttonGroup}>
          <SquareButton
            color={squareButtonColor}
            iconName="commute"
            text="交通系IC"
            nextScreen="Amount"
          />
          <SquareButton
            color={squareButtonColor}
            iconName="savings"
            text="口座振込"
            nextScreen="Amount"
          />
          <SquareButton
            color={squareButtonColor}
            iconName="currency-exchange"
            text="立て替え"
            nextScreen="Amount"
          />
        </View>
        <View style={styles.buttonGroup}>
          <SquareButton
            color={squareButtonColor}
            iconName="thumb-up"
            text="ポイント"
            nextScreen="Amount"
          />
          <SquareButton
            color={squareButtonColor}
            iconName="card-giftcard"
            text="商品券"
            nextScreen="Amount"
          />
          <SquareButton
            color={squareButtonColor}
            iconName="help-outline"
            text="その他"
            nextScreen="Amount"
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
