import React, {Component} from 'react';
import {Platform, View, Image, TouchableOpacity} from 'react-native';

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
const src_img_icon = '../Images/icon_getpass.png';

export default class QuenMatKhau extends Component<Props> {
  render() {
    var {
      navigate
    } = this.props.navigation;
    return (<Container>
      <Content>
        <View style={styles.frm}>
          <Image source={require(src_img_icon)} style={styles.icon_img}></Image>
          <Text style={styles.text_desc}>
            Mật khẩu OTP đã được gửi đến cho số điện thoại của bạn
          </Text>
          <Item floatingLabel={true} style={styles.frmlogin__item}>
            <Label style={styles.frm__label}>Nhập mã OTP</Label>
            <Input style={styles.frm_input}/>
          </Item>
          <TouchableOpacity style={styles.resend_OTP}>
            <Text style={styles.resend_OTP__txt}>Gửi lại OTP</Text>
          </TouchableOpacity>
        </View>
      </Content>
      <Footer style={styles.footer_page}>
        <View style={styles.action_bottom}>
          <Button block={true} bordered={true} rounded={true} style={styles.frmgetpass__btn} onPress={() => navigate("NewPass", {})}>
            <Text style={styles.frmgetpass__btn__txt}>TIẾP THEO</Text>
          </Button>
        </View>
      </Footer>
    </Container>);
  }
}
