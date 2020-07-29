import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as DocumentPicker from 'expo-document-picker';


export default class App extends React.Component {

  clicked = (event) => {
    console.log("AAA");
    DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: false
    }).then((e) => {
      console.log("Result: ", e);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hi Thomas!</Text>
        <StatusBar style="auto"/>
        <Button onPress={this.clicked} title="Test">File Input</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
