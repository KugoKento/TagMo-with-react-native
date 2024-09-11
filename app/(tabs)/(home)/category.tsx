import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SquareButtonInAmount } from "@/components/SquareButtonInAmount";
import { TagMoHeader } from "@/components/TagMoHeader";
import { RouteProp, useRoute } from "@react-navigation/native";
import { HOME_VALUE } from "@/constants/appConstants";
import { SquareButtonInCategory } from "@/components/SquareButtonInCategory";

const NEXT_SCREEN = "Home";

type RootParamList = {
  Home: undefined;
  Amount: { registerItems: RegisteredProps };
  Category: { registerItems: RegisteredProps };
};

type RegisteredProps = {
  transaction_date: Date;
  payment_location: string;
  category: string;
  payment_method: string;
  amount: string;
};

const Category: React.FC = ({ navigation }: any) => {
  // const [amount, setAmount] = useState(""); //入力金額
  const route = useRoute<RouteProp<RootParamList, "Category">>(); //Amount画面から変数を受ける

  console.log();
  console.log("route確認");
  console.log(route);
  console.log();
  const [registeredProps, setRegisteredProps] = useState<RegisteredProps>({
    transaction_date: new Date(),
    payment_location: route.params.registerItems.payment_location ?? "",
    category: "",
    payment_method: route.params.registerItems.payment_method ?? "",
    amount: route.params.registerItems.amount ?? "0",
  });
  // route.params.registerItems.transaction_date = new Date();
  // setRegisteredProps(route.params.registerItems);
  console.log();
  console.log("registeredProps確認");
  console.log(registeredProps);
  console.log();

  const squareButtonColor: string = "#495B6D";

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
        <View style={styles.buttonGroupGroup}>
          <View style={styles.buttonGroup}>
            <SquareButtonInCategory
              color={squareButtonColor}
              iconName={HOME_VALUE.CATEGORY.BUTTON_1.ICON_NAME}
              text={HOME_VALUE.CATEGORY.BUTTON_1.TEXT}
              nextScreen={NEXT_SCREEN}
              registeredProps={registeredProps}
            />
            <SquareButtonInCategory
              color={squareButtonColor}
              iconName={HOME_VALUE.CATEGORY.BUTTON_2.ICON_NAME}
              text={HOME_VALUE.CATEGORY.BUTTON_2.TEXT}
              nextScreen={NEXT_SCREEN}
              registeredProps={registeredProps}
            />
            <SquareButtonInCategory
              color={squareButtonColor}
              iconName={HOME_VALUE.CATEGORY.BUTTON_3.ICON_NAME}
              text={HOME_VALUE.CATEGORY.BUTTON_3.TEXT}
              nextScreen={NEXT_SCREEN}
              registeredProps={registeredProps}
            />
          </View>
          <View style={styles.buttonGroup}>
            <SquareButtonInCategory
              color={squareButtonColor}
              iconName={HOME_VALUE.CATEGORY.BUTTON_4.ICON_NAME}
              text={HOME_VALUE.CATEGORY.BUTTON_4.TEXT}
              nextScreen={NEXT_SCREEN}
              registeredProps={registeredProps}
            />
            <SquareButtonInCategory
              color={squareButtonColor}
              iconName={HOME_VALUE.CATEGORY.BUTTON_5.ICON_NAME}
              text={HOME_VALUE.CATEGORY.BUTTON_5.TEXT}
              nextScreen={NEXT_SCREEN}
              registeredProps={registeredProps}
            />
            <SquareButtonInCategory
              color={squareButtonColor}
              iconName={HOME_VALUE.CATEGORY.BUTTON_6.ICON_NAME}
              text={HOME_VALUE.CATEGORY.BUTTON_6.TEXT}
              nextScreen={NEXT_SCREEN}
              registeredProps={registeredProps}
            />
          </View>
          <View style={styles.buttonGroup}>
            <SquareButtonInCategory
              color={squareButtonColor}
              iconName={HOME_VALUE.CATEGORY.BUTTON_7.ICON_NAME}
              text={HOME_VALUE.CATEGORY.BUTTON_7.TEXT}
              nextScreen={NEXT_SCREEN}
              registeredProps={registeredProps}
            />
            <SquareButtonInCategory
              color={squareButtonColor}
              iconName={HOME_VALUE.CATEGORY.BUTTON_8.ICON_NAME}
              text={HOME_VALUE.CATEGORY.BUTTON_8.TEXT}
              nextScreen={NEXT_SCREEN}
              registeredProps={registeredProps}
            />
            <SquareButtonInCategory
              color={squareButtonColor}
              iconName={HOME_VALUE.CATEGORY.BUTTON_9.ICON_NAME}
              text={HOME_VALUE.CATEGORY.BUTTON_9.TEXT}
              nextScreen={NEXT_SCREEN}
              registeredProps={registeredProps}
            />
          </View>
          <View style={styles.buttonGroup}>
            <SquareButtonInCategory
              color={squareButtonColor}
              iconName={HOME_VALUE.CATEGORY.BUTTON_10.ICON_NAME}
              text={HOME_VALUE.CATEGORY.BUTTON_10.TEXT}
              nextScreen={NEXT_SCREEN}
              registeredProps={registeredProps}
            />
            <SquareButtonInCategory
              color={squareButtonColor}
              iconName={HOME_VALUE.CATEGORY.BUTTON_11.ICON_NAME}
              text={HOME_VALUE.CATEGORY.BUTTON_11.TEXT}
              nextScreen={NEXT_SCREEN}
              registeredProps={registeredProps}
            />
            <SquareButtonInCategory
              color={squareButtonColor}
              iconName={HOME_VALUE.CATEGORY.BUTTON_12.ICON_NAME}
              text={HOME_VALUE.CATEGORY.BUTTON_12.TEXT}
              nextScreen={NEXT_SCREEN}
              registeredProps={registeredProps}
            />
          </View>
          <View style={styles.buttonGroup}>
            <SquareButtonInCategory
              color={squareButtonColor}
              iconName={HOME_VALUE.CATEGORY.BUTTON_13.ICON_NAME}
              text={HOME_VALUE.CATEGORY.BUTTON_13.TEXT}
              nextScreen={NEXT_SCREEN}
              registeredProps={registeredProps}
            />
            <SquareButtonInCategory
              color={squareButtonColor}
              iconName={HOME_VALUE.CATEGORY.BUTTON_14.ICON_NAME}
              text={HOME_VALUE.CATEGORY.BUTTON_14.TEXT}
              nextScreen={NEXT_SCREEN}
              registeredProps={registeredProps}
            />
            <SquareButtonInCategory
              color={squareButtonColor}
              iconName={HOME_VALUE.CATEGORY.BUTTON_15.ICON_NAME}
              text={HOME_VALUE.CATEGORY.BUTTON_15.TEXT}
              nextScreen={NEXT_SCREEN}
              registeredProps={registeredProps}
            />
          </View>
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
  buttonGroupGroup: {
    justifyContent: "center",
    flex: 1,
  },
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

export default Category;
