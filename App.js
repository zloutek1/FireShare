import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import MultiTap from './MultiTap'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
const background_parcel = require('./assets/background_parcel_trans.png');


export default class App extends React.Component {

  state = {
    files: [],
  }

  clicked = (event) => {
    DocumentPicker.getDocumentAsync({
      type: "image/*",
      copyToCacheDirectory: true,
      multiple: true
    }).then((e) => {
      if(e.type === 'success' && e.uri) {
        FileSystem.readAsStringAsync(e.uri, {
          encoding: FileSystem.EncodingType.Base64
        })
          .then((data) => {
            this.state.files.push({
              uri: 'data:image/png;base64,'+data,
              name: e.name,
            });
            this.setState({
              files: this.state.files,
            })
        }).catch(error => {
          console.error(error);
        })
      }
    })
  }

  imageSize = (x) => {
    let width = 0;
    let height = 0;

    if(x < 5) {
      width = height = 46;
    } else if(x < 10) {
      width = height = 30;
    } else if(x < 17) {
      width = height = 22;
    } else if(x < 26) {
      width = height = 17;
    } else if(x < 37) {
      width = height = 13;
    } else {
      width = height = 100;
    }

    return {
      width: width+'%',
      height: height+'%',
    }
  }

  render() {
    const {files} = this.state

    const imageStyle = this.imageSize(files.length);

    return (
        <View style={styles.container}>
          <MultiTap onPress={this.clicked}>
            <Image source={background_parcel} style={styles.backgroundImage} backgroundColor={"#10101F0A"} opacity={0.5} />
            <View style={styles.app}>
              <StatusBar style="auto" hidden={true}/>
              {files.length === 0 && (
                <Text>Use two fingers to tap the screen!</Text>
              )}
              {files.length > 0 && (
                <View style={[styles.imagePreview, files.length === 1 ? styles.imagePreviewSingle : styles.imagePreviewMultiple ]}>
                  {files.map((item, key) => {
                    return (
                      <View key={`file-` + item.name + '-' + key} style={[styles.imageBox, imageStyle]}>
                        <Image source={{'uri': item.uri}} style={{width:'100%', height:'100%'}} />
                      </View>
                    )
                  })}
                </View>
              )}
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
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',

    width: '95%',
    height: '95%',
    flexWrap: 'wrap',
  },
  imagePreviewSingle: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  imagePreviewMultiple: {
    alignItems: 'stretch',
    alignContent: 'space-around',
    justifyContent: 'space-around'
  },
  imageBox: {
    display: 'flex',
    position: 'relative',
  }
});
