import React, { Component } from "react";
import {Platform, Dimensions, StyleSheet} from "react-native";
const win = Dimensions.get("window");
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from "react-navigation";

import variables  from "./src/styles/variables.js";
import styles     from "./src/styles/styles.js";

import DrawerScreen   from "./src/screens/DrawerScreen.js";
import TabScreen   from "./src/screens/TabScreen.js";
import Calendar   from "./src/screens/Calendar.js";
import TaiKhoan from "./src/screens/TaiKhoan.js";
import Test2 from "./src/screens/Test2.js";
import Test3 from "./src/screens/Test3.js";
import DanhSachXe   from "./src/screens/DanhSachXe.js";
import UserOption   from "./src/screens/UserOption.js";
import Login from "./src/screens/Login.js";
import CreateAccount from "./src/screens/CreateAccount.js";


const MenuRightStack = StackNavigator(
  {
    Test2: {
      screen: Test2,
      navigationOptions: {
        title: "Tét"
      }
    },

  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerLeft: null,
      headerStyle: {
       backgroundColor: variables.color.darkblue,
        //alignItems: "center",
        textAlign: 'center'
      },
      headerTintColor: variables.color.headerTitle,
      headerTitleStyle: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
        alignItems: "center",
       fontSize: variables.fontSize.headerTitle
      }
    }
  }
);

export const RootTab = TabNavigator(
  {
    DanhSachXe: {
      screen: DanhSachXe,
      navigationOptions: {
        title: "Danh sách xe"
      }
    },
    TaiKhoan: {
      screen: TaiKhoan,
      navigationOptions: {
        title: "Tài khoản"
      }
    },
  },
  {
    navigationOptions: {
    activeTintColor: variables.color.tabNavActive,
     headerBackImage: null,
     headerBackTitle: null,
     headerLeft: null,
      headerTitleStyle: {
       color: variables.color.headerTitle,
        fontSize: variables.fontSize.headerTitle,
        textAlign: "center",
        alignSelf: "stretch",
        paddingLeft: 0,
        marginLeft: 0
      }
    },
   tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarComponent: props =>{
      const {navigate, navigationState} = props
      const jumpToIndex = index =>{
        const lastPosition = navigationState.index
        const tab= navigationState.routes[index]
        const tabRoute = tab.routeName
        const firstTab = tab.routes[0].routeName
        lastPosition !== index && navigation.dispatch(pushNavigation(tabRoute))
        lastPosition === index && navigation.dispatch(resetNavigation(firstTab))
      }
      return  <TabScreen {...props} jumpToIndex={jumpToIndex} />
    },
    tabBarOptions: {
      showIcon: true,
      upperCaseLabel: false,
    },
	   initialRouteName: "DanhSachXe"
});

export const IntroStack = StackNavigator({
  Test3: {
    screen: Test3,
    navigationOptions: {
      header: null
    }
  },
},
{
  navigationOptions: {
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: variables.color.darkblue,
      paddingLeft: 0,
      marginLeft: 0
    },
    headerTintColor: variables.color.headerTitle,
    headerTitleStyle: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: variables.fontSize.headerTitle,
      paddingLeft: 0,
      marginLeft: 0
    }
  },
  initialRouteName: "Intro"
})

export const LoginStack = StackNavigator({
  UserOption: {
    screen: UserOption,
    navigationOptions: {
      header: null
    }
  },
  // Login: {
  //   screen: Login,
  //   navigationOptions: {
  //     header: null
  //   }
  // },
  // CreateAccount: {
  //   screen: CreateAccount,
  //   navigationOptions: {
  //     title: "Tạo tài khoản"
  //   }
  // }
},
{
  navigationOptions: {
    headerBackTitle: null,
    headerStyle: {
     backgroundColor: variables.color.darkblue,
      paddingLeft: 0,
      marginLeft: 0
    },
    headerTintColor: variables.color.headerTitle,
    headerTitleStyle: {
      fontWeight: "bold",
      textAlign: "center",
      alignItems: "center",
      fontSize: variables.fontSize.headerTitle,
      paddingLeft: 0,
      marginLeft: 0
    }
  },
  initialRouteName: "UserOption"
})
export const RootStack = StackNavigator(
  {
    HomePage: {
      screen: RootTab
    },
    Calendar: {
      screen: Calendar,
      navigationOptions: {
        title: "Calendar",
      }
    },
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerBackStyle:{
        position: 'absolute'
      },
      headerStyle: {
       backgroundColor: variables.color.darkblue,
        paddingLeft: 0,
        marginLeft: 0,
      },
     headerTintColor: variables.color.headerTitle,
      headerTitleStyle: {
       width: win.width,
        flex:1,
        fontWeight: "bold",
        textAlign: "center",
        alignItems: "center",
       fontSize: variables.fontSize.headerTitle,
        paddingLeft: 0,
        marginLeft: 0,
      }
    },
    initialRouteName: "HomePage"
  }
);
 export const  HomeDrawer = DrawerNavigator(
  {
    Home: {
      screen: RootStack
    },
  },
  {
    drawerPosition: "right",
    drawerWidth:win.width * (80/100),
    contentComponent: props => <DrawerScreen {...props} />,
    navigationOptions: {
       drawerLockMode: "locked-closed",
    }
  }
);

export default RootDrawer = DrawerNavigator(
 {
   // Test22:{
   //   screen: UserOption
   // },

   // Intro:{
   //   screen: IntroStack
   // },
   LoginStack: {
     screen: LoginStack,
   },
   MainPage: {
     screen: HomeDrawer
   },
   Login:{
     screen: Login
   },
   CreateAccount:{
     screen: CreateAccount
   }
 }
);
