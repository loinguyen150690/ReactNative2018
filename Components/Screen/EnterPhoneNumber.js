import React, {Component} from 'react';
import {Platform, View, Image} from 'react-native';

import {
  Button,
  Text,
  Form,
  Input,
  Item,
  Label,
  Title,
  Container,
  Header,
  Footer,
  Content
} from 'native-base';

import styles from '../Styles/Styles.js';
const src_img_icon = '../images/icon_enter_phone.png';

export default class EnterPhoneNumber extends Component<Props> {

  render() {
    var {
      navigate
    } = this.props.navigation;
    var {
      params
    } = this.props.navigation.state;
    return (<Container>
      <Content>
        <View style={styles.frm}>
          <Image source={require(src_img_icon)} style={styles.icon_img}></Image>
          <Text style={styles.text_desc}>
            Số điện thoại nhận mã OTP
          </Text>
          <Item floatingLabel={true} style={styles.frmlogin__item}>
            <Label style={styles.frm__label}>Điện thoại</Label>
            <Input style={styles.frm_input} value={params.dienthoai}/>
          </Item>
        </View>

      </Content>
      <Footer style={styles.footer_page}>
        <View style={styles.action_bottom}>
          <Button block={true} bordered={true}  rounded={true} style={styles.frmgetpass__btn} onPress={() => navigate("FogotPass", {})}>
            <Text style={styles.frmgetpass__btn__txt}>TIẾP THEO</Text>
          </Button>
        </View>
      </Footer>
    </Container>);
  }
}
