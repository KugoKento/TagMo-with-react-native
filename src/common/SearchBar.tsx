import * as React from "react";
import { SearchBar } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";

export default () => {
  const [value, setValue] = React.useState("");

  return (
    <SearchBar
      platform="ios"
      containerStyle={{
        width: "80%",
        height: "4%",
        borderRadius: 10,
        marginTop: 24,
        backgroundColor: "#d3d3d3",
      }}
      inputContainerStyle={{
        height: 20,
        borderRadius: 5,
        backgroundColor: "#d3d3d3",
      }}
      inputStyle={{
        color: "black",
      }}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      loadingProps={{}}
      onChangeText={(newVal) => setValue(newVal)}
      placeholder="Search"
      placeholderTextColor="#888"
      value={value}
      searchIcon={<Ionicons name="search-outline" size={17} color="black" />}
      clearIcon={null}
    />
  );
};
