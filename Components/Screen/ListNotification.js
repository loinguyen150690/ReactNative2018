import React, {Component} from 'react';
import {Platform, View, Image} from 'react-native';

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
  Content
} from 'native-base';
const firebase = require("firebase");
var config = {
   apiKey: "AIzaSyDgwAeVWyT3MMYQpU_MK7oFHqgym_IRCO8",
   authDomain: "bluedata-a6730.firebaseapp.com",
   databaseURL: "https://bluedata-a6730.firebaseio.com",
   projectId: "bluedata-a6730",
   storageBucket: "bluedata-a6730.appspot.com",
   messagingSenderId: "8182945351"
 };
firebase.initializeApp(config);
export default class ListNotification extends Component<Props> {
  render() {
    return (<Container>
      <Content>
        <Text>
          danh sach thong bao
        </Text>

      </Content>

    </Container>);
  }
}
