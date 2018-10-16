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

let tabBgColor = variables.color.tabNavBgc,
  tabActiveBgColor = variables.color.tabNavActiveBgc,
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

  navToMenu() {
    this.saveItem("@TabBarActive",'1');
    this.setState({TAB_ACTIVE: 1});
    // this.props.navigation.navigate("Calendar");
  }




  navToDanhSachXe() {
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
          ]} vertical={true} onPress={() => this.navToDanhSachXe()} active={this.state.TAB_ACTIVE === 4}>
          <Ionicons name='logo-model-s' size={30} color={this.state.TAB_ACTIVE === 4 ? tabBarActiveTextColor : tabBarTextColor }/>
          <Text style={[
              st.tabBarText, {
                color: this.state.TAB_ACTIVE === 4
                  ? tabBarActiveTextColor
                  : tabBarTextColor
              }
            ]} uppercase={false}>Danh sách xe</Text>
        </Button>

        <Button style={[
            st.btnTabNav, {
              backgroundColor: this.state.TAB_ACTIVE === 1
                ? tabActiveBgColor
                : tabBgColor
            }
          ]} vertical={true} onPress={() => this.navToMenu()}
          active={this.state.TAB_ACTIVE === 1}>
          <Ionicons name='ios-options' size={30}
            color={this.state.TAB_ACTIVE === 1 ? tabBarActiveTextColor : tabBarTextColor }/>
          <Text style={[
              st.tabBarText, {
                color: this.state.TAB_ACTIVE === 1
                  ? tabBarActiveTextColor
                  : tabBarTextColor
              }
            ]} uppercase={false}>Menu</Text>
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
