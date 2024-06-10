import { useNavigation } from 'expo-router';
import React from 'react';
import {Button, Keyboard, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {Text} from 'react-native';

const App = () => {

  const navigation = useNavigation<any>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>TagMo</Text>
        <TextInput
          placeholder="ログインID"
          style={styles.input}
          // label="名前"
          // containerStyle={styles.input}
          // autoCapitalize="none"
          // errorMessage={formik.errors.name}
          // onChangeText={formik.handleChange('name')}
          // value={formik.values.name}
        />
        <TextInput
          placeholder="パスワード"
          style={styles.input}
          // label="名前"
          // containerStyle={styles.input}
          // autoCapitalize="none"
          // errorMessage={formik.errors.name}
          // onChangeText={formik.handleChange('name')}
          // value={formik.values.name}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('(tabs)')}
        >
          <Text style={styles.buttonText}>ログインする</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: "russo-one",
    color: 'white'
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;