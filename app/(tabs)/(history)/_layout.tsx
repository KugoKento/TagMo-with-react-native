import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "@/hooks/useColorScheme";
import History from "./history";
import HistoryDetail from "./historyDetail";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function HomeAmountLayout() {
  const colorScheme = useColorScheme();

  const Stack = createNativeStackNavigator();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="History">
        <Stack.Screen
          name="History"
          component={History}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HistoryDetail"
          component={HistoryDetail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </ThemeProvider>
  );
}
