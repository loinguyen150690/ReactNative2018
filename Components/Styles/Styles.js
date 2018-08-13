import {StyleSheet} from 'react-native';
import globals from './Globals.js';
import {Platform, Dimensions} from 'react-native';
const win = Dimensions.get('window');
const HEIGHT_TAB = 52;
const HEIGHT_TAB_NAV = 52;

const HEIGHT_FOOTER_HOME_ITEM = win.width / 4 ;
const HEIGHT_FOOTER_HOME = win.width / 4 * 2;

export default StyleSheet.create({
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
  activity_indicator:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3DB2E3',
  }
  ,container: {
    flex: 1,
    alignItems: 'center'
  },
  page_title: {
    alignItems: 'center',
    top: 45
  },
  listItemCate:{
   flex: 1,
   flexDirection: 'row',
   marginTop: 20,
   marginBottom: 20
 }
 ,item_cate:{
   width: '33.33%',
   flex: 1,
   alignItems: 'center',
   alignContent: 'center'
 }
 ,icon4:{
     height: 40,
     width: 40,
     lineHeight: 40,
     fontSize: 25,
     color: '#3395FE',
    // backgroundColor: '#3395FE',
     textAlign: 'center',
     borderRadius:0,
 }
 ,item_cate__icon:{
   height: 80,
   width: 80,
   lineHeight: 80,
   fontSize: 40,
   color: '#fff',
   backgroundColor: '#3395FE',
   textAlign: 'center',
   borderRadius:100,
 }
 ,bgOrange:{
   backgroundColor: "#FD8E33"
 }
 ,bgGrey:{
   backgroundColor: "#666"
 }
 ,titlePage:{
   paddingTop: 20,
   paddingHorizontal: 20
 }
 ,imageFull:{
   width: '100%',
   height: 200
 }
 , textBanner: {
   position: 'absolute',
   flex: 1
 },
 textBanner__txt: {
   fontSize: 20
 }

 ,icon1:{
backgroundColor:'#C657FF'
 }
 ,icon2:{
backgroundColor:'#8AC06D'
 }
 ,icon3:{
backgroundColor: '#FF5757'
 }

 ,serial:{
     paddingLeft: 16,
     paddingRight: 16,
 }
 ,
  welcome: {
    color: '#fff'
  },
  shipper_text: {
    color: '#fff',
    fontSize: 50
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0
  },
  text: {
    color: '#fff',
    fontSize: 50
  },
  frmlogin: {
    marginTop: 50,
    alignItems: 'center',
    padding: 35
  },
  frmlogin__item: {
    marginLeft: 0,
    marginRight: 0,
     marginTop: 16,
     paddingLeft: 16,
     // paddingBottom: 10
  },
  bgf:{
    backgroundColor: '#fff',
  },
  frm__label: {
    fontSize: 14
  },
  lbl_left: {
    alignSelf: 'stretch'
  },
  frmlogin__label: {
    color: '#fff',
    fontSize: 14
  },
  frmlogin__input: {
    color: '#000'
  },
  frmlogin__btn: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 24,
    backgroundColor: globals.color.yellow,
    shadowOpacity: 0,
    shadowColor: 'transparent'
  },
  frmlogin__btn2: {
    marginTop: 10
  },
  action_bottom: {
    flex: 1,
    marginLeft: 35,
    paddingRight: 35,
    alignSelf: 'stretch'
  },
  frmgetpass__btn: {
    marginLeft: 0,
    marginRight: 0,
    borderColor: globals.color.darkblue,
    backgroundColor: '#fff'
  },
  frmgetpass__btn__txt: {
    color: globals.color.darkblue
  },
  forget_pass_txt: {
    color: '#fff',
    marginTop: 20
  },
  create_account: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  create_account_txt: {
    color: '#fff'
  },
  link: {
    color: globals.color.lightblue
  },
  create_account_link: {
    color: globals.color.yellow
  },
  touchable: {
    padding: 0,
    margin: 0
  },
  resend_OTP: {
    marginTop: 25,
    alignSelf: 'stretch'
  },
  resend_OTP__txt: {
    marginTop: 0,
    color: globals.color.lightblue,
    textAlign: 'right'
  },
  icon_img: {
    marginTop: 35
  },
  text_desc: {
    textAlign: 'center',
    padding: 35,
    paddingTop: 25,
    paddingBottom: 20
  },
  frm: {
    flex: 9,
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 35
  },
  rdo_list: {
    margin: 0,
    padding: 0
  },
  rdo: {
    margin: 0,
    padding: 0,
    borderBottomWidth: 0

  },
  radio__item: {
    margin: 0,
    padding: 0,
    borderBottomWidth: 0
  },
  rdo__txt: {
    paddingLeft: 10
  },
  radio_group: {
    margin: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8'
  },
  scroll_create_acc: {
    backgroundColor: '#fff'
  },
  radio_group__list: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  frm_create_acc: {
    paddingTop: 15
  },
  radio_group__label: {
    paddingLeft: 15
  },
  text_group: {
    paddingLeft: 15,
    paddingRight: 15
  },
  action_bottom_2: {
    padding: 15,
    paddingTop: 25,
    marginTop: 50,
    paddingBottom: 50,
    backgroundColor: '#F9F9F9',
    borderTopWidth: 1,
    borderTopColor: '#D8D8D8'
  } ,
  footer_page: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    shadowOpacity: 0,
    shadowColor: 'transparent',
    shadowOffset: {
      height: 0,
      width: 0
    }
  },

  // chi tiet chuyen hang
  text_blue: {
    color: globals.color.darkblue,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5
  },
  list_hanghoa2: {
    paddingBottom: 20
  },
  icon_red: {
    color: globals.color.red
  },
  icon_blue: {
    color: globals.color.darkblue
  },
  input_fzsm: {
    fontSize: 14
  },
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
    //  color: globals.color.tabNav
  },

  tabBarActiveTextColor: {
    color: "red"
  },
  tab_item: {
    backgroundColor: "white"
  },
  tab_text: {
    color: globals.color.tabs,
    fontSize: globals.fontSize.tabs,
    fontWeight: "400"
  },
  indicatorTabBar: {
    backgroundColor: globals.color.darkblue,
    position: "absolute",
    top: 0,
    height: HEIGHT_TAB_NAV
  },
  tabBarSelectedItemStyle: {
    color: "white"
  },

  flexrow:{
    flexDirection:'row',
    flex: 1
  },
  footer_home__item:{
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    height: HEIGHT_FOOTER_HOME_ITEM,
    borderBottomColor: '#4AC1E7',
    borderBottomWidth: 1
  },
  footer_home__item_mid:{
    borderLeftColor: '#4AC1E7',
    borderLeftWidth: 1,
    borderRightColor: '#4AC1E7',
    borderRightWidth: 1
  },

  footer_home__item__text:{
    color: '#fff',
    fontSize: 13,
    marginTop: 3,
  },
  footer_home__item__icon:{
    color: '#fff'
  },
  footer_home:{
    height: HEIGHT_FOOTER_HOME,
    backgroundColor: globals.color.lightblue,
    flexDirection: 'column'
  },
  footer_home_row:{

  }
});
