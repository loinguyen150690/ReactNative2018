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

let tabBgColor = variables.color.tabNavBgc,
  tabActiveBgColor = variables.color.tabNavActiveBgc,
  tabBarTextColor = variables.color.tabNav,
  tabBarActiveTextColor = variables.color.tabNavActive;
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


  navToDanhSachXe() {
    this.setState({TAB_ACTIVE: 4});
    this.saveItem("@TabBarActive",'4');
    this.props.navigation.navigate("DanhSachXe");
  }
  openMenuright() {
    this.props.navigation.navigate("DrawerOpen");
  }
  navTest() {
    this.setState({TAB_ACTIVE: 1});
    this.saveItem("@TabBarActive",'1');
    this.props.navigation.navigate("Test");
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
          ]} vertical={true} onPress={() => this.navTest()}
          active={this.state.TAB_ACTIVE === 1}>
          <Ionicons name='ios-options' size={30}
            color={this.state.TAB_ACTIVE === 1 ? tabBarActiveTextColor : tabBarTextColor }/>
          <Text style={[
              st.tabBarText, {
                color: this.state.TAB_ACTIVE === 1
                  ? tabBarActiveTextColor
                  : tabBarTextColor
              }
            ]} uppercase={false}>Test</Text>
        </Button>

      </FooterTab>
    </Footer>);
  }
}

const st = StyleSheet.create({
  tabBarText: {
    // fontSize: fz,
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
