import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import * as DocumentPicker from 'expo-document-picker';
const background_parcel = require('./assets/background_parcel_trans.png');


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
            <Image source={background_parcel} style={styles.backgroundImage} backgroundColor={"#10101F0A"} opacity={0.5} />
            <View style={styles.app}>
              <Text>Hi Thomas!</Text>
              <StatusBar style="auto"/>
              <Button onPress={this.clicked} title="Test">File Input</Button>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'repeat',
    width: '100%',
  },
  app: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
