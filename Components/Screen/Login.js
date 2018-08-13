import React, {Component} from 'react';
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
  Modal
} from 'react-native';

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
  Spinner,
  Content
} from 'native-base';

import styles from '../Styles/Styles.js';
import globals from "../Styles/Globals.js";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const background_img = '../Images/background.png';
const logo_img = '../Images/logo.png';
export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      introPage: true,
      username:'admin',
      password:'123456abc++',
      loginned: false,
      isLoading: false,
      id_token:''
    };

    setTimeout(function() {
      this.setState({introPage: false});
    }.bind(this), 500);
  };
  componentWillMount() {
    this._loadInitialState().done();
  };

  _loadInitialState = async () => {
    try {
      await AsyncStorage.getItem('username').then(token => {
        var ojUserName = JSON.parse(token);
         if(ojUserName.LoginName){
             this.props.navigation.navigate('HomePage');
         }
         else {
       }
     });

    } catch (e) {} finally {}
  }

  async saveItem(item, selectedValue) {
      try {
        await AsyncStorage.setItem(item, selectedValue);
        this.setState({ id_token: selectedValue });
        //Alert.alert("Login Success!");
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

  onLogin() {
    this.setState({
      loginned: false,
    });

    if(this.state.username == '')
    {
      Alert.alert('Thông báo', 'Chưa nhập số điện thoại!');
      return;
    }
    if(this.state.password == '')
    {
      Alert.alert('Thông báo', 'Chưa nhập mật khẩu!');
      return;
    }

      this.setState({isLoading: true});
      fetch('http://dev.baohanhdientu.net/api/Member_API/Login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: this.state.username, Password: this.state.password})
      })

      .then(response => {
        this.setState({isLoading: false});
        if (response.status === 200) {
          return response.json().then(async (responseJson) => {
            if (responseJson){
                this.props.navigation.navigate('HomePage');
              try {
                  this.saveItem('username', JSON.stringify(responseJson));
              } catch (e) {
                console.log(e);
                Alert.alert('Thông báo',e);
              } finally {}
            }
            else if (responseJson == 2) {
              Alert.alert('Thông báo', 'Mật khẩu không đúng!');
            }
            else if (responseJson == 3) {
              Alert.alert('Thông báo', 'Tài khoản bị tạm khóa, vui lòng liên hệ admin để biết nguyên nhân!');
            }
            else{
              Alert.alert('Thông báo', 'Số điện thoại hoặc mật khẩu không đúng!');
            }
          });
        }
        else {
          Alert.alert('Thông báo', 'API Lỗi, vui lòng thử lại sau!');
        }
      })

      .then(response => {
        console.debug(response);
        this.setState({isLoading: false});
      })

      .catch(error => {
        console.error(error);
        this.setState({isLoading: false});
        Alert.alert('Thông báo', 'Lỗi kết nối, vui lòng thử lại sau!');
      });
  }
  navToQuenMatKhau(){
    this.props.navigation.navigate('QuenMatKhau');
  }
  navToDangKy(){
    this.props.navigation.navigate('DangKy');
  }

  render() {
    if (this.state.introPage) {
      return (<View style={{
          backgroundColor: '#3DB2E3',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Image source={require(logo_img)} style={{
            width: 80,
            height: 80
          }}/>
      </View>)
    };
    return (<Container style={{backgroundColor: "#41ABE9"}}>
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

      {/* <Image source={require(background_img)} style={styles.backgroundImage}></Image> */}
      <Content>
        <View style={styles.page_title}>
          <Text full={true} style={styles.welcome}>Chào mừng đến với</Text>
          <Text style={styles.shipper_text}>Ewarranty</Text>
        </View>
        <KeyboardAvoidingView behavior="padding" enabled={true}>
          <Form style={styles.frmlogin}>
            <Item style={[styles.frmlogin__item, styles.bgf]} rounded>
              <Input value={this.state.username} onChangeText={(username) => this.setState({username})} style={styles.frmlogin__input}/>
            </Item>
            <Item style={[styles.frmlogin__item, styles.bgf]} rounded>
              <Input value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry={true} style={styles.frmlogin__input}/>
            </Item>
            <Button block={true} rounded={true} style={styles.frmlogin__btn} onPress={this.onLogin.bind(this)}>
              <Text style={styles.frmlogin__btn__txt}>ĐĂNG NHẬP</Text>
            </Button>
            <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'center' , marginTop: 24,}]}>
                <Text style={{color: '#fff', fontSize: 13}}><FontAwesome name="circle-thin" size={20} />{'  '}Mở khóa bằng vân tay</Text>
            </View>
            <View style={[{flexDirection: 'row',marginTop: 24,}]}>
              <TouchableOpacity style={{alignItems: 'flex-start', flex: 1}} onPress={()=> this.navToQuenMatKhau()}>
                <Text style={{color: '#fff'}}>QUÊN MẬT KHẨU</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{alignItems: 'flex-end', flex: 1}}  onPress={()=> this.navToDangKy()}>
                <Text style={{color: '#fff'}}>ĐĂNG KÝ TÀI KHOẢN</Text>
              </TouchableOpacity>


            </View>

            {/* <Button block={true} bordered={true} rounded={true} light={true}  style={styles.frmlogin__btn2} onPress={() => this.props.navigation.navigate("CreateAccount", {})}>
              <Text style={styles.frmlogin__btn__txt}>ĐĂNG KÝ</Text>
            </Button> */}

          </Form>
        </KeyboardAvoidingView>
      </Content>
      {/* <Footer style={styles.footer_page}> */}
        {/* <TouchableOpacity style={styles.create_account} onPress={() => this.props.navigation.navigate("CreateAccount", {})}>
          <Text style={styles.create_account_txt}>Bạn chưa có tài khoản ?{' '}</Text>
          <Text style={styles.create_account_link}>Tạo tài khoản</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("EnterPhoneNumber", {username: this.state.username})}>
          <Text style={styles.forget_pass_txt}>Bạn quên mật khẩu ?</Text>
        </TouchableOpacity> */}
      {/* </Footer> */}
    </Container>);
  }
}
