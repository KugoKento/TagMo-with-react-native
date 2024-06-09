import { useNavigation } from 'expo-router';
import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {Text} from 'react-native';

const App = () => {

  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="ログインネーム"
        // label="名前"
        // containerStyle={styles.input}
        // autoCapitalize="none"
        // errorMessage={formik.errors.name}
        // onChangeText={formik.handleChange('name')}
        // value={formik.values.name}
      />
      <TextInput
        placeholder="パスワード"
        // label="名前"
        // containerStyle={styles.input}
        // autoCapitalize="none"
        // errorMessage={formik.errors.name}
        // onChangeText={formik.handleChange('name')}
        // value={formik.values.name}
      />
      <Button
        onPress={() => navigation.navigate('(tabs)')}
        title="ログインする"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;