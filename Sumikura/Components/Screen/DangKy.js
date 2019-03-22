import React, {Component} from 'react';
import {WebView} from 'react-native';

export default class DangKy extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'http://baohanh.sumikura.com.vn/Agency/Register'}}
        style={{marginTop: 0}}
      />
    );
  }
}
