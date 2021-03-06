import React, { Component } from "react";
import {
  Platform,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  AsyncStorage,
  Modal,
  RefreshControl,
  TextInput
} from "react-native";

import {
  Button,
  Text,
  Form,
  Input,
  Item,
  Label,
  Title,
  Container,
  Footer,
  Content,
  Spinner
} from "native-base";

import styles from "../styles/styles.js";
import globals from "../styles/variables.js";
import myApi from "../common/api.js";
import lang from "../languages/vn.js";
import Ionicons from "react-native-vector-icons/Ionicons";
const background_img = "../images/background.jpg";
const logo_img = "../images/logo.png";


export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      groupUser:"QUANLY",
      userName: "", //'admin',
      password:  "" //'123456',
    };
  }

  //Kiem tra đã đăng nhập && số điện thoại hợp lệ
  GetInfoUser() {
        AsyncStorage.getItem("@Logined")
        .then(token => {
          if (token) {
           this.props.navigation.navigate("HomePage");
          }
        });
  }
  componentWillMount() {
    //Kiem tra so dien thoai hop le & da dang nhap chuyen sang homepage
    //this.GetInfoUser();
    let _groupUser = "QUANLY";
    if (this.props.navigation.state.params) {
      _groupUser = this.props.navigation.state.params.groupUser;
    }
    this.setState({groupUser : _groupUser});
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  }

  setTabBarActive(){
     this.props.navigation.navigate("HomePage");
  }

  navUserOption(){
    //this.saveItem("@TypeUse",this.state.type.toString());
    this.props.navigation.navigate("LoginStack");
  }

  onLogin() {
  //alert(myApi.NguoiDung.DangNhap);
    //this.setTabBarActive();
     //return;

    if (!this.state.userName) {
      Alert.alert(lang.alert.title, lang.alert.errlogin6);
      return;
    }
    if (!this.state.password) {
      Alert.alert(lang.alert.title, lang.alert.errlogin7);
      return;
    }

    this.setState({ isLoading: true });
    fetch(myApi.NguoiDung.DangNhap, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Username: this.state.userName,
        Password: this.state.password,
        GroupUser:this.state.groupUser
      })
    })
    .then(response => {
      if (response.status === 200) {
        return response.json().then(responseJson => {
          if (responseJson.Result == true) {
            this.setState({isLoading: false,});
            this.saveItem("@UserName", this.state.userName);
            this.saveItem("@UserInfo", JSON.stringify(responseJson.DataResult));
            this.saveItem("@Logined", "1");
            this.setTabBarActive();
          } else if(responseJson.ErrorMessage){
            Alert.alert(lang.alert.title, responseJson.ErrorMessage);
            this.setState({ isLoading: false });
          } else {
            Alert.alert(lang.alert.title, lang.alert.errlogin0);
            this.setState({ isLoading: false });
          }
        });
      } else {
        this.setState({ isLoading: false });
        Alert.alert(lang.alert.title, "Loi ket noi");
      }
    })
    .catch(error => {
      this.setState({ isLoading: false });
      // Alert.alert('Thông báo',error)
      Alert.alert('Thông báo',"Loi ket noi 2")
    });
    this.setState({ isLoading: false });
  }

  async navToUserOption(){
    await AsyncStorage.removeItem("@TypeUse");
    this.props.navigation.navigate("UserOption");
  }
  render() {
    return (
      <Container>
        <Modal
          style={styles.modalLoading}
          animationType="fade"
          transparent={true}
          visible={this.state.isLoading}
          >
          <View style={styles.loadingView}>
            <Spinner
              style={styles.spinerLoading}
              color={globals.color.loading}
            />
          </View>
        </Modal>
        <Image
          source={require(background_img)}
          style={styles.backgroundImage}
        />
        <Content>
          <TouchableOpacity style={styles.button_login_back} onPress={()=> this.navToUserOption()}>
            <Ionicons style={styles.icon_login_back} name='ios-arrow-round-back'/>
          </TouchableOpacity>
          <View style={styles.page_title}>
            <Text full={true} style={styles.welcome}>
              {lang.content.wel}
            </Text>
            <Text style={styles.shipper_text}>Xe Việt</Text>
            <View style={[ { padding: 5, opacity: 0.1}]}>
            </View>
          </View>
          <KeyboardAvoidingView behavior="padding" enabled={true}>
            <View style={styles.frmlogin}>
              <View style={styles.mgt10}>
                <View style={styles.frmlogin__item}>
                  <Label style={styles.frmlogin__label}>
                    {lang.form.userName}
                  </Label>
                  <TextInput
                    value={this.state.userName}
                    onChangeText={userName => this.setState({ userName })}
                    style={styles.frmlogin__input}
                    underlineColorAndroid = "transparent"
                    ref={(input)=>this.inputUser = input}
                    returnKeyType = {"next"}
                    onSubmitEditing={() => { this.inputPassword.focus(); }}
                    blurOnSubmit={false}
                  />
                </View>
              </View>
              <View style={styles.mgt20}>
              <View style={styles.frmlogin__item}>
                <Label style={styles.frmlogin__label}>
                  {lang.form.password}
                </Label>
                <TextInput
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                  secureTextEntry={true}
                  style={styles.frmlogin__input}
                  underlineColorAndroid = "transparent"
                  ref={(input)=>this.inputPassword = input}
                />
              </View>
            </View>
              <Button
                block={true}
                rounded={true}
                style={styles.frmlogin__btn}
                onPress={this.onLogin.bind(this)}
              >
                <Text style={styles.frmlogin__btn__txt}>
                  {lang.button.login}
                </Text>
              </Button>

              <Button
                block={true}
                bordered={true}
                rounded={true}
                light={true}
                style={[styles.frmlogin__btn2, {display: this.state.groupUser == "QUANLY"
                ? "none"
                : "flex"}]}
                onPress={() =>
                  this.props.navigation.navigate("CreateAccount", {groupUser:this.state.groupUser})
                }
              >
                <Text style={styles.frmlogin__btn__txt}>
                  {lang.button.registry}
                </Text>
              </Button>
            </View>
          </KeyboardAvoidingView>
        </Content>
        <Footer style={styles.footer_page}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("EnterPhoneNumber", {
                userName: this.state.userName
              })
            }
          >
            <Text style={styles.forget_pass_txt}>{lang.form.fogotPass}</Text>
          </TouchableOpacity>
        </Footer>
        <TouchableOpacity onPress={()=> this.navUserOption()}  style={{position: 'absolute', bottom: 0, right: 0, padding: 24}}>
          <Text style={{color: '#fff', fontSize: 13}}>Trở lại</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}
