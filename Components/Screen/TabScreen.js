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

const icon_tabbar_ch = "../Images/icon_tabbar_ch.png";
const icon_tabbar_ch_active = "../Images/icon_tabbar_ch_active.png";

const icon_tabbar_dh = "../Images/icon_tabbar_dh.png";
const icon_tabbar_dh_active = "../Images/icon_tabbar_dh_active.png";

const icon_tabbar_news = "../Images/icon_tabbar_news.png";
const icon_tabbar_news_active = "../Images/icon_tabbar_news_active.png";

const icon_tabbar_notification = "../Images/icon_tabbar_notification.png";
const icon_tabbar_notification_active = "../Images/icon_tabbar_notification_active.png";

const icon_tabbar_more = "../Images/icon_tabbar_more.png";
const icon_tabbar_more_active = "../Images/icon_tabbar_more_active.png";

const icon_tabbar_car = "../Images/icon_tabbar_car.png";
const icon_tabbar_car_active = "../Images/icon_tabbar_car_active.png";

let tabBgColor = 'white',
  tabActiveBgColor = globals.color.darkblue,
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
    this.getInfoUserByPhone();
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
          this.navToDonHang()
        }
        else if(parseInt(token) == 2){
          this.navToChuyenHang()
        }
        else if(parseInt(token) == 3){
          this.navToTinTuc()
        }
        else if(parseInt(token) == 4){
          this.navToThongBao()
        }
        else if(parseInt(token) == 6){
          this.navToXe()
        }
      }
    });
  }

  getInfoUserByPhone() {
    AsyncStorage.getItem("@Phone").then(token => {
      if (token !== null && token !== "") {
        this.setState({PHONE_USER: token}, function(){
          this.getTypeUser();
        });
      }
    });
  }

  getTypeUser() {
    fetch(myApi.User.GetUserInfoByPhone + this.state.PHONE_USER).then(response => response.json()).then(responseJson => {
      this.setState({
       TYPE_USER: responseJson.Type
      }, function() {});
    }).catch(error => {
      console.error(error);
    });
  }


  renderTabXe() {
    if (this.state.TYPE_USER == 1) {
      return (<Button style={[
          st.btnTabNav, {
            backgroundColor: this.state.TAB_ACTIVE === 2
              ? tabActiveBgColor
              : tabBgColor
          }
        ]} vertical={true} onPress={() => this.navToChuyenHang()}
        active={this.state.TAB_ACTIVE === 2}>
        <Image source={this.state.TAB_ACTIVE === 2
            ? require(icon_tabbar_ch_active)
            : require(icon_tabbar_ch)} style={styles.tabIcon}/>
        <Text style={[
            st.tabBarText, {
              color: this.state.TAB_ACTIVE === 2
                ? tabBarActiveTextColor
                : tabBarTextColor
            }
          ]} uppercase={false}>Chuyến hàng</Text>
      </Button>)
    }
    if (this.state.TYPE_USER == 2) {
      return (<Button style={[
          st.btnTabNav, {
            backgroundColor: this.state.TAB_ACTIVE === 6
              ? tabActiveBgColor
              : tabBgColor
          }
        ]} vertical={true} onPress={() => this.navToXe()} active={this.state.TAB_ACTIVE === 6}>
        <Image source={this.state.TAB_ACTIVE === 6
            ? require(icon_tabbar_car_active)
            : require(icon_tabbar_car)} style={styles.tabIcon}/>
        <Text style={[
            st.tabBarText, {
              color: this.state.TAB_ACTIVE === 6
                ? tabBarActiveTextColor
                : tabBarTextColor
            }
          ]} uppercase={false}>Danh sách xe</Text>
      </Button>)
    }
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
      // <Footer style={{display:this.state.TYPE_USER == -1 ? 'none' : 'flex'}}>
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
              ? require(icon_tabbar_dh_active)
              : require(icon_tabbar_dh)} style={styles.tabIcon}/>
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
              ? require(icon_tabbar_news_active)
              : require(icon_tabbar_news)} style={styles.tabIcon}/>
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
              ? require(icon_tabbar_more_active)
              : require(icon_tabbar_more)} style={styles.tabIcon}/>
          <Text style={[
              st.tabBarText, {
                color: this.state.TAB_ACTIVE === 5
                  ? tabBarActiveTextColor
                  : tabBarTextColor
              }
            ]} uppercase={false}>Lịch sử</Text>
        </Button>


        <Button style={[
            st.btnTabNav, {
              backgroundColor: this.state.TAB_ACTIVE === 4
                ? tabActiveBgColor
                : tabBgColor
            }
          ]} vertical={true} onPress={() => this.navToThongBao()} active={this.state.TAB_ACTIVE === 4}>
          <Image source={this.state.TAB_ACTIVE === 4
              ? require(icon_tabbar_notification_active)
              : require(icon_tabbar_notification)} style={styles.tabIcon}/>
          <Text style={[
              st.tabBarText, {
                color: this.state.TAB_ACTIVE === 4
                  ? tabBarActiveTextColor
                  : tabBarTextColor
              }
            ]} uppercase={false}>Thông báo</Text>
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
