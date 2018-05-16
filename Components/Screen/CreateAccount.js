import React, {Component} from 'react';
import {Platform, View, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator} from 'react-native';
import {
  Button,
  Text,
  Form,
  Input,
  Item,
  Label,
  Title,
  ListItem,
  Radio,
  Left,
  Container,
  Header,
  Footer,
  Content
} from 'native-base';
import styles from '../Styles/Styles.js';
// const src_img_icon = '../images/icon_getpass.png';

export default class FogotPass extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      companyname: '',
      fullname: '',
      phone: '',
      email: '',
      password: '',
      repassword: '',
      isLoading: 0
    };
  };

  onInsert() {

    if(this.state.companyname == '')
    {
      Alert.alert('Thông báo', 'Chưa nhập tên công ty!');
      return;
    }
    if(this.state.fullname == '')
    {
      Alert.alert('Thông báo', 'Chưa nhập họ tên!');
      return;
    }
    if(this.state.phone == '')
    {
      Alert.alert('Thông báo', 'Chưa nhập số điện thoại!');
      return;
    }
    if(this.state.email == '')
    {
      Alert.alert('Thông báo', 'Chưa nhập email!');
      return;
    }
    if(this.state.password == '')
    {
      Alert.alert('Thông báo', 'Chưa nhập mật khẩu!');
      return;
    }
    if(this.state.repassword == '')
    {
      Alert.alert('Thông báo', 'Chưa nhập lại mật khẩu!');
      return;
    }
    if(this.state.repassword != this.state.password)
    {
      Alert.alert('Thông báo', 'Nhập lại mật khẩu sai!');
      return;
    }

    this.setState({isLoading: 1});
    fetch('http://api.shippers.byte.vn/api/user/insert', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({Type: this.state.type, CompanyName: this.state.companyname, FullName: this.state.fullname, Phone: this.state.phone, Email: this.state.email, Password: this.state.password})
    })

    .then(response => {
      this.setState({isLoading: 0});
      if (response.status === 200) {
        return response.json().then(async (responseJson) => {
          if (responseJson > 0){
            Alert.alert('Thông báo', 'Tạo tài khoản thành công!');
            this.props.navigation.navigate('HomePage');
            try {
              await AsyncStorage.setItem('@Loginned:key', 'true');
            } catch (e) {
              console.log(e);
            } finally {}
          }
          else if (responseJson == -2) {
            Alert.alert('Thông báo', 'Email đã có người sử dụng!');  // + `${responseJson}`
          }
          else if (responseJson == -1) {
            Alert.alert('Thông báo', 'Số điện thoại đã có người sử dụng!');
          }
        });
      }
      else {
        Alert.alert('Thông báo', 'API Lỗi, vui lòng thử lại sau!');
      }
    })

    .then(response => {
      console.debug(response);
      this.setState({isLoading: 0});
    })

    .catch(error => {
      console.error(error);
      this.setState({isLoading: 0});
      Alert.alert('Thông báo', 'Lỗi kết nối, vui lòng thử lại sau!');
    });

  }

  render() {
    var {
      navigate
    } = this.props.navigation;
    if (this.state.isLoading == 1) {
      return (
        <ActivityIndicator style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#3DB2E3',
            tintColor: 'white'
          }}/>)
    }
    return (<Container>
      <Content>
        <View style={styles.frm_create_acc}>

          <View style={styles.radio_group}>
            <Label style={[styles.frm__label, styles.radio_group__label]}>
              Bạn là
            </Label>
            <View style={styles.radio_group__list}>
              <View>
                <ListItem  radioColor='red'  style={styles.radio__item}>
                  <Radio radioColor='red' radioSelectedColor={'red'} selected={this.state.type === 1} onPress={(type) => this.setState({type: 1})} style={styles.rdo}/>
                  <Text style={styles.rdo__txt}>Chủ hàng</Text>
                </ListItem>
              </View>
              <View>
                <ListItem style={styles.radio__item}>
                  <Radio selected={this.state.type === 2} onPress={(type) => this.setState({type: 2})} style={styles.rdo}/>
                  <Text style={styles.rdo__txt}>Chủ xe</Text>
                </ListItem>
              </View>
            </View>
          </View>
          <View style={styles.text_group}>
            <Item floatingLabel={true} style={styles.frmlogin__item}>
              <Label style={styles.frm__label}>Tên công ty</Label>
              <Input value={this.state.companyname} onChangeText={(companyname) => this.setState({companyname})} style={styles.frm_input}/></Item>

            <Item floatingLabel={true} style={styles.frmlogin__item}>
              <Label style={styles.frm__label}>Họ tên</Label>
              <Input value={this.state.fullname} onChangeText={(fullname) => this.setState({fullname})} style={styles.frm_input}/>
            </Item>

            <Item floatingLabel={true} style={styles.frmlogin__item}>
              <Label style={styles.frm__label}>Số điện thoại</Label>
              <Input keyboardType="phone-pad" value={this.state.phone} onChangeText={(phone) => this.setState({phone})} style={styles.frm_input}/>
            </Item>

            <Item floatingLabel={true} style={styles.frmlogin__item}>
              <Label style={styles.frm__label}>Email</Label>
              <Input value={this.state.email} onChangeText={(email) => this.setState({email})} style={styles.frm_input}/>
            </Item>
            <Item floatingLabel={true} style={styles.frmlogin__item}>
              <Label style={styles.frm__label}>Mật khẩu</Label>
              <Input secureTextEntry={true} value={this.state.password} onChangeText={(password) => this.setState({password})} style={styles.frm_input}/>
            </Item>
            <Item floatingLabel={true} style={styles.frmlogin__item}>
              <Label style={styles.frm__label}>Nhập lại mật khẩu</Label>
              <Input secureTextEntry={true} value={this.state.repassword} onChangeText={(repassword) => this.setState({repassword})} style={styles.frm_input}/>
            </Item>
          </View>
        </View>
        <View style={styles.action_bottom_2}>
          <TouchableOpacity style={[styles.dieu_khoan_su_dung]}>
            <Text style={styles.dieu_khoan_su_dung_txt}>Bạn đã đọc, hiểu và đồng ý với những</Text>
            <Text style={[styles.link]}>Điều khoản sử dụng
            </Text>
            <Text style={styles.dieu_khoan_su_dung_txt}>
              của Shippers</Text>
          </TouchableOpacity>
          <Button block={true} rounded={true} bordered={true} style={styles.frmgetpass__btn} onPress={this.onInsert.bind(this)}>
            <Text style={styles.frmgetpass__btn__txt}>TẠO MỚI</Text>
          </Button>
        </View>

      </Content>
    </Container>);
  }
}
