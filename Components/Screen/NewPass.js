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
const src_img_icon = '../images/icon_newpass.png';

export default class NewPass extends Component<Props> {
  render() {
    return (<Container>
      <Content>
        <View style={styles.frm}>
          <Image source={require(src_img_icon)} style={styles.icon_img}></Image>
          <Text style={styles.text_desc}>
            Vui lòng nhập mật khẩu mới để tiếp tục
          </Text>
          <Item floatingLabel={true} style={styles.frmlogin__item}>
            <Label style={styles.frm__label}>Nhập mật khẩu mới</Label>
            <Input secureTextEntry={true} style={styles.frm_input}/>
          </Item>
        </View>
      </Content>
      <Footer style={styles.footer_page}>
        <View style={styles.action_bottom}>
          <Button block={true} bordered={true} rounded={true} style={styles.frmgetpass__btn}>
            <Text style={styles.frmgetpass__btn__txt}>TIẾP THEO</Text>
          </Button>
        </View>
      </Footer>
    </Container>);
  }
}
