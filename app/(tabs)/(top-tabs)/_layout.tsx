import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function BalanceLayout() {
  return (
    <MaterialTopTabs>
      <MaterialTopTabs.Screen
        name="balanceMethod"
        options={{ title: "支払方法" }}
      />
      <MaterialTopTabs.Screen
        name="balanceCategory"
        options={{ title: "カテゴリ" }}
      />
    </MaterialTopTabs>
  );
}
