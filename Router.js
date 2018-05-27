import React, { Component } from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import { Image, TouchableOpacity, View } from "react-native";
import { Button, Text, Badge } from "native-base";
import Login from "./Components/Screen/Login.js";
import FogotPass from "./Components/Screen/FogotPass.js";
import NewPass from "./Components/Screen/NewPass.js";
import CreateAccount from "./Components/Screen/CreateAccount.js";
import EnterPhoneNumber from "./Components/Screen/EnterPhoneNumber.js";
import Home from "./Components/Screen/Home.js";
import ListNews from "./Components/Screen/ListNews.js";
import ListNotification from "./Components/Screen/ListNotification.js";
import More from "./Components/Screen/More.js";
import HangHoaDichVu from "./Components/Screen/HangHoaDichVu.js";
import ChuyenHang from "./Components/Screen/DanhSachChuyenHang.js";
import ThongTinGiaoNhan from "./Components/Screen/ThongTinGiaoNhan.js";
import DetailChuyenHang from "./Components/Screen/DetailChuyenHang.js";
import ScanQRCodeScreen from "./Components/Screen/Camera.js";
import LichSu from "./Components/Screen/LichSu.js";
import KichHoat from "./Components/Screen/KichHoat.js";
import TrangChu from "./Components/Screen/TrangChu.js";
import HoiDap from "./Components/Screen/HoiDap.js";
import Intro from "./Components/Screen/Intro.js";
import ChatScreen from './Components/Screen/Chat.js';

//Danh sach chuyen change

import globals from "./Components/Styles/Globals.js";
import styles from "./Components/Styles/Styles.js";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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


const BottomTabNav = TabNavigator(
    {
        TrangChu: {
            screen: TrangChu,
            navigationOptions: {
                title: "Trang chủ",
                tabBarLabel: "Trang chủ",
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome
                        name="home"
                        style={[
                            styles.tabIcon,
                            {
                                color: tintColor
                            }
                        ]}
                    />
                )
            }
        },
        KichHoat: {
            screen: KichHoat,
            navigationOptions: {
                title: "Kích hoạt",
                tabBarLabel: "Kích hoạt",
                headerBackImage: null,
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome
                        name="qrcode"
                        style={[
                            styles.tabIcon,
                            {
                                color: tintColor
                            }
                        ]}
                    />
                )
            }
        },
        LichSu: {
            screen: LichSu,
            navigationOptions: {
                title: "Lịch sử",
                tabBarLabel: "Lịch sử",
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome
                        name="history"
                        style={[
                            styles.tabIcon,
                            {
                                color: tintColor
                            }
                        ]}
                    />
                )
            }
        },
        HoiDap: {
            screen: HoiDap,
            navigationOptions: {
                title: "Hỏi đáp",
                tabBarLabel: "Hỏi đáp",
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome
                        name="commenting-o"
                        style={[
                            styles.tabIcon,
                            {
                                color: tintColor
                            }
                        ]}
                    />
                )
            }
        }
    },
    {
        navigationOptions: {
            activeTintColor: globals.color.activeColorTabbar,
            headerBackImage: null,
            headerBackTitle: null,
            headerLeft: null,
            headerTitleStyle: {
                textAlign: "center",
                alignSelf: "stretch",
                fontWeight: "none"
            },
            headerRight: (
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={{ height: 40, paddingRigt: 10 }}>
                        <Badge
                            style={{
                                height: 20,
                                width: 20,
                                position: "absolute",
                                right: 0,
                                top: 0,
                                zIndex: 4,
                                padding: 0
                            }}
                        >
                            <Text style={{ fontSize: 10, lineHeight: 16 }}>
                                2
                            </Text>
                        </Badge>
                        <MaterialIcons
                            name="notifications-none"
                            size={28}
                            color="white"
                            style={{ marginTop: 10 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ height: 40, paddingLeft: 10, marginRight: 10 }}
                    >
                        <MaterialIcons
                            name="power-settings-new"
                            size={28}
                            color="white"
                            style={{ marginTop: 10 }}
                        />
                    </TouchableOpacity>
                </View>
            )
        },
        tabBarPosition: "bottom",
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
    }
);

export const RootStack = StackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {
                title: "",
                header: null
            }
        },

        Intro: {
            screen: Intro,
            navigationOptions: {
                title: "",
                header: null
            }
        },
        HomePage: {
            screen: BottomTabNav,
            navigationOptions: {}
        },
        EnterPhoneNumber: {
            screen: EnterPhoneNumber,
            navigationOptions: {
                title: "Quên mật khẩu",
                headerBackTitle: null
            }
        },
        FogotPass: {
            screen: FogotPass,
            navigationOptions: {
                title: "Nhập mã xác nhận",
                headerBackTitle: null
            }
        },
        NewPass: {
            screen: NewPass,
            navigationOptions: {
                title: "Đặt lại mật khẩu",
                headerBackTitle: null
            }
        },
        CreateAccount: {
            screen: CreateAccount,
            navigationOptions: {
                title: "Tạo tài khoản",
                headerBackTitle: null
            }
        },
        HangHoaDichVu: {
            screen: HangHoaDichVu,
            navigationOptions: {
                title: "Hàng hóa dịch vụ"
            }
        },
        ThongTinGiaoNhan: {
            screen: ThongTinGiaoNhan,
            navigationOptions: {
                title: "Thông tin giao nhận",
                headerBackTitle: null
            }
        },
        ScanQRCode: {
            screen: ScanQRCodeScreen,
            navigationOptions: {
                header: null,
                headerBackTitle: null
            }
        },
        DetailChuyenHang: {
            screen: DetailChuyenHang,
            navigationOptions: {}
        },
        Chat: {
            screen: ChatScreen,
            navigationOptions: {
            },
        }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: globals.color.darkblue
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
                textAlign: "center",
                alignItems: "center"
            }
        },
        initialRouteName: "Login"
    }
);
