import {Platform, Dimensions, StyleSheet} from "react-native";
const win = Dimensions.get("window");
import variables from "./variables";
const HEIGHT_TAB_NAV = 52;
const WIDTH_TAB_NAV = win.width / 5;
export default StyleSheet.create({
  // item__01:{
  //   width: win.width,
  //   paddingTop: Platform.OS === 'ios'
  //     ? 36
  //     : 16,
  // }
  //tabBar navigate
  footerTab: {
    backgroundColor: "#fff"
  },
  tabIcon: {
    width: 24,
    height: 24
  },

  tabBar: {
    borderWidth: 0,
    backgroundColor: "white",
    height: HEIGHT_TAB_NAV,
    paddingLeft: 0,
    paddingRight: 0
  },

  labelTabBar: {
    fontSize: 9,
    marginTop: 2, // <- This is the guilty one in my case, simply removed it and it worked as expected on iOS 10 & 11
    marginBottom: 2,
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0
    //  color: variables.color.tabNav
  },

  tabBarActiveTextColor: {
    color: "red"
  },
  tab_item: {
    backgroundColor: "white"
  },
  tab_text: {
    color: variables.color.tabs,
    fontSize: variables.fontSize.tabs,
    fontWeight: "400"
  },
  indicatorTabBar: {
    backgroundColor: variables.color.darkblue,
    position: "absolute",
    top: 0,
    height: HEIGHT_TAB_NAV
  },
  tabBarSelectedItemStyle: {
    color: "white"
  },
  icon_back_header: {
    color: "white",
    fontSize: Platform.OS === 'ios'
      ? 34
      : 28
  },
  buton_back_header: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingLeft: Platform.OS === 'ios'
      ? 10
      : 20,
    paddingRight: 20,
    height: Platform.OS === 'ios'
      ? 45
      : 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3
  },
  modal_header_page: {
    paddingLeft: 0,
    flexDirection: "row",
    backgroundColor: variables.color.darkblue,
    paddingBottom: Platform.OS === 'ios'
      ? 12
      : 16,
    paddingTop: Platform.OS === 'ios'
      ? 36
      : 14
  },
  modal_header_tilte: {
    color: "#fff",
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: variables.fontSize.headerTitle,
    flex: 1
  },
  news_item: {
    padding: 12,
    margin: 0,
    alignItems: "flex-start",
    borderBottomWidth: 0,
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: 0,
    marginRight: 0
  },
  news__img: {
    width: 140,
    height: 100,
    margin: 0,
    padding: 0
  },
  news__icon: {
    paddingRight: 0,
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 2
  },
  news__txt2: {
    fontSize: 12,
    marginLeft: 3,
    color: variables.color.text_grey
  },
  news__txt3: {
    fontSize: 12,
    color: variables.color.text_grey,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 4
  },
  news__txt: {
    marginLeft: 12,
    marginTop: 5
  },
  detailNews__txt2: {
    fontSize: 14,
    marginLeft: 6
  },
  news__title: {
    fontSize: 16,
    marginRight: 0,
    marginLeft: 10
  },
  news__title_2: {
    fontSize: 14,
    padding: 0,
    marginRight: 0,
    marginLeft: 10
  },
  news__title_3: {
    fontSize: 14,
    marginRight: 0,
    marginBottom: 0,
    textAlign: "left",
    justifyContent: "flex-start",
    fontWeight: 'bold'
  },
  news__title_lg: {
    fontSize: 22,
    marginLeft: 16,
    color: "#fff",
    marginTop: 40
  },
  detailNews__title: {
    fontSize: 26,
    marginLeft: 16,
    marginTop: 10,
    color: variables.color.lightblue
  },
  news__row_right: {
    marginLeft: 5,
    marginRight: 16
  },
  news__row: {
    flexDirection: "row",
    padding: 0,
    marginRight: 10
  },
  news__row_lg: {
    flex: 1,
    marginBottom: 20
  },
  new__img_lg: {
    flex: 1,
    width: win.width,
    // height: HEIGHT_IMG_NEWS,
    height: 160,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.8
  },
  news__txt2_fff: {
    color: "#fff"
  },
  conten_news: {
    padding: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  conten_news__text: {
    color: "#666",
    textAlign: "justify"
  },
  flexrow: {
   flexDirection: "row"
 },
 shadow: {
   shadowColor: "#ddd",
   shadowRadius: 0,
   shadowOpacity: 0.5,
   elevation: 3,
   marginBottom: 10,
   shadowOffset: {
     width: 0,
     height: 1
   }
 },
 bgf: {
  backgroundColor: "#fff"
},
button_more_list_car: {
   position: "absolute",
   right: 0,
   top: 0,
   paddingRight: 18,
   paddingTop: 10,
   paddingLeft: 18,
   // height: 20,
   textAlign: "center",
   backgroundColor: "white",
   justifyContent: "center",
   zIndex: 10
 },
 fabAdd: {
    backgroundColor: variables.color.yellow
  },
  modal__bg_nopad: {
  padding: 0,
  flex: 1,
  flexDirection: "column",
  justifyContent: "center"
},
modal__bg_2: {
  backgroundColor: "rgba(0, 0, 0,0.6)",
  flex: 1,
  flexDirection: "column",
  justifyContent: "flex-end"
},
modal__bg_3: {
  backgroundColor: "rgba(0, 0, 0,0.6)",
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  padding: 16
},
modal__content: {
  backgroundColor: "#fff",
  borderRadius: 10,
  flex: 1
},
modal__content_2: {
  borderRadius: 10,
  flex: 1
},
bdrd: {
  borderRadius: 5
},
modal__close: {
  position: "absolute",
  top: Platform.OS === "ios"? 24 :  5,
  right: 5,
  zIndex: 2
},
modal__close__icon: {
  fontSize: 30,
  color: "#ccc"
},
modal__close_inputmap: {
  padding: Platform.OS === "ios" ? 4 : 12,
  top:  3
},
frm__input: {
  fontSize: 14
},
picker__style: {
  height: 35,
  width: "100%",
  paddingLeft: 0,
  left: 0,
  marginLeft: 0
},
picker__style_full: {
  height: 35,
  width: Platform.OS === "ios"
    ? 'auto'
    : win.width - 20,
  paddingLeft: 0,
  left: 0,
  marginLeft: 0
},
picker__style_2: {
  height: 35,
  width: Platform.OS === "ios"
    ? 'auto'
    : '100%',
  paddingLeft: 0,
  left: 0,
  marginLeft: 0,
  alignSelf: 'stretch'
},
picker__itemStyle: {
  paddingLeft: 0,
  marginLeft: 0,
  left: 0,
  fontSize: 12
},
picker__itemSelected: {
  paddingLeft: 0,
  marginLeft: 0,
  left: 0,
  fontSize: 14
},
text_blue: {
    color: variables.color.darkblue,
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 0
  },
  pd10: {
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16
  },
  modalLoading: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .3)"
  },
  loadingView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .3)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  spinerLoading: {
    color: "#fff"
  },
  footer_page: {
   backgroundColor: "transparent",
   borderTopWidth: 0,
   shadowOpacity: 0,
   shadowColor: "transparent",
   shadowOffset: {
     height: 0,
     width: 0
   }
 },
 footer_action: {
   height: 50,
   backgroundColor: "#eee",
   paddingLeft: 32,
   paddingRight: 32,
   paddingTop: (50 - 44) / 2,
   shadowColor: "#ddd",
   shadowRadius: 0,
   shadowOpacity: 0.5,
   elevation: 3,
   shadowOffset: {
     width: 0,
     height: 1
   },
 },
 button_upload: {

    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box_img_upload: {
    width: 100 + 5,
    marginTop: 5,
    height: 100,
  },
  img_upload: {
    height: 100,
    width: 100
  },
  button_them_hinh: {
    position: "absolute",
    left: 0,
    bottom: 0,
    top: 0,
    width: "100%",
    zIndex: 3
  },
  icon_input_text: {
    position: "absolute",
    right: 0,
    top: 30,
    zIndex: 2
  },
  frm__label: {
    width: '100%',
    fontSize: 14,
    color: variables.color.labelInput
  },
  frmInput__item: {
    marginTop: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    padding: 0,
    width: '100%'
  },
  text_input: {
    textAlign: 'left',
    borderBottomWidth: 0,
    shadowOpacity: 0,
    marginBottom: 6,
    marginTop: 4,
    paddingTop: 0,
    paddingBottom: 0,
    height: 32,
    width: '100%'
  },
  frmgetpass__btn: {
    marginLeft: 0,
    marginRight: 0,
    borderColor: variables.color.darkblue,
    backgroundColor: "#fff",
    height: 44,
    flex: 1
  },
  tabBarText:{
    fontSize: 13
  },
  btn_border_blue__txt: {
    color: variables.color.darkblue,
  },
  bdrd: {
    borderRadius: 5
  },
  thongtin_row: {
    flexDirection: "row",
    padding: 5,
    paddingLeft: 16,
    paddingRight: 16
  },
  thongtin_icon: {
    fontSize: 14,
    width: 22
  },
  thongtin_txt2: {
    fontSize: 13,
    color: variables.color.colorIcon
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0
  },
  rdo_list: {
    margin: 0,
    padding: 0
  },
  rdo: {
    margin: 0,
    padding: 0,
    borderBottomWidth: 0,
    marginLeft: 0,

  },
  radio__item: {
    margin: 0,
    padding: 0,
    borderBottomWidth: 0,
    marginLeft: 0,
    backgroundColor: 'rgba(255,255,255,.8)',
    width: 280,
    paddingLeft: 40,
    marginTop: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff'
  },
  rdo__txt: {
    paddingLeft: 12,
    color: 'red'
  },
  radio_group: {
    margin: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D8D8"
  },

  button_login_back:{
    position: 'absolute',
    opacity:0
  },
  icon_login_back:{
    fontSize: 34,
    color: '#fff',
    padding: 12,
    paddingLeft: 24,
  },
page_title: {
    alignItems: "center",
    top: 45
  },
  welcome: {
    color: "#fff"
  },
  shipper_text: {
    color: "#fff",
    fontSize: 50
  },
text: {
    color: "#fff",
    fontSize: 50
  },
  frmlogin: {
    marginTop: 20,
    padding: 35
  },
  frmlogin__item: {
    marginTop: 10,
    marginLeft: 0,
    marginRight: 0,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    //width: '100%'
  },
frmlogin__label: {
    color: "#fff",
    fontSize: 14
  },
  frmlogin__input: {
    color: "white",
    width: '100%',
    height: 40,
    borderBottomWidth: 0,
    shadowOpacity: 0,
    borderBottomColor: 'transparent',
  },
  frmlogin__btn: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 35,
    backgroundColor: variables.color.darkblue,
    shadowOpacity: 0,
    shadowColor: "transparent"
  },
  frmlogin__btn2: {
    marginTop: 10
  },
  frmlogin__btn__txt:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  forget_pass_txt: {
    color: "#fff",
    marginTop: 20
  },
