import React, { Component } from "react";
import { Platform, View, Alert, AsyncStorage,ActivityIndicator, Image } from "react-native";

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
} from "native-base";

import styles from "../Styles/Styles.js";
const logo_img = '../images/logo.png';
export default class More extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      introPage: false,
      isLoading: false,
      id_token: '0',
      login: 'chưa',
    };
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
      this.setState({ id_token: selectedValue });
      Alert.alert("Login Success!");
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  }
  async userLogout() {
    try {
      await AsyncStorage.removeItem("id_token");
      this.setState({ id_token: "" });
      Alert.alert("Logout Success!");
    } catch (error) {
      console.log("AsyncStorage error: " + error.message);
    }
  }

  async checkLogin() {
    AsyncStorage.getItem("id_token").then(token => {
      if(token !== null && token !==''){
        var obj = JSON.parse(token);
        this.setState({ id_token: token, login: obj.address });
      }
      else {
        this.setState({ login: 'chưa' });
      }
    });
  }


  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator style={styles.activity_indicator}  color="#fff"  />)
    }
    if (this.state.introPage) {
      return (<View style={styles.loadingStyle}>
        <Image source={require(logo_img)} style={{
            width: 80,
            height: 80
          }}/>
      </View>)
    };
    return (
      <Container>
        <Content>
          <Text>
              Login:
            {this.state.login}{'=>'}
            (click on CHECK)
          </Text>
          <Button
            block={true}
            bordered={true}
            rounded={true}
            style={styles.frmgetpass__btn}
            onPress={() => {
              this.saveItem("id_token", JSON.stringify({name:'loi', address:'HCM'}));
            }}
          >
            <Text style={styles.btn_border_blue__txt}>Login</Text>
          </Button>

          <Button
            block={true}
            bordered={true}
            rounded={true}
            style={styles.frmgetpass__btn}
            onPress={() => {
              this.userLogout();
            }}
          >
            <Text style={styles.btn_border_blue__txt}>LOGOUT</Text>
          </Button>


          <Button
            block={true}
            bordered={true}
            rounded={true}
            style={styles.frmgetpass__btn}
            onPress={() => {
              this.checkLogin();
            }}
          >
            <Text style={styles.btn_border_blue__txt}>CHECK</Text>
          </Button>

          <Button
            block={true}
            bordered={true}
            rounded={true}
            style={styles.frmgetpass__btn}
            onPress={() => this.props.navigation.navigate("Login", {})}
          >
            <Text style={styles.btn_border_blue__txt}>Go to screen Login</Text>
          </Button>

          <Button
            block={true}
            bordered={true}
            rounded={true}
            style={styles.frmgetpass__btn}
            onPress={() => {  this.setState({ isLoading: 1 });}}
          >
            <Text style={styles.btn_border_blue__txt}>Loading page</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
