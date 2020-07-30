import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import MultiTap from './MultiTap'
import * as DocumentPicker from 'expo-document-picker';
const background_parcel = require('./assets/background_parcel_trans.png');


export default class App extends React.Component {

  state = {
    files: [],
  }

  clicked = (event) => {
    console.log("AAA");
    DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: false,
      multiple: true
    }).then((e) => {
      if(e.type === 'success' && e.uri) {
        console.log("File: ", e);
        this.state.files.push(e);
        this.setState({
          files: this.state.files,
        })
      }
    })
  }

  render() {
    const {files} = this.state

    return (
        <View style={styles.container}>
          <MultiTap onPress={this.clicked}>
            <Image source={background_parcel} style={styles.backgroundImage} backgroundColor={"#10101F0A"} opacity={0.5} />
            <View style={styles.app}>
              <Text>Use two fingers to tap the screen!</Text>
              <StatusBar style="auto"/>
              <View>
                {files.length > 0 && (
                  <View>
                    <Text>{"\n"}Uploaded files:</Text>
                  </View>
                )}
                {files.map((item) => {
                  return (
                    <View key={`file-`+item.name}>
                      <Text>{item.name}</Text>
                    </View>
                  )
                })}
              </View>
            </View>
          </MultiTap>
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
  },
  imagePreview: {
    flex: 1,
    width: '10px'
  }
});
