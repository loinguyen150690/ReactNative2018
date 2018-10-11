import {StyleSheet, Platform, Dimensions} from "react-native";
import globals from "./variables";
const win = Dimensions.get("window");
const HEIGHT_TAB_NAV = 52;
const WIDTH_TAB_NAV = win.width / 5;
let color__icon_right = '#ccc'

export default StyleSheet.create({

  nav__icon: {
    backgroundColor: globals.color.darkblue,
    borderRadius: 5,
    fontSize: 16,
    color: 'white',
    padding: 3,
    width: 24,
    textAlign: 'center'
  },
  nav__icon_arrow_right: {
    fontSize: 24,
    color: color__icon_right
  },
  nav__text: {
    fontSize: 14,
    color: globals.color.tabNav
  },
  nav__itemDivider: {
    color: globals.color.tabNav,
    fontSize: 14
  },
  background_user: {
    // /flex: 1,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0
  },
  user_info: {
    position: 'relative',
    //height: 100,
    overflow: 'hidden',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    // paddingTop: 10,
    padding: 12,
    // paddingBottom: 10
  },
  user_txt: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5
  },
  user_img: {
    width: 50,
    height: 50
  }

});
