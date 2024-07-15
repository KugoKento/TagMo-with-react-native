import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { TagMoHeader } from "@/components/TagMoHeader";
import { RectangleButton } from "@/components/RectangleButton";
import { Link, router } from "expo-router";

const handlePress = () => {
  // ログイン
  router.replace("/(tabs)/(home)/home");
};

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <TagMoHeader hasLeftButton={false} hasRightButton={false} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <RectangleButton title="Sign Up" onPress={handlePress} />
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already registered ?</Text>
            <Link href="/auth/login" asChild>
              {/* asChildは子コンポーネントに機能を継承する */}
              <TouchableOpacity>
                <Text style={styles.footerLink}>Log In !</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // これを追加して要素を水平方向の中央に配置します
    paddingHorizontal: 30,
    marginTop: -100, // 上部のマージンを消すために負の値を設定
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    width: "100%",
  },
  input: {
    height: 50,
    width: "100%", // 入力フィールドの幅を100%に設定
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  footer: {
    flexDirection: "row",
  },
  footerText: {
    fontSize: 14,
    lineHeight: 40,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 40,
    color: "#467FD3",
  },
});

export default SignUp;
