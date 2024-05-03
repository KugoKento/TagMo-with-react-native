import * as React from "react";
import { SearchBar } from "@rneui/base";

export default () => {
  const [value, setValue] = React.useState("");

  return (
    <SearchBar
      platform="default"
      containerStyle={{
        width: "80%",
        height: "6%",
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
      //   onClearText={{}}
      placeholder="Search"
      placeholderTextColor="#888"
      //   cancelButtonTitle="Cancel"
      //   cancelButtonProps={{}}
      //   onCancel={{}}
      value={value}
    />
  );
};
