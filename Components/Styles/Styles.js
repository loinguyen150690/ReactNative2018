import {StyleSheet} from 'react-native';
import globals from './Globals.js';
import {Platform, Dimensions} from 'react-native';
const win = Dimensions.get('window');
const HEIGHT_TAB = 52;

export default StyleSheet.create({
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
    marginTop: 15,
    paddingBottom: 10
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
    color: 'white'
  },
  frmlogin__btn: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 35,
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
  },
  action_bottom_3: {
    padding: 15,
    paddingTop: 40,
    paddingBottom: 40,
  }
  ,action_bottom_4: {
    padding: 15,
  }
  ,dieu_khoan_su_dung: {
    marginBottom: 25,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'

  },
  dieu_khoan_su_dung_txt: {},
  dieu_khoan_su_dung_link: {},
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
  //tabBar
  tabIcon: {
    width: 20,
    height: 20
  },

  tabBar: {
    borderWidth: 0,
    backgroundColor: 'white',
    height: HEIGHT_TAB
  },

  labelTabBar: {
    fontSize: 12,
    marginTop: 2, // <- This is the guilty one in my case, simply removed it and it worked as expected on iOS 10 & 11
    marginBottom: 2
  },

  indicatorTabBar: {
    backgroundColor: globals.color.darkblue,
    position: 'absolute',
    top: 0,
    height: HEIGHT_TAB
  },
  tabBarSelectedItemStyle: {
    color: 'white'
  },
  //tab danh sach chuyen hang
  heading: {},
  tabStyle: {},
  activeTabStyle: {},
  textStyle: {
    paddingLeft: 3,
    paddingRight: 3
  },
  activeTextStyle: {
    color: globals.color.darkblue
  },
  tabBarUnderlineStyle: {
    height: 0,
    backgroundColor: globals.color.darkblue
  },
  tablist: {
    borderBottomColor: globals.color.darkblue
  },
  tablist__item: {},
  tabStyle: {},
  list: {
    paddingTop: 10,
    backgroundColor: '#f4f4f4'
  },
  chuyenhang__item: {
    paddingBottom: 10
  },
  chuyenhang__item__inner: {
    backgroundColor: '#fff',
    shadowOpacity: 0.1,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 4
    },
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  chuyenhang__item__txt: {
    padding: 10
  },
  chuyenhang_txt1: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10
  },
  chuyenhang_txt11: {
    width: '50%'
  },
  chuyenhang_ngay: {
    textAlign: 'left',
    alignSelf: 'stretch'
  },
  chuyenhang_gio: {
    textAlign: 'left',
    alignSelf: 'stretch',
    color: globals.color.text_grey,
    marginTop: 5
  },
  chuyenhang_giatien: {
    textAlign: 'right',
    alignSelf: 'stretch',
    fontWeight: 'bold',
    color: globals.color.darkblue
  },
  chuyenhang_khoiluong: {
    textAlign: 'right',
    alignSelf: 'stretch',
    color: globals.color.text_grey,
    marginTop: 5
  },
  chuyenhang_khoihanh: {
    textAlign: 'left',
    alignSelf: 'stretch',
    fontSize: 14

  },
  chuyenhang_ketthuc: {
    textAlign: 'left',
    alignSelf: 'stretch',
    marginTop: 8,
    fontSize: 14
  },
  icon_chuyenhang: {
    marginRight: 20,
    paddingRight: 20
  },
  btn_detail: {
    marginBottom: 0,
    paddingLeft: 0,
    paddingRight: 15,
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  btn_detail_text: {
    color: globals.color.yellow,
    textAlign: 'left',
    flex: 1
  },
  chuyenhang_txt2: {
    flexDirection: 'row'
  },
  icon_lo_trinh: {
    height: 40,
    width: 7,
    marginTop: (Platform.OS === 'ios')
      ? 5
      : 8
  },
  // chi tiet chuyen hang
  text_blue: {
    color: globals.color.darkblue,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5
  },
  detail_chuyen_hang__row: {
    padding: 10,
    backgroundColor: '#fff',
    shadowOpacity: 0.1,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 5
    },
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  detail_chuyen_hang__row_2: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
    shadowOpacity: 0.1,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 5
    },
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },

  detail_chuyen_hang__row_3: {
    backgroundColor: '#fff',
    marginTop: 0,
    paddingTop: 10,
    backgroundColor: '#fff',
    shadowOpacity: 0.1,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 5
    },
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  detail_chuyen_hang__input: {
    marginTop: 10,
    borderColor: globals.color.darkblue,
    height: 40
  },
  detail_chuyen_hang__input__icon: {
    marginLeft: 8
  },
  list_hanghoa: {},

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
  hanghoa__item: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  hanghoa__item2: {
    paddingLeft: 10,
    paddingRight: 10
  },
  hanghoa__item__inner2: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  hanghoa__item__txt: {
    padding: 10
  },
  hanghoa_txt1: {
    flexDirection: 'row',
    flex: 1
  },
  hanghoa_txt11: {
    width: '50%'
  },
  hanghoa_ngay: {
    textAlign: 'left',
    alignSelf: 'stretch',
    fontSize: 14
  },
  hanghoa_left_1: {
    textAlign: 'left',
    alignSelf: 'stretch',
    fontSize: 14
  },
  hanghoa_left_2: {
    textAlign: 'left',
    alignSelf: 'stretch',
    color: globals.color.text_grey,
    marginTop: 5,
    fontSize: 12,
  }
  ,
  hanghoa_gio: {
    textAlign: 'left',
    alignSelf: 'stretch',
    color: globals.color.text_grey,
    marginTop: 5,
    fontSize: 14
  },
  hanghoa_giatien: {
    textAlign: 'right',
    alignSelf: 'stretch',
    fontWeight: 'bold',
    color: globals.color.darkblue,
    fontSize: 14
  },
  hanghoa_right_1: {
    textAlign: 'right',
    alignSelf: 'stretch',
    fontWeight: 'bold',
    color: globals.color.darkblue,
    fontSize: 14
  },
  hanghoa_right_2: {
    textAlign: 'right',
    alignSelf: 'stretch',
    color: globals.color.text_grey,
    marginTop: 5,
    fontSize: 12
  },
  hanghoa_khoiluong: {
    textAlign: 'right',
    alignSelf: 'stretch',
    color: globals.color.text_grey,
    marginTop: 5,
    fontSize: 14
  },
  text_blue2: {
    textAlign: 'left',
    alignSelf: 'stretch',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
    paddingTop: 5,
    color: globals.color.darkblue,
    fontWeight: 'bold'
  },
  text_blue3:{
    borderBottomWidth: 0,
    paddingBottom: 0,
    paddingTop: 0
  }
  ,
  hanghoa_picker: {
    height: 35,
    width: win.width - 20,
    paddingLeft: 0
  },
  hanghoa_lbl_picker: {
    textAlign: 'left',
    alignSelf: 'stretch',
    color: globals.color.text_grey,
    marginTop: 10,
    fontSize: 14,
    paddingLeft: 8
  },
  hanghoa_picker__item: {},
  icon_add_hanghoa: {
    position: 'absolute',
    right: 10,
    top: 5,
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: globals.color.darkblue,
    borderRadius: 20,
    color: globals.color.darkblue,
    zIndex: 3
  }
  ,icon_add_hanghoa2:{
      top: 15,
  }
  ,
  btn_change_lotrinh: {
    position: 'absolute',
    right: 10,
    top: 35,
    width: 35,
    height: 35,
    zIndex: 3
  },
  img_change_lotrinh: {
    width: 35,
    height: 35,
    opacity: 1
  },
  //thongtingiaonhan_txt1

  thongtingiaonhan_txt1: {
    paddingLeft: 6,
    alignSelf: 'stretch',
    fontSize: 14,
    color: globals.color.grey
  },
  thongtingiaonhan_icon1: {
    marginTop: 2,
    fontSize: 16
  },
  thongtingiaonhan_icon2: {
    marginTop: 1,
    fontSize: 17
  },
  thongtingiaonhan_icon3: {
    marginTop: 1,
    fontSize: 16,
   position: 'absolute',
   right: '50%',
   marginRight: 15
  },
  thongtingiaonhan_txt2: {
    fontSize: 14,
    color: globals.color.grey,
    width: '50%'
  }
  ,thanhtien:{
    padding: 10
  }
  ,thanhtien__inner:{
    flexDirection: 'row',
    flex: 1
  },
  thanhtien__txt: {
    width: '50%',
    color: '#666'
  },

  thanhtien__txt2: {
      width: '50%',
   fontSize: 16
  }
  ,giaonhan_checkbox:{
    borderBottomWidth: 0,
    marginBottom:15,
    marginTop: 15
  }
  ,giao_nhan_add_hang_hoa:{
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 10
  }
});
