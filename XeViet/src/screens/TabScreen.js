import React, {Component} from "react";
import {
  Image,
  StyleSheet,
  AsyncStorage
} from "react-native";
import {
  Footer,
  FooterTab,
  Button,
  Text,
} from "native-base";

import styles from "../styles/styles";
import variables from "../styles/variables";
import Ionicons from "react-native-vector-icons/Ionicons";
//Icon tabbar navigation
const icon_tabbar_home = "../images/icon_tabbar_home.png";
const icon_tabbar_home_active = "../images/icon_tabbar_home_active.png";

const icon_tabbar_ch = "../images/icon_tabbar_ch.png";
const icon_tabbar_ch_active = "../images/icon_tabbar_ch_active.png";

const icon_tabbar_dh = "../images/icon_tabbar_dh.png";
const icon_tabbar_dh_active = "../images/icon_tabbar_dh_active.png";

const icon_tabbar_news = "../images/icon_tabbar_news.png";
const icon_tabbar_news_active = "../images/icon_tabbar_news_active.png";

const icon_tabbar_notification = "../images/icon_tabbar_notification.png";
const icon_tabbar_notification_active = "../images/icon_tabbar_notification_active.png";

const icon_tabbar_more = "../images/icon_tabbar_more.png";
const icon_tabbar_more_active = "../images/icon_tabbar_more_active.png";

const icon_tabbar_car = "../images/icon_tabbar_car.png";
const icon_tabbar_car_active = "../images/icon_tabbar_car_active.png";

let tabBgColor = 'white',
  tabActiveBgColor = variables.color.darkblue,
  tabBarTextColor = variables.color.tabNav,
  tabBarActiveTextColor = variables.color.tabNavActive;

let fz = 10;

export default class TabScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      TAB_ACTIVE: 4,
    };
  };
  componentWillMount() {

  }
  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  }

  navToDonHang() {
    this.saveItem("@TabBarActive",'1');
    this.setState({TAB_ACTIVE: 1});
    this.props.navigation.navigate("Calendar");
  }


  navToTinTuc() {
    this.setState({TAB_ACTIVE: 3});
    this.saveItem("@TabBarActive",'3');
   // this.props.navigation.navigate("Chart");
  }

  navToThongBao() {
    this.setState({TAB_ACTIVE: 4});
    this.saveItem("@TabBarActive",'4');
    this.props.navigation.navigate("DanhSachXe");
  }

  navDrawer() {
    this.setState({TAB_ACTIVE: 5});
  }
  render() {
    return (<Footer style={{display:this.state.TYPE_USER == -1 ? 'none' : 'flex'}}>
      <FooterTab style={styles.footerTab} tabBarActiveTextColor='#000'>



        <Button style={[
            st.btnTabNav, {
              backgroundColor: this.state.TAB_ACTIVE === 4
                ? tabActiveBgColor
                : tabBgColor
            }
          ]} vertical={true} onPress={() => this.navToThongBao()} active={this.state.TAB_ACTIVE === 4}>
          <Image source={this.state.TAB_ACTIVE === 4
              ? require(icon_tabbar_car_active)
              : require(icon_tabbar_car)} style={styles.tabIcon}/>
          <Text style={[
              st.tabBarText, {
                color: this.state.TAB_ACTIVE === 4
                  ? tabBarActiveTextColor
                  : tabBarTextColor
              }
            ]} uppercase={false}>Xe</Text>
        </Button>

        <Button style={[
            st.btnTabNav, {
              backgroundColor: this.state.TAB_ACTIVE === 5
                ? tabActiveBgColor
                : tabBgColor
            }
          ]} vertical={true} onPress={() => this.navDrawer()} active={this.state.TAB_ACTIVE === 5}>
          <Image source={this.state.TAB_ACTIVE === 5
              ? require(icon_tabbar_more_active)
              : require(icon_tabbar_more)} style={styles.tabIcon}/>
          <Text style={[
              st.tabBarText, {
                color: this.state.TAB_ACTIVE === 5
                  ? tabBarActiveTextColor
                  : tabBarTextColor
              }
            ]} uppercase={false}>...</Text>
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
