import React from 'react';
import {StyleSheet, View} from 'react-native';


export default class MultiTap extends React.Component {
  static defaultProps = {
    onPress: () => null,
  }

  onStartShouldSetResponder = (event) => {
    const {nativeEvent} = event;
    if(nativeEvent.touches.length === 2) {
      return true;
    }

    return false;
  }

  onResponderRelease = (event) => {
    this.props.onPress();
  }

  render () {
    return (
      <View
        style={styles.view}
        onStartShouldSetResponder={this.onStartShouldSetResponder}
        onResponderRelease={this.onResponderRelease}
      >
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
  }
});