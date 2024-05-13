import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from './ThemedText';
import { useFonts } from "expo-font";

const HEADER_HEIGHT = 100;


type Props = PropsWithChildren<{
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function TitleView({
  children,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  const [loaded] = useFonts({
    "russo-one": require("../assets/fonts/Russo_One.ttf"),
  });

  if (!loaded) {
    return null; // フォントがロードされるまで何も表示しない
  }

  return (
    <ThemedView style={styles.container}>
      
        <ThemedView
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
          ]}>
            <ThemedText style={styles.title} type="title">TagMo</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.content}>{children}</ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 160,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
  title: {
    color: '#000000',
    fontFamily: "russo-one",
  }
});
