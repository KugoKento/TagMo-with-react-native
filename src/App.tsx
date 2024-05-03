import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import Title from "@/components/common/Title";
import TableScreen from "./components/common/TableScreen";

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
      <TextInput placeholder="write down something" style={styles.input} />
      <TableScreen/>
      <View style={styles.buttonStyle}>
        <Button
          title="EC"
          color="#E7514C"
          onPress={() => Alert.alert('EC button pressed')}
        />
        <Button
          title="Transportation"
          color="#F2C865"
          onPress={() => Alert.alert('Transportation button pressed')}
        />
        <Button
          title="Others"
          color="#5D8E8D"
          onPress={() => Alert.alert('Others button pressed')}
        />
      </View>
      </View>
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
    width: 300,
    padding: 10,
    marginTop: 17,
    marginBottom: 10,
    borderRadius: 6,
  },
  buttonStyle: {
    flexDirection: "row",
    position: "absolute",
    marginTop: 700,
    justifyContent: "space-between",
  },
});