<<<<<<< HEAD
  frm_create_acc: {
   paddingTop: 16
 },
 radio_group__label: {
   paddingLeft: 16
 },
 text_group: {
   paddingLeft: 16,
   paddingRight: 16
 },
 action_bottom_2: {
   padding: 16,
   paddingTop: 24,
   paddingBottom: 24,
   backgroundColor: "#F9F9F9",
   borderTopWidth: 1,
   borderTopColor: "#D8D8D8"
 },

 action_bottom_3: {
   padding: 16,
   paddingTop: 40,
   paddingBottom: 40
 },
 action_bottom_4: {
   padding: 16
 },
 dieu_khoan_su_dung: {
   marginBottom: 25,
   flexWrap: "wrap",
   flexDirection: "row",
   alignItems: "center",
   alignSelf: "stretch",
   justifyContent: "center"
 },
 dieu_khoan_su_dung_txt: {},
 dieu_khoan_su_dung_link: {},
=======

  btn_abs_input: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 40,
    //backgroundColor:'red'
    zIndex: 2
  },
  button__lichtrinh: {
    marginTop: 8,
    height: 28,
    borderWidth: 1,
    borderColor: variables.color.darkblue,
    backgroundColor: "white",
    shadowOpacity: 0,
    shadowColor: "transparent",
    marginLeft: 10,
    paddingTop: 0,
    paddingBottom: 0
  },
  button__lichtrinh_txt: {
    color: variables.color.darkblue,
    fontSize: 12
  },
  color_red:{
    color: variables.color.darkblue,
  },
  mgt10:{
    marginTop: 10
  },
  mgt30:{
    marginTop: 30
  }
>>>>>>> 5f6ff6c053fc4dec1ad2727bec91c105b61c8315
});
