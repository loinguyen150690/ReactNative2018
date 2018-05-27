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
  AsyncStorage
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
  Content
} from 'native-base';

import styles from '../Styles/Styles.js';
const background_img = '../images/background.png';
const logo_img = '../images/logo.png';
export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      introPage: true,
      username:'admin',
      password:'123456abc++',
      loginned: false,
      isLoading: 0,
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
        //Alert.alert('Thông báo', token);
        var ojUserName = JSON.parse(token);
         if(ojUserName.LoginName){
             //Alert.alert('Thông báo', ojUserName.LoginName);
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

      this.setState({isLoading: 1});
      fetch('http://dev.baohanhdientu.net/api/Member_API/Login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: this.state.username, Password: this.state.password})
      })

      .then(response => {
        this.setState({isLoading: 0});
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
        this.setState({isLoading: 0});
      })

      .catch(error => {
        console.error(error);
        this.setState({isLoading: 0});
        Alert.alert('Thông báo', 'Lỗi kết nối, vui lòng thử lại sau!');
      });
  }
  render() {

    if (this.state.isLoading == 1) {
      return (
        <ActivityIndicator style={styles.activity_indicator}  color="#fff"  />)
    }
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
    return (<Container>
      <Image source={require(background_img)} style={styles.backgroundImage}></Image>
      <Content>
        <View style={styles.page_title}>
          <Text full={true} style={styles.welcome}>Chào mừng đến với</Text>
          <Text style={styles.shipper_text}>Ewarranty</Text>
        </View>
        <KeyboardAvoidingView behavior="padding" enabled={true}>
          <Form style={styles.frmlogin}>
            <Item floatingLabel={true} style={styles.frmlogin__item}>
              <Label style={styles.frmlogin__label}>Tài khoản</Label>
              <Input value={this.state.username} onChangeText={(username) => this.setState({username})} style={styles.frmlogin__input}/>
            </Item>
            <Item floatingLabel={true} style={styles.frmlogin__item}>
              <Label style={styles.frmlogin__label}>Mật khẩu</Label>
              <Input value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry={true} style={styles.frmlogin__input}/>
            </Item>
            <Button block={true} rounded={true} style={styles.frmlogin__btn} onPress={this.onLogin.bind(this)}>
              <Text style={styles.frmlogin__btn__txt}>ĐĂNG NHẬP</Text>
            </Button>

            <Button block={true} bordered={true} rounded={true} light={true}  style={styles.frmlogin__btn2} onPress={() => this.props.navigation.navigate("CreateAccount", {})}>
              <Text style={styles.frmlogin__btn__txt}>ĐĂNG KÝ</Text>
            </Button>

          </Form>
        </KeyboardAvoidingView>
      </Content>
      <Footer style={styles.footer_page}>
        {/* <TouchableOpacity style={styles.create_account} onPress={() => this.props.navigation.navigate("CreateAccount", {})}>
          <Text style={styles.create_account_txt}>Bạn chưa có tài khoản ?{' '}</Text>
          <Text style={styles.create_account_link}>Tạo tài khoản</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => this.props.navigation.navigate("EnterPhoneNumber", {username: this.state.username})}>
          <Text style={styles.forget_pass_txt}>Bạn quên mật khẩu ?</Text>
        </TouchableOpacity>
      </Footer>
    </Container>);
  }
}
