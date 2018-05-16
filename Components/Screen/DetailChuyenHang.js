import React, {Component} from 'react';
import {Platform, View, Image, TouchableOpacity, Alert} from 'react-native';

import {
  Button,
  Text,
  Form,
  Input,
  Item,
  Label,
  Title,
  Container,
  Header,
  Footer,
  List,
  Content,
  Picker
} from 'native-base';

import styles from '../Styles/Styles.js';

export default class DetailChuyenHang extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      id_chuyenhang: 0,
    };
  };

  componentWillMount() {
    const {setParams} = this.props.navigation;
    var x = this._getId();
  };
  _getId() {
    let id = 0;
    if (this.props.navigation.state.params) {
      id = this.props.navigation.state.params.id;
      this.setState({id_chuyenhang: id})
    }
    return id;
  }

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    if (state.params != undefined) {
      return {
        title: 'Chi tiết chuyến hàng - TestID:' + `${state.params.id}`
      }
    }
  };

  render() {

    return (<Container>
      <Content>
         <Text>{this.state.id_chuyenhang}</Text>
      </Content>

    </Container>);
  }
}
