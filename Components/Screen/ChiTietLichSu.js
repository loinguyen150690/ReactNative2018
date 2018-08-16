import React, { Component } from "react";
import { Platform, View, Image , TouchableOpacity, Modal} from "react-native";

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

export default class ChiTietLichSu extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      lichSuId:"",
      data:{}
    };
  }
  componentDidMount() {
     var _id= this._getId();
     this.setState({
       lichSuId :_id
     });
     this._loadDataDetail(_id);
  }
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
    if(this.state.isLoading){
      return (<Spinner color='blue' />);
    }
    return (
      <Container>
        <Content>
            <View style={{backgroundColor:'white', flexDirection:'column', alignItems:'center', paddingTop:30, paddingBottom:30}}>
            <Text style={{fontSize:20}}>
              {this.state.data.SmsMessage}
            </Text>
            <Text style={{fontSize:18,color: this.state.data.WarrantSmsReceverStatus==1 ? "green" : "red"}}>
              {this.state.data.WarrantSmsReceverStatus==1 ? "Thành công" : "Thất bại"}
            </Text>
            <Text >
              {this.state.data.CreatedDate}
            </Text>
            </View>
            <View style={{marginTop:24,backgroundColor:'white', flexDirection:'column', alignItems:'center', padding:30}}>
              <Text style={{textAlign:'center', fontSize:16}}>
                {this.state.data.Remark}
              </Text>
            </View>
        </Content>
      </Container>
    );
  }
}
