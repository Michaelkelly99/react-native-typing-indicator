/**
 * React Native Typing Indicator example.
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {TypingIndicator} from 'react-native-typing-indicator';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TypingIndicator
          backgroundStyle={styles.typingIndicatorBackground}
          duration={500}
          dotStyle={styles.dotStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  typingIndicatorBackground: {
    backgroundColor: '#2E77BB',
    borderBottomLeftRadius: 15,
  },
  dotStyle: {
    backgroundColor: 'white',
  },
});
