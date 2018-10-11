import React, { Component } from "react";
import { Platform, View, Image , TouchableOpacity, Modal, AsyncStorage} from "react-native";

import {
  Button,
  Text,
  Form,
  Item,
  Label,
  Title,
  Container,
  Footer,
  Content,
  List,
  ListItem,
  Thumbnail,
  Body,
  Spinner
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import styles from "../Styles/Styles.js";
import globals from "../Styles/Globals.js";
import myApi from "../Fetch/Api.js";
//import Moment from 'moment';

export default class ChiTietLichSu extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      lichSuId:"",
      data:{},
      DoanhThu: "0"
    };
  }
  componentWillMount = () => AsyncStorage.getItem('username').then((value) => this.setState(
        { 'DoanhThu': JSON.parse(value).dynamicProperties.DoanhThu }
      )
    )

  _loadDataDetail(id) {
    this.setState({isLoading: true});
    fetch('http://dev.baohanhdientu.net/api/ActiveHistory/GetID?Id=' + `${id}`, {method: "GET"}).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJson => {
          this.setState({
            data: responseJson,
            isLoading: true
          });
        });
      }
    }).then(response => {
      console.debug(response);
      this.setState({isLoading: false});
    }).catch(error => {
      console.error(error);
      this.setState({isLoading: false});
    });
  }
  _getId() {
    let id = 0;
    if (this.props.navigation.state.params) {
      id = this.props.navigation.state.params.id;
    }
    return id;
  }

  render() {
    //Moment.locale('vi');
    if(this.state.isLoading){
      return (<Spinner color='blue' />);
    }
    return (
      <Container>
        <Content>
        <View style={{flexDirection:"column", flex:1, justifyContent:"center",alignItems:"center", paddingTop:40}}>
        <Text>DOANH THU HIỆN CÓ</Text>
        <Text style={{fontSize:40, color:"orange"}}>{this.state.DoanhThu}</Text>
        <Text>Tính đến ngày 20/09/2018</Text>
        </View>

        </Content>
      </Container>
    );
  }
}
