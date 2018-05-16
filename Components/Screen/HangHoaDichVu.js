import React, {Component} from 'react';
import {Platform, View, Image, TouchableOpacity, Alert} from 'react-native';

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
  List,
  Content,
  Picker
} from 'native-base';

import styles from '../Styles/Styles.js';
const src_img_change = '../images/icon_change.png';

import Icon from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";

export default class HangHoaDichVu extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      giaohang: "key1",
      nhanhang: "key1",
      khoihanh: '36 Bùi Thị Xuân, P Bến Thành, Q 1, TPHCM',
      ketthuc:'02 Hòa Bình, P. Tân An, Q. Ninh Kiều, TP. Cần Thơ'
    };

  };

  onValueChangeGiaoHang(value : string) {
    this.setState({giaohang: value});
  }
  onValueChangeNhanHang(value : string) {
    this.setState({nhanhang: value});
  }
  onChangeClick(){
    let value=this.state.khoihanh;
    this.setState({khoihanh: this.state.ketthuc, ketthuc: value});
  }

   render() {

    return (<Container>
      <Content>
        <View style={styles.detail_chuyen_hang}>
          <View style={styles.detail_chuyen_hang__row}>
            <Text style={styles.text_blue}>Điểm đi - điểm đến</Text>
            <View style={{
                alignSelf: 'stretch'
              }}>
              <TouchableOpacity style={styles.btn_change_lotrinh} onPress={this.onChangeClick.bind(this)}>
                <Image style={styles.img_change_lotrinh} source={require(src_img_change)} />
              </TouchableOpacity>

              <Item style={styles.detail_chuyen_hang__input} regular={true}>
                <Icon name='circle-o' style={[styles.detail_chuyen_hang__input__icon, styles.icon_blue]}/>
                <Input style={styles.input_fzsm} value={this.state.khoihanh}/>
              </Item>
              <Item style={styles.detail_chuyen_hang__input} regular={true}>
                <Icon name='map-marker' style={[styles.detail_chuyen_hang__input__icon, styles.icon_red]}/>
                <Input style={styles.input_fzsm} value={this.state.ketthuc}/>
              </Item>
            </View>
          </View>

          <View style={styles.detail_chuyen_hang__row_2}>
            <View style={{
                alignSelf: 'stretch'
              }}>
              <Text style={styles.text_blue2}>
                Hàng hóa

              </Text>
              <Entypo name='plus' size={21} style={ styles.icon_add_hanghoa}/>
            </View>
            <List style={styles.list_hanghoa}>
              <View style={styles.hanghoa__item}>
                <View style={styles.hanghoa__item__inner}>
                  <View style={styles.hanghoa__item__txt}>
                    <View style={styles.hanghoa_txt1}>
                      <View style={styles.hanghoa_txt11}>
                        <Text style={styles.hanghoa_ngay}>Xoài cát hòa lộc</Text>
                        <Text style={styles.hanghoa_gio}>Kích thước: 0m x 0m x 0m</Text>
                      </View>
                      <View style={styles.hanghoa_txt11}>
                        <Text style={styles.hanghoa_giatien}>1000 kg</Text>
                        <Text style={styles.hanghoa_khoiluong}>10 thùng</Text>
                      </View>
                    </View>

                  </View>

                </View>

              </View>

              <View style={styles.hanghoa__item}>
                <View style={styles.hanghoa__item__inner}>
                  <View style={styles.hanghoa__item__txt}>
                    <View style={styles.hanghoa_txt1}>
                      <View style={styles.hanghoa_txt11}>
                        <Text style={styles.hanghoa_ngay}>Xoài cát hòa lộc</Text>
                        <Text style={styles.hanghoa_gio}>Kích thước: 0m x 0m x 0m</Text>
                      </View>
                      <View style={styles.hanghoa_txt11}>
                        <Text style={styles.hanghoa_giatien}>1000 kg</Text>
                        <Text style={styles.hanghoa_khoiluong}>10 thùng</Text>
                      </View>
                    </View>

                  </View>

                </View>

              </View>
            </List>
          </View>

          <View style={styles.detail_chuyen_hang__row_2}>
            <Text style={styles.text_blue2}>Dịch vụ</Text>
            <List style={styles.list_hanghoa2}>
              <View style={styles.hanghoa__item2}>
                <View style={styles.hanghoa__item__inner2}>
                  <View style={styles.hanghoa__item__txt2}>
                    <View style={styles.hanghoa_txt1}>
                      <View style={styles.hanghoa_txt11}>
                        <Text style={styles.hanghoa_lbl_picker}>Gửi hàng</Text>
                        <Picker style={styles.hanghoa_picker} textStyle={styles.hanghoa_picker__textStyle} mode="dialog" headerBackButtonText={<Icon name = "angle-left"
                          size = {
                            20
                          } />} iosHeader="Gửi hàng" iosIcon={<Icon name = "angle-down" />} selectedValue={this.state.giaohang} onValueChange={this.onValueChangeGiaoHang.bind(this)}>

                          <Picker.Item style={styles.hanghoa_picker__item} label="Xe bảo quản lạnh 0" value="key0"/>
                          <Picker.Item style={styles.hanghoa_picker__item} label="Xe bảo quản lạnh 1" value="key1"/>
                          <Picker.Item style={styles.hanghoa_picker__item} label="Xe bảo quản lạnh 2" value="key2"/>

                        </Picker>

                      </View>

                    </View>

                  </View>

                </View>

              </View>

              <View style={styles.hanghoa__item2}>
                <View style={styles.hanghoa__item__inner2}>
                  <View style={styles.hanghoa__item__txt2}>
                    <View style={styles.hanghoa_txt1}>
                      <View style={styles.hanghoa_txt11}>
                        <Text style={styles.hanghoa_lbl_picker}>Nhận hàng</Text>
                        <Picker style={styles.hanghoa_picker} mode="dialog" headerBackButtonText={<Icon name = "angle-left"
                          size = {
                            20
                          } />} iosHeader="Nhận hàng" iosIcon={<Icon name = "angle-down" />} selectedValue={this.state.nhanhang} onValueChange={this.onValueChangeNhanHang.bind(this)}>

                          <Picker.Item style={styles.hanghoa_picker__item} label="Bốc xếp 0" value="key0"/>
                          <Picker.Item style={styles.hanghoa_picker__item} label="Bốc xếp 1" value="key1"/>
                          <Picker.Item style={styles.hanghoa_picker__item} label="Bốc xếp 2" value="key2"/>

                        </Picker>

                      </View>

                    </View>

                  </View>

                </View>

              </View>
            </List>
          </View>

          <View style={styles.action_bottom_3}>
            <Button block={true} rounded={true} bordered={true} style={styles.frmgetpass__btn} onPress={() => this.props.navigation.navigate("ThongTinGiaoNhan", {})}>
              <Text style={styles.frmgetpass__btn__txt}>TIẾP THEO</Text>
            </Button>
          </View>
        </View>
      </Content>

    </Container>);
  }
}
