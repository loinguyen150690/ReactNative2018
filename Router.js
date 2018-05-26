import React, {Component} from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {Image} from 'react-native';
import Login from './Components/Screen/Login.js';
import FogotPass from './Components/Screen/FogotPass.js';
import NewPass from './Components/Screen/NewPass.js';
import CreateAccount from './Components/Screen/CreateAccount.js';
import EnterPhoneNumber from './Components/Screen/EnterPhoneNumber.js';
import Home from './Components/Screen/Home.js';
import ListNews from './Components/Screen/ListNews.js';
import ListNotification from './Components/Screen/FriendsList.js';
import More from './Components/Screen/More.js';
import HangHoaDichVu from './Components/Screen/HangHoaDichVu.js';
import ChuyenHang from './Components/Screen/DanhSachChuyenHang.js';
import ThongTinGiaoNhan from './Components/Screen/ThongTinGiaoNhan.js';
import DetailChuyenHang from './Components/Screen/DetailChuyenHang.js';
import ScanQRCodeScreen from './Components/Screen/Camera.js';
import ChatScreen from './Components/Screen/Chat.js';


//Danh sach chuyen change

import globals from './Components/Styles/Globals.js';
import styles from './Components/Styles/Styles.js';

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firebase from 'firebase';

//Icon tabbar navigation
const icon_tabbar_home = './Components/images/icon_tabbar_home.png';
const icon_tabbar_home_active = './Components/images/icon_tabbar_home_active.png';

const icon_tabbar_news = './Components/images/icon_tabbar_news.png';
const icon_tabbar_news_active = './Components/images/icon_tabbar_news_active.png';

const icon_tabbar_notification = './Components/images/icon_tabbar_notification.png';
const icon_tabbar_notification_active = './Components/images/icon_tabbar_notification_active.png';

const icon_tabbar_more = './Components/images/icon_tabbar_more.png';
const icon_tabbar_more_active = './Components/images/icon_tabbar_more_active.png';
var config = {
   apiKey: "AIzaSyDgwAeVWyT3MMYQpU_MK7oFHqgym_IRCO8",
   authDomain: "bluedata-a6730.firebaseapp.com",
   databaseURL: "https://bluedata-a6730.firebaseio.com",
   projectId: "bluedata-a6730",
   storageBucket: "bluedata-a6730.appspot.com",
   messagingSenderId: "8182945351"
 };
firebase.initializeApp(config);
const BottomTabNav = TabNavigator({
  ChuyenHang: {
    screen: ChuyenHang,
    navigationOptions: {
      title: 'Danh sách chuyến hàng',
      tabBarLabel: 'Shippers',
      tabBarIcon: ({tintColor}) => (
        tintColor == globals.color.activeColorTabbar
        ? <Image source={require(icon_tabbar_home)} style={[
            styles.tabIcon, {
              tintColor: tintColor
            }
          ]}/>
        : <Image source={require(icon_tabbar_home_active)} style={[
            styles.tabIcon, {
              tintColor: tintColor
            }
          ]}/>)
    }
  },
  ListNews: {
    screen: ListNews,
    navigationOptions: {
      title: 'Tin tức',
      tabBarLabel: 'Tin tức',
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center'
      },
      headerBackImage: null,
      tabBarIcon: ({tintColor}) => (
        tintColor == globals.color.activeColorTabbar
        ? <Image source={require(icon_tabbar_news)} style={[
            styles.tabIcon, {
              tintColor: tintColor
            }
          ]}/>
        : <Image source={require(icon_tabbar_news_active)} style={[
            styles.tabIcon, {
              tintColor: tintColor
            }
          ]}/>)
    }
  },
  ListNotification: {
    screen: ListNotification,
    navigationOptions: {
      title: 'Thông báo',
      tabBarLabel: 'Thông báo',
      headerBackImage: null,
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center'
      },
      tabBarIcon: ({tintColor}) => (
        tintColor == globals.color.activeColorTabbar
        ? <Image source={require(icon_tabbar_notification)} style={[
            styles.tabIcon, {
              tintColor: tintColor
            }
          ]}/>
        : <Image source={require(icon_tabbar_notification_active)} style={[
            styles.tabIcon, {
              tintColor: tintColor
            }
          ]}/>)
    }
  },
  More: {
    screen: More,
    navigationOptions: {
      title: 'Thêm',
      tabBarLabel: 'Thêm',
      headerBackImage: null,
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center'
      },
      tabBarIcon: ({tintColor}) => (
        tintColor == globals.color.activeColorTabbar
        ? <Image source={require(icon_tabbar_more)} style={[
            styles.tabIcon, {
              tintColor: tintColor
            }
          ]}/>
        : <Image source={require(icon_tabbar_more_active)} style={[
            styles.tabIcon, {
              tintColor: tintColor
            }
          ]}/>)
    }
  }
}, {
  navigationOptions: {
    activeTintColor: globals.color.activeColorTabbar,
    headerBackImage: null,
    headerBackTitle: null,
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'stretch',
    },
  },
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    iconStyle: styles.icon,
    style: styles.tabBar,
    upperCaseLabel: false,
    labelStyle: styles.labelTabBar,
    indicatorStyle: styles.indicatorTabBar,
    inactiveTintColor: globals.color.grey,
    activeTintColor: globals.color.activeColorTabbar,
    activeBackgroundColor: globals.color.darkblue, //not change on android, only ios
    tabBarSelectedItemStyle: styles.tabBarSelectedItemStyle
  }
});

export const RootStack = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: '',
      header: null
    }
  },
  HomePage: {
    screen: BottomTabNav,
    navigationOptions: {
    }
  },
  EnterPhoneNumber: {
    screen: EnterPhoneNumber,
    navigationOptions: {
      title: 'Quên mật khẩu',
      headerBackTitle: null,
    }
  },
  FogotPass: {
    screen: FogotPass,
    navigationOptions: {
      title: 'Nhập mã xác nhận',
      headerBackTitle: null,
    }
  },
  NewPass: {
    screen: NewPass,
    navigationOptions: {
      title: 'Đặt lại mật khẩu',
      headerBackTitle: null,
    }
  },
  CreateAccount: {
    screen: CreateAccount,
    navigationOptions: {
      title: 'Tạo tài khoản',
      headerBackTitle: null,
    }
  }
  ,
  HangHoaDichVu: {
    screen: HangHoaDichVu,
    navigationOptions: {
      title:'Hàng hóa dịch vụ'
    }
  }
  ,
  ThongTinGiaoNhan: {
    screen: ThongTinGiaoNhan,
    navigationOptions: {
       title:'Thông tin giao nhận',
      headerBackTitle: null,
    },
  }
  ,
  ScanQRCode: {
    screen: ScanQRCodeScreen,
    navigationOptions: {
       header: null,
       headerBackTitle: null,
    },
  }
  ,

  DetailChuyenHang: {
    screen: DetailChuyenHang,
    navigationOptions: {
    },
  }
  ,
  Chat: {
    screen: ChatScreen,
    navigationOptions: {
    },
  }
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: globals.color.darkblue
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      alignItems: 'center'
    }
  },
  initialRouteName: 'HomePage',
});
