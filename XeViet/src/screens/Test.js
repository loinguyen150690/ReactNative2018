import React, {Component} from 'react';
import {
  Text,
  View,
} from 'react-native';

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }


  render() {
    return (<View>
      <Text>Test</Text>
    </View>);
  }
}
