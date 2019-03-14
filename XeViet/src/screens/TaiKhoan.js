import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  Modal,
  Alert
} from 'react-native';
import {
  Button,
  Form,
  Input,
  Item,
  Label,
  Footer,
  Content,
  Spinner,
  Thumbnail,
  Container
} from "native-base";
import styles from "../styles/styles.js";
import globals from "../styles/variables.js";
const user_img_1 = "../images/user1.png";
import InfoUser from "../common/InfoUser.js";
import myApi from "../common/api.js";
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
     user:null,
     modalVisible: false,
     userId:null,
     fullname: "",
     phone: "",
     email: "",
     username:"",
     password: "",
     repassword: "",
     groupUser: null,
     isLoading: false
    }
  }

  GetInfoUser() {
    InfoUser(responseJson => {
      if(responseJson){
        this.setState({
          user:responseJson,
          userId:responseJson.UserId,
          fullname:responseJson.FullName,
          phone:responseJson.SoDienThoai,
          username:responseJson.Username,
          groupUser:responseJson.GroupUser
          //email:responseJson
        });
      }
    });
  }

  componentWillMount() {
    this.GetInfoUser();
  }

  UpdateProfile() {
    if (this.state.repassword && !this.state.password) {
      Alert.alert("Thông báo", "Chưa nhập mật khẩu!");
      return;
    }
    else if (this.state.password && !this.state.repassword) {
      Alert.alert("Thông báo", "Chưa nhập lại mật khẩu!");
      return;
    }
    else if (this.state.repassword != this.state.password) {
      Alert.alert("Thông báo", "Nhập lại mật khẩu sai!");
      return;
    }

    //this.setState({isLoading:true});
    fetch(myApi.NguoiDung.DangKy, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        UserId:this.state.userId,
        GroupUser: this.state.groupUser,
        FullName: this.state.fullname,
        Username:this.state.username,
        SoDienThoai: this.state.phone,
        Password: this.state.password
      })
    })
    .then(response => {
        //this.setState({ isLoading: false });
        if (response.status === 200) {
          return response.json().then(responseJson => {
            if (responseJson.Result == true) {
              try {
                var user_tmp = this.state.user;
                user_tmp.FullName = this.state.fullname;
                user_tmp.SoDienThoai = this.state.phone;
                this.saveItem("@UserInfo", JSON.stringify(user_tmp))
                Alert.alert("Thông báo", "Cập nhật thông tin thành công!");
              } catch (e) {
                Alert.alert("Thông báo", e);
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
        //this.setState({ isLoading: false });
      })

    .catch(error => {
        console.error(error);
        //this.setState({ isLoading: false });
        Alert.alert("Thông báo", "Lỗi kết nối, vui lòng thử lại sau!");
      });
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  }

  async removeItem(item) {
    try {
        await AsyncStorage.removeItem(item);
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  }

  async userLogout() {
      try {
        // await AsyncStorage.clear();
        // await AsyncStorage.removeItem("@Phone");
        await AsyncStorage.removeItem("@Logined");
        this.props.navigation.navigate("LoginStack");
      } catch (error) {
        console.log("AsyncStorage error: " + error.message);
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
         onRequestClose={() =>this.setState({isLoading: false})}
         >
         <View style={styles.loadingView}>
           <Spinner
             style={styles.spinerLoading}
             color={globals.color.loading}
           />
         </View>
       </Modal>
       <Content>
         <View
           style={{
             textAlign: "center",
             flex: 1,
             flexDirection: "row",
             justifyContent: "center",
             marginTop: 20
           }}
           >
           <Thumbnail style={styles.user_img} source={require(user_img_1)} />
         </View>
         <View style={styles.pd10}>
         <View style={styles.mgt10}>
          <View style={styles.frmInput__item}>
            <Label style={styles.frm__label}>Tài khoản</Label>
            <TextInput
              editable={false} selectTextOnFocus={false}
              value={this.state.username}
              onChangeText={email => this.setState({ username })}
              style={styles.text_input}
              underlineColorAndroid = "transparent"
              ref={(input)=>this.inputUsername = input}
              returnKeyType = {"next"}
              onSubmitEditing={() => { this.fullname.focus(); }}
              blurOnSubmit={false}
            />
          </View>
        </View>
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
                 style={[styles.text_input]}
                 underlineColorAndroid = "transparent"
                 ref={(input)=>this.inputPhone = input}
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
           <View style={styles.mgt30}>
             <Button
               block={true}
               bordered={true}
               rounded={true}
               style={styles.frmgetpass__btn}
                 onPress={this.UpdateProfile.bind(this)}
               >
                 <Text style={styles.btn_border_blue__txt}>CẬP NHẬT</Text>
             </Button>
           </View>

           <View style={styles.mgt30}>
             <Button
               block={true}
               bordered={true}
               rounded={true}
               style={styles.frmgetpass__btn}
                 onPress={()=> this.userLogout()}
               >
                 <Text style={styles.btn_border_blue__txt}>ĐĂNG XUẤT</Text>
             </Button>
           </View>
         </View>


       </Content>
     </Container>);
  }
}
