import React, {Component} from "react";
import {
  Platform,
  Dimensions,
  Alert,
  TouchableOpacity,
  Text,
  Button,
  AsyncStorage
} from "react-native";
import {StackNavigator, TabNavigator, DrawerNavigator} from "react-navigation";
const win = Dimensions.get("window");
import Login from "./Components/Screen/Login.js";
import QuenMatKhau from "./Components/Screen/QuenMatKhau.js";
import DangKy from "./Components/Screen/DangKy.js";
import NewPass from "./Components/Screen/NewPass.js";
import Home from "./Components/Screen/Home.js";
import ListNews from "./Components/Screen/ListNews.js";
import DanhSachThongBao from "./Components/Screen/DanhSachThongBao.js";
import ScanQRCodeScreen from "./Components/Screen/Camera.js";
import LichSu from "./Components/Screen/LichSu.js";
import KichHoat from "./Components/Screen/KichHoat.js";
import TrangChu from "./Components/Screen/TrangChu.js";
import HoiDap from "./Components/Screen/HoiDap.js";
import Intro from "./Components/Screen/Intro.js";
import ChatScreen from './Components/Screen/Chat.js';
import TabScreen from "./Components/Screen/TabScreen.js";
//Danh sach chuyen change

import globals from "./Components/Styles/Globals.js";
import styles from "./Components/Styles/Styles.js";

//LoiNguyen @20180526 : firebase init
import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyDgwAeVWyT3MMYQpU_MK7oFHqgym_IRCO8",
  authDomain: "bluedata-a6730.firebaseapp.com",
  databaseURL: "https://bluedata-a6730.firebaseio.com",
  projectId: "bluedata-a6730",
  storageBucket: "bluedata-a6730.appspot.com",
  messagingSenderId: "8182945351"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
//end firebase

export const LoginStack = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  QuenMatKhau: {
    screen: QuenMatKhau,
    navigationOptions: {
      title: "Quên mật khẩu"
    }
  },
  DangKy: {
    screen: DangKy,
    navigationOptions: {
      title: "Tạo tài khoản"
    }
  }
}, {
  navigationOptions: {
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: globals.color.darkblue,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 0,
      marginLeft: 0
    },
    headerTintColor: globals.color.headerTitle,
    headerTitleStyle: {
      fontWeight: "bold",
      textAlign: "center",
      alignItems: "center",
      fontSize: globals.fontSize.headerTitle,
      paddingLeft: 0,
      marginLeft: 0
    }
  },
  initialRouteName: "Login"
})

export const RootTab = TabNavigator({
  TrangChu: {
    screen: TrangChu,
    navigationOptions: {
      title: "Trang chủ",
      tabBarLabel: "Trang chủ"
    }
  },
  KichHoat: {
    screen: KichHoat,
    navigationOptions: {
      title: "Kích hoạt",
      tabBarLabel: "Trang chủ"
    }
  },
  DanhSachThongBao: {
    screen: DanhSachThongBao,
    navigationOptions: {
      title: "Thong bao",
      tabBarLabel: "Thong bao"
    }
  },

  LichSu: {
    screen: LichSu,
    navigationOptions: {
      title: "LichSu",
      tabBarLabel: "Lich su"
    }
  }
}, {
  navigationOptions: {
    activeTintColor: globals.color.tabNavActive,
    headerBackImage: null,
    headerBackTitle: null,
    headerLeft: null,
    headerTitleStyle: {
      color: globals.color.headerTitle,
      fontSize: globals.fontSize.headerTitle,
      textAlign: "center",
      alignSelf: "stretch",
      flex: 1,
      alignItems: 'center',
      paddingLeft: 0,
      marginLeft: 0
    }
  },
  tabBarPosition: "bottom",
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
  tabBarComponent: props => {
    const {navigate, navigationState} = props
    const jumpToIndex = index => {
      const lastPosition = navigationState.index
      const tab = navigationState.routes[index]
      const tabRoute = tab.routeName
      const firstTab = tab.routes[0].routeName
      lastPosition !== index && navigation.dispatch(pushNavigation(tabRoute))
      lastPosition === index && navigation.dispatch(resetNavigation(firstTab))
    }
    return <TabScreen {...props} jumpToIndex={jumpToIndex}/>
  },
  tabBarOptions: {
    showIcon: true,
    iconStyle: styles.icon,
    style: styles.tabBar,
    upperCaseLabel: false,
    labelStyle: styles.labelTabBar,
    indicatorStyle: styles.indicatorTabBar,
    inactiveTintColor: globals.color.tabNav,
    activeTintColor: globals.color.tabNavActive,
    activeBackgroundColor: globals.color.darkblue, //not change on android, only ios
    tabBarSelectedItemStyle: styles.tabBarSelectedItemStyle
  }
});
export const RootStack = StackNavigator({
  HomePage: {
    screen: RootTab
  },
  ScanQRCode: {
    screen: ScanQRCodeScreen
  },
  Chat: {
    screen: ChatScreen
  }
}, {
  navigationOptions: {
    headerBackTitle: null,
    headerBackStyle: {
      position: 'absolute'
    },
    headerStyle: {
      backgroundColor: globals.color.darkblue,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 0,
      marginLeft: 0,
      flex: 1,
      width: win.width
    },
    headerTintColor: globals.color.headerTitle,
    headerTitleStyle: {
      width: win.width,
      flex: 1,
      fontWeight: "bold",
      textAlign: "center",
      alignItems: "center",
      fontSize: globals.fontSize.headerTitle,
      paddingLeft: 0,
      marginLeft: 0
    }
  },
  initialRouteName: "HomePage"
});

export default RootDrawer = DrawerNavigator(
  {
  Login: {
    screen: LoginStack
  },
  Home: {
    screen: RootStack
  }
});
