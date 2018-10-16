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
const background_img = "../images/background.png";
const logo_img = "../images/logo.png";


export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      phone: '',
      password: '',
    };
  }


  componentWillMount() {
    //Kiem tra so dien thoai hop le & da dang nhap chuyen sang homepage
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  }

  setTabBarActive(){
     this.saveItem("@TabBarActive","4");
     this.props.navigation.navigate("HomePage");
  }

  onLogin() {
    // test
    this.setTabBarActive()
    return;
    // end test


    if (this.state.phone == "") {
      Alert.alert(lang.alert.title, lang.alert.errlogin6);
      return;
    }
    if (this.state.password == "") {
      Alert.alert(lang.alert.title, lang.alert.errlogin7);
      return;
    }



    this.setState({ isLoading: true });
    fetch(myApi.User.Login, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Phone: this.state.phone,
        Password: this.state.password
      })
    })
    .then(response => {
      if (response.status === 200) {
        return response.json().then(responseJson => {
          if (responseJson == 1) {
            this.setState({isLoading: false,});
            this.saveItem("@Phone", this.state.phone);
            this.saveItem("@Logined", "1");
            this.setTabBarActive();
          } else if (responseJson == 2) {
            Alert.alert(lang.alert.title, lang.alert.errlogin2);
            this.setState({ isLoading: false });
          } else if (responseJson == 3) {
            Alert.alert(lang.alert.title, lang.alert.errlogin3);
            this.setState({ isLoading: false });
          } else {
            Alert.alert(lang.alert.title, lang.alert.errlogin0);
            this.setState({ isLoading: false });
          }
        });
      } else {
        this.setState({ isLoading: false });
        Alert.alert(lang.alert.title, lang.alert.errlogin4);
      }
    })
    .catch(error => {
      this.setState({ isLoading: false });
      Alert.alert('Thông báo',error)
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
            <Text style={styles.shipper_text}>Shippers</Text>
            <View style={[ { padding: 5, opacity: 0.1}]}>
            </View>
          </View>
          <KeyboardAvoidingView behavior="padding" enabled={true}>
            <View style={styles.frmlogin}>
              <View style={styles.mgt10}>
                <View style={styles.frmlogin__item}>
                  <Label style={styles.frmlogin__label}>
                    {lang.form.phoneNumber}
                  </Label>
                  <TextInput
                    keyboardType="phone-pad"
                    value={this.state.phone}
                    onChangeText={phone => this.setState({ phone })}
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
                style={[styles.frmlogin__btn2]}
                onPress={() =>
                  this.props.navigation.navigate("CreateAccount", {})
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
                phone: this.state.phone
              })
            }
          >
            <Text style={styles.forget_pass_txt}>{lang.form.fogotPass}</Text>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}
