import React, {Component} from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  AsyncStorage
} from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge
} from "native-base";

import styles from "../Styles/Styles.js";
import globals from "../Styles/Globals.js";
import myApi from "../Fetch/Api.js";

//Icon tabbar navigation
const icon_tabbar_home = "../Images/icon_tabbar_home.png";
const icon_tabbar_home_active = "../Images/icon_tabbar_home_active.png";

const icon_tabbar_kich_hoat = "../Images/icon_tabbar_kich_hoat.png";
const icon_tabbar_kich_hoat_active = "../Images/icon_tabbar_kich_hoat_active.png";

const icon_tabbar_thong_bao = "../Images/icon_tabbar_thong_bao.png";
const icon_tabbar_thong_bao_active = "../Images/icon_tabbar_thong_bao_active.png";

const icon_tabbar_lich_su = "../Images/icon_tabbar_lich_su.png";
const icon_tabbar_lich_su_active = "../Images/icon_tabbar_lich_su_active.png";


let tabBgColor = 'white',
  tabActiveBgColor = 'white',
  tabBarTextColor = globals.color.tabNav,
  tabBarActiveTextColor = globals.color.tabNavActive;

let fz = 10;

export default class TabScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      TAB_ACTIVE: 1,
      PHONE_USER: '',
      TYPE_USER: -1
    };
  };
  componentWillMount() {
    this.getTabBarActive()
  }
  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  }

  getTabBarActive() {
    AsyncStorage.getItem("@TabBarActive").then(token => {
      if (token !== null && token !== "") {
        this.setState({TAB_ACTIVE: parseInt(token)});
        if(parseInt(token) == 1){
          this.navToTrangChu()
        }
        else if(parseInt(token) == 3){
          this.navToKichHoat()
        }
        else if(parseInt(token) == 4){
          this.navToThongBao()
        }
        else if(parseInt(token) == 5){
          this.navToLichSu()
        }
      }
    });
  }




  navToTrangChu() {
    this.saveItem("@TabBarActive",'1');
    this.setState({TAB_ACTIVE: 1});
    this.props.navigation.navigate("TrangChu");
  }


  navToKichHoat() {
    this.setState({TAB_ACTIVE: 3});
    this.saveItem("@TabBarActive",'3');
    this.props.navigation.navigate("KichHoat");
  }

  navToThongBao() {
    this.setState({TAB_ACTIVE: 4});
    this.saveItem("@TabBarActive",'4');
    this.props.navigation.navigate("DanhSachThongBao");
  }

  navToLichSu() {
    this.setState({TAB_ACTIVE: 5});
    this.saveItem("@TabBarActive",'5');
    this.props.navigation.navigate("LichSu");
  }

  render() {
    return (
      <Footer>
      <FooterTab style={styles.footerTab} tabBarActiveTextColor='#000'>
        <Button style={[
            st.btnTabNav, {
              backgroundColor: this.state.TAB_ACTIVE === 1
                ? tabActiveBgColor
                : tabBgColor
            }
          ]} vertical={true} active={this.state.TAB_ACTIVE === 1} onPress={() => this.navToTrangChu()}>
          <Image source={this.state.TAB_ACTIVE === 1
              ? require(icon_tabbar_home_active)
              : require(icon_tabbar_home)} style={styles.tabIcon}/>
          <Text style={[
              st.tabBarText, {
                color: this.state.TAB_ACTIVE === 1
                  ? tabBarActiveTextColor
                  : tabBarTextColor
              }
            ]} uppercase={false}>Trang chủ</Text>

        </Button>


        <Button style={[
            st.btnTabNav, {
              backgroundColor: this.state.TAB_ACTIVE === 3
                ? tabActiveBgColor
                : tabBgColor
            }
          ]} vertical={true} onPress={() => this.navToKichHoat()} active={this.state.TAB_ACTIVE === 3}>
          <Image source={this.state.TAB_ACTIVE === 3
              ? require(icon_tabbar_kich_hoat_active)
              : require(icon_tabbar_kich_hoat)} style={styles.tabIcon}/>
          <Text style={[
              st.tabBarText, {
                color: this.state.TAB_ACTIVE === 3
                  ? tabBarActiveTextColor
                  : tabBarTextColor
              }
            ]} uppercase={false}>Kích hoạt</Text>
        </Button>

        <Button style={[
            st.btnTabNav, {
              backgroundColor: this.state.TAB_ACTIVE === 5
                ? tabActiveBgColor
                : tabBgColor
            }
          ]} vertical={true} onPress={() => this.navToLichSu()} active={this.state.TAB_ACTIVE === 5}>
          <Image source={this.state.TAB_ACTIVE === 5
              ? require(icon_tabbar_lich_su_active)
              : require(icon_tabbar_lich_su)} style={styles.tabIcon}/>
          <Text style={[
              st.tabBarText, {
                color: this.state.TAB_ACTIVE === 5
                  ? tabBarActiveTextColor
                  : tabBarTextColor
              }
            ]} uppercase={false}>Lịch sử</Text>
        </Button>


    
      </FooterTab>
    </Footer>);
  }
}

const st = StyleSheet.create({
  tabBarText: {
    fontSize: fz,
    paddingLeft: 0,
    paddingRight: 0
  },
  emptyDate: {},
  btnTabNav: {
    borderRadius: 0,
    paddingTop: 8,
    paddingBottom: 8
  }
});
