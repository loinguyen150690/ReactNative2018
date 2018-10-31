import React, { Component } from "react";
import {
  Platform,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import {
  Button,
  Text,
  Form,
  Input,
  Item,
  Label,
  Title,
  ListItem,
  Radio,
  Container,
  Footer,
  Content,
  Spinner,
  CheckBox
} from "native-base";
import styles from "../styles/styles.js";
import globals from "../styles/variables.js";
import myApi from "../common/api.js";

export default class FogotPass extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      TYPE_USER: "CHUXE",
      companyname: "",
      username:"",
      fullname: "",
      phone: "",
      email: "",
      password: "",
      repassword: "",
      isLoading: false,
      groupNameUser: null,
      focusDescriptionInput: false,
      value_checkbox: false
    };
  }

  GetTypeUserSelected() {
    let _groupUser = "CHUXE";
    if (this.props.navigation.state.params) {
      _groupUser = this.props.navigation.state.params.groupUser;
    }

    var _groupNameUser ="";
    if(_groupUser == "QUANLY"){
      _groupNameUser = "QUẢN LÝ";
    }else if(_groupUser == "CHUXE"){
      _groupNameUser = "CHỦ XE"
    }
    else if(_groupUser == "KHACH"){
      _groupNameUser = "KHÁCH"
    }

    this.setState({TYPE_USER : _groupUser, groupNameUser : _groupNameUser});
  }
  componentWillMount() {
    this.GetTypeUserSelected();
  }
  componentDidMount() {
    this.inputFullname.focus();
  }

  onInsert() {
    // if (this.state.companyname == "") {
    //   Alert.alert("Thông báo", "Chưa nhập tên công ty!");
    //   return;
    // }
    if (this.state.fullname == "") {
      Alert.alert("Thông báo", "Chưa nhập họ tên!");
      return;
    }
    if (this.state.phone == "") {
      Alert.alert("Thông báo", "Chưa nhập số điện thoại!");
      return;
    }
    if (this.state.email == "") {
      Alert.alert("Thông báo", "Chưa nhập tên tài khoản!");
      return;
    }
    if (this.state.password == "") {
      Alert.alert("Thông báo", "Chưa nhập mật khẩu!");
      return;
    }
    if (this.state.repassword == "") {
      Alert.alert("Thông báo", "Chưa nhập lại mật khẩu!");
      return;
    }
    if (this.state.repassword != this.state.password) {
      Alert.alert("Thông báo", "Nhập lại mật khẩu sai!");
      return;
    }

    this.setState({ isLoading: true });

    //Them moi chu hang
    if(this.state.TYPE_USER == 1){
      fetch(myApi.User.InsertCH, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Type: this.state.TYPE_USER,
          CompanyName: this.state.companyname,
          FullName: this.state.fullname,
          Phone: this.state.phone,
          //Email: this.state.email,
          Password: this.state.password
        })
      })
      .then(response => {
          this.setState({ isLoading: false });
          if (response.status === 200) {
            return response.json().then(responseJson => {
              if (responseJson > 0) {
                try {
                //  this.saveItem("@Logined", "1");
                  Alert.alert("Thông báo", "Tạo tài khoản thành công!");
                  this.props.navigation.navigate('Login');
                } catch (e) {
                  console.log(e);
                } finally {
                }
              } else if (responseJson == -2) {
                Alert.alert("Thông báo", "Email đã có người sử dụng!");
              } else if (responseJson == -1) {
                Alert.alert("Thông báo", "Số điện thoại đã có người sử dụng!");
              }
            });
          } else {
            Alert.alert("Thông báo", "API Lỗi, vui lòng thử lại sau!");
          }
        })

      .then(response => {
          console.debug(response);
          this.setState({ isLoading: false });
        })

      .catch(error => {
          console.error(error);
          this.setState({ isLoading: false });
          Alert.alert("Thông báo", "Lỗi kết nối, vui lòng thử lại sau!");
        });
    }
    //Them moi chu xe
    else{ //if(this.state.TYPE_USER == 2){
      let isdriver= 0;
      if(this.state.value_checkbox){
        isdriver= 1;
      }
      fetch(myApi.NguoiDung.DangKy, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          GroupUser: this.state.TYPE_USER,
          CompanyName: this.state.companyname,
          FullName: this.state.fullname,
          Username:this.state.email,
          SoDienThoai: this.state.phone,
          //Email: this.state.email,
          Password: this.state.password,
          IsDriver:isdriver
        })
      })
      .then(response => {
          this.setState({ isLoading: false });
          if (response.status === 200) {
            return response.json().then(responseJson => {
              if (responseJson.Result == true) {
                try {
                  Alert.alert("Thông báo", "Tạo tài khoản thành công!");
                  this.props.navigation.navigate('Login');
                } catch (e) {
                  console.log(e);
                } finally {
                }
              } else {
                Alert.alert("Thông báo", responseJson.ErrorMessage);
              }
            });
          } else {
            Alert.alert("Thông báo", "API Lỗi, vui lòng thử lại sau!");
          }
        })
      .then(response => {
          console.debug(response);
          this.setState({ isLoading: false });
        })

      .catch(error => {
          console.error(error);
          this.setState({ isLoading: false });
          Alert.alert("Thông báo", "Lỗi kết nối, vui lòng thử lại sau!");
        });
    }
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

        <Content>
          <View style={[styles.frm_create_acc, styles.bgf, {paddingBottom: 20}]}>
            <Text style={[styles.pd10, styles.text_blue]}>
                {this.state.groupNameUser}
            </Text>
             <KeyboardAvoidingView behavior="padding" enabled={true}>
            <View style={styles.text_group}>
            <View style={styles.mgt10}>
              <View style={styles.frmInput__item}>
                <Label style={styles.frm__label}>Họ tên</Label>
                <TextInput
                  value={this.state.fullname}
                  onChangeText={fullname => this.setState({ fullname })}
                  style={[styles.text_input]}
                  underlineColorAndroid = "transparent"
                  ref={(input)=>this.inputFullname = input}
                  returnKeyType = {"next"}
                  onSubmitEditing={() => { this.inputPhone.focus(); }}
                  blurOnSubmit={false}
                />
              </View>
            </View>
            <View style={styles.mgt10}>
              <View style={styles.frmInput__item}>
                <Label style={styles.frm__label}>Số điện thoại</Label>
                <TextInput
                  keyboardType="phone-pad"
                  value={this.state.phone}
                  onChangeText={phone => this.setState({ phone })}
                  style={styles.text_input}
                  underlineColorAndroid = "transparent"
                  ref={(input)=>this.inputPhone = input}
                  onSubmitEditing={() => { this.inputEmail.focus(); }}
                  blurOnSubmit={false}
                  returnKeyType = {"next"}
                />
              </View>
            </View>
            <View style={styles.mgt10}>
             <View style={styles.frmInput__item}>
               <Label style={styles.frm__label}>Tài khoản</Label>
               <TextInput
                 value={this.state.email}
                 onChangeText={email => this.setState({ email })}
                 style={styles.text_input}
                 underlineColorAndroid = "transparent"
                 ref={(input)=>this.inputEmail = input}
                 returnKeyType = {"next"}
                 onSubmitEditing={() => { this.inputPassword.focus(); }}
                 blurOnSubmit={false}
               />
             </View>
           </View>
            <View style={styles.mgt10}>
              <View style={styles.frmInput__item}>
                <Label style={styles.frm__label}>Mật khẩu</Label>
                <TextInput
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                  style={styles.text_input}
                  underlineColorAndroid = "transparent"
                  ref={(input)=>this.inputPassword = input}
                  returnKeyType = {"next"}
                  onSubmitEditing={() => { this.inputRePassword.focus(); }}
                  blurOnSubmit={false}
                />
              </View>
            </View>
            <View style={styles.mgt10}>
              <View style={styles.frmInput__item}>
                <Label style={styles.frm__label}>Nhập lại mật khẩu</Label>
                <TextInput
                  secureTextEntry={true}
                  value={this.state.repassword}
                  onChangeText={repassword => this.setState({ repassword })}
                  style={styles.text_input}
                  underlineColorAndroid = "transparent"
                  ref={(input)=>this.inputRePassword = input}
                />
              </View>
            </View>
            </View>
          </KeyboardAvoidingView>
          </View>
          <View style={[styles.action_bottom_2, { marginTop: 0}]}>
            <Button
              block={true}
              rounded={true}
              bordered={true}
              style={styles.frmgetpass__btn}
              onPress={this.onInsert.bind(this)}
            >
              <Text style={styles.btn_border_blue__txt}>TẠO MỚI</Text>
            </Button>
          </View>
        </Content>
        <TouchableOpacity   onPress={() =>
            this.props.navigation.navigate("Login", {groupUser:this.state.TYPE_USER})
          }  style={{position: 'absolute', bottom: 0, right: 0, padding: 24}}>
          <Text style={{color: 'red', fontSize: 13}}>Trở lại</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}
