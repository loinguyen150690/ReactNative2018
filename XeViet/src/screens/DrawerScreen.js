import React, {Component} from "react";
import {
  Image,
  View,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  Alert
} from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Thumbnail,
  Footer
} from "native-base";

import navstyle from "../styles/nav.js";
import globals from "../styles/variables";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const background_user = "../images/background_user.jpg";
const user_img_1 = "../images/user1.png";

export default class DrawerScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      NAME_USER: '',
      PHONE_USER: '',
      TYPE_USER: -1,
      refreshing: false
    };
  }
  componentWillMount() {}

  navToQuanLyTaiXe() {
    //this.props.navigation.navigate("DanhSachTaiXe")
  }
  navToDanhSachXe() {
    //this.props.navigation.navigate("DanhSachXe");
  }
  navtoChangePassword() {
  //  this.props.navigation.navigate("ChangePassword")
  }

  natoUpdateProfile() {
  //  this.props.navigation.navigate("UpdateProfile")
  }
  navtoTroGiup() {
    //this.props.navigation.navigate("TroGiup")
  }
  navtoGopY() {
    //this.props.navigation.navigate("GopY")
  }
  navtoAbout() {
  //  this.props.navigation.navigate("About")
  }
  async userLogout() {
    try {
      await AsyncStorage.removeItem("@Logined");
    } catch (error) {
      console.log("AsyncStorage error: " + error.message);
    }
  }

  render() {
    return (<Container>
      <Content>
        <View style={navstyle.user_info}>
          <Image source={require(background_user)} style={navstyle.background_user}/>
          <Thumbnail style={navstyle.user_img} source={require(user_img_1)}/>
          <Text style={navstyle.user_txt}>{this.state.NAME_USER}</Text>
          <Text style={navstyle.user_txt}>{this.state.PHONE_USER}</Text>
        </View>
        <List style={{
            backgroundColor: "#fff"
          }}>
          <ListItem itemDivider={true}>
            <Text style={navstyle.nav__itemDivider}>Quản lý tài khoản</Text>
          </ListItem>
          <ListItem icon="icon" onPress={this.navtoChangePassword.bind(this)}>
            <Left>
              <MaterialIcons style={navstyle.nav__icon} name="autorenew"/>
            </Left>
            <Body>
              <Text style={navstyle.nav__text}>Thay đổi mật khẩu</Text>
            </Body>
            <Right>
              <MaterialIcons style={navstyle.nav__icon_arrow_right} name="chevron-right"/>
            </Right>
          </ListItem>
          <ListItem icon="icon" style={{
              display: this.state.TYPE_USER == 5
                ? 'none'
                : 'flex'
            }} onPress={this.natoUpdateProfile.bind(this)}>
            <Left>
              <MaterialIcons style={navstyle.nav__icon} name="create"/>
            </Left>
            <Body>
              <Text style={navstyle.nav__text}>Cập nhật tài khoản</Text>
            </Body>
            <Right>
              <MaterialIcons style={navstyle.nav__icon_arrow_right} name="chevron-right"/>
            </Right>
          </ListItem>

          <ListItem style={{
              display: this.state.TYPE_USER == 2
                ? 'flex'
                : 'none'
            }} icon="icon" onPress={this.navToDanhSachXe.bind(this)}>
            <Left>
              <MaterialIcons style={navstyle.nav__icon} name="directions-car"/>
            </Left>
            <Body>
              <Text style={navstyle.nav__text}>Quản lý xe</Text>
            </Body>
            <Right>
              <MaterialIcons style={navstyle.nav__icon_arrow_right} name="chevron-right"/>
            </Right>
          </ListItem>

          <ListItem style={{
              display: this.state.TYPE_USER == 2
                ? 'flex'
                : 'none'
            }} icon="icon" onPress={this.navToQuanLyTaiXe.bind(this)}>
            <Left>
              <MaterialIcons style={navstyle.nav__icon} name="business-center"/>
            </Left>
            <Body>
              <Text style={navstyle.nav__text}>Quản lý tài xế</Text>
            </Body>
            <Right>
              <MaterialIcons style={navstyle.nav__icon_arrow_right} name="chevron-right"/>
            </Right>
          </ListItem>
          <ListItem itemDivider={true}>
            <Text style={navstyle.nav__itemDivider}>Hỗ trợ</Text>
          </ListItem>

          <ListItem icon="icon">
            <Left>
              <FontAwesome style={navstyle.nav__icon} name="file-text-o"/>
            </Left>
            <Body>
              <Text style={navstyle.nav__text}>Điều khoản chính sách</Text>
            </Body>
            <Right>
              <MaterialIcons style={navstyle.nav__icon_arrow_right} name="chevron-right"/>
            </Right>
          </ListItem>
          <ListItem icon="icon" onPress={this.navtoTroGiup.bind(this)}>
            <Left>
              <FontAwesome style={navstyle.nav__icon} name="question"/>
            </Left>
            <Body>
              <Text style={navstyle.nav__text}>Trợ giúp</Text>
            </Body>
            <Right>
              <MaterialIcons style={navstyle.nav__icon_arrow_right} name="chevron-right"/>
            </Right>
          </ListItem>
          <ListItem icon="icon" onPress={this.navtoGopY.bind(this)}>
            <Left>
              <FontAwesome style={navstyle.nav__icon} name="comment"/>
            </Left>
            <Body>
              <Text style={navstyle.nav__text}>Góp ý</Text>
            </Body>
            <Right>
              <MaterialIcons style={navstyle.nav__icon_arrow_right} name="chevron-right"/>
            </Right>
          </ListItem>

          <ListItem icon="icon" onPress={this.navtoAbout.bind(this)}>
            <Left>
              <FontAwesome style={navstyle.nav__icon} name="asterisk"/>
            </Left>
            <Body>
              <Text style={navstyle.nav__text}>Phiên bản</Text>
            </Body>
            <Right>
              <MaterialIcons style={navstyle.nav__icon_arrow_right} name="chevron-right"/>
            </Right>
          </ListItem>

        </List>
      </Content>
      <Footer style={{
          backgroundColor: "#fff",
          paddingLeft: 20
        }}>
        <TouchableOpacity onPress={() => this.userLogout()} style={{
            flex: 1,
            flexDirection: "row"
          }}>
          <Left style={{
              flex: 1
            }}>
            <FontAwesome style={navstyle.nav__icon} name="sign-out"/>
          </Left>
          <Body style={{
              flex: 6
            }}>
            <Text style={navstyle.nav__text}>Đăng xuất</Text>
          </Body>
        </TouchableOpacity>
      </Footer>
    </Container>);
  }
}
