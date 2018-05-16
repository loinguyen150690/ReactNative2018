import React , { Component }  from 'react';
import { View, Text } from 'react-native';
import {RootStack} from './Router.js';

export default class App extends Component<Props> {
  render() {
    return <RootStack />;
  }
}
