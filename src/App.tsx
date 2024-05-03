import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import Title from "@/components/common/Title";
import TableScreen from "./components/common/TableScreen";
import { Button } from "react-native-elements";
import SearchBar from "./components/common/SearchBar";

export default function App() {
  const [loaded] = useFonts({
    "russo-one": require("../assets/fonts/Russo_One.ttf"),
  });

  if (!loaded) {
    return null; // フォントがロードされるまで何も表示しない
  }

  return (
    <View style={styles.container}>
      <Title />
      <View style={styles.listBackground}></View>
      <View style={styles.listBackground2}></View>
      {/* <TextInput placeholder="write down something" style={styles.input} /> */}
      <SearchBar />
      <TableScreen />
      <View style={styles.buttonStyle}>
        <TypeButton title="EC" color="#E7514C" />
        <TypeButton title="交通" color="#F2C865" />
        <TypeButton title="その他" color="#5D8E8D" />
      </View>
    </View>
  );
}

const TypeButton = (props) => {
  return(
    <Button
          title={props.title}
          loading={false}
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: props.color,
            borderRadius: 5,
            height: 140,
            width: 106,
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 23 }}
          containerStyle={{
            marginHorizontal: 8,
            marginVertical: 16,
          }}
          onPress={() => console.log("aye")}
        />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
  },
  listBackground: {
    position: "absolute",
    backgroundColor: "#dcdcdc",
    width: 350,
    height: 500,
    borderWidth: 2,
    borderColor: "#dcdcdc",
    borderRadius: 10,
    marginTop: 130,
  },
  listBackground2: {
    position: "absolute",
    backgroundColor: "#ffffff",
    width: 332,
    height: 484,
    borderWidth: 2,
    borderColor: "#dcdcdc",
    borderRadius: 10,
    marginTop: 138,
  },
  contents: {
    backgroundColor: "#dcdcdc",
    padding: 20,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccceee",
    backgroundColor: "#fff",
    width: "80%",
    padding: 10,
    marginTop: 21,
    marginBottom: 10,
    borderRadius: 6,
  },
  buttonStyle: {
    flexDirection: "row",
    position: "absolute",
    marginTop: 630,
    justifyContent: "space-between",
  },
});
