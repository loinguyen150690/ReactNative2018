import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  Modal
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

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      phone: "",
      email: "",
      isLoading: false
    }
  }
  UpdateProfile() {
    this.setState({isLoading:true});
    setTimeout(()=>{
        this.setState({isLoading:false});
    },5000);
  }

  async userLogout() {
      try {
        // await AsyncStorage.clear();
        // await AsyncStorage.removeItem("@Phone");
        await AsyncStorage.removeItem("@Logined");
        await AsyncStorage.removeItem("@UserName");
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
                  autoFocus={true}
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
                  onSubmitEditing={() => { this.inputEmail.focus(); }}
                  blurOnSubmit={false}
                />
              </View>
            </View>
            <View style={styles.mgt10}>
              <View style={styles.frmInput__item}>
                <Label style={styles.frm__label}>Email</Label>
                <TextInput
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
                  style={[styles.text_input]}
                  underlineColorAndroid = "transparent"
                  ref={(input)=>this.inputEmail = input}
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

            <View style={styles.mgt10}>
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
      </Container>


      );
  }
}
