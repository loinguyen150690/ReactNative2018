import React, {Component} from 'react';
import {
  Platform,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';

const background_img = '../images/background.png';
const logo_img = '../images/logo.png';

export default class Intro extends Component<Props> {
  constructor(props) {
    super(props);
    setTimeout(function() {
       this.props.navigation.navigate('HomePage');
   }.bind(this), 100);
  };
  render() {
    return (<View style={{
        backgroundColor: '#008FE5',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Image source={require(logo_img)} />
    </View>);
  }
}
