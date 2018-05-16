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
  ListItem,
  CheckBox,
  Content,
  Picker,
  Body
} from 'native-base';

import styles from '../Styles/Styles.js';

import Icon from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";


export default class ThongTinGiaoNhan extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      checkBox1: true
    };
  };

  render() {
    return (<Container>
      <Content>
        <View style={styles.detail_chuyen_hang}>
          <View >

          <View style={styles.detail_chuyen_hang__row}>
            <Text style={styles.text_blue}>Điểm đi - điểm đến</Text>
            <View style={{
                flexDirection: 'row'
              }}>
              <View style={{
                  flex: 1,
                  flexDirection: 'row'
                }}>
                <Icon name='circle-o' style={[styles.icon_blue, styles.thongtingiaonhan_icon1]}/>
                <Text style={styles.thongtingiaonhan_txt1}>Hồ Chí Minh</Text>
              </View>

              <Icon name='arrow-right' style={styles.thongtingiaonhan_icon3}/>
              <View style={{
                  flex: 1,
                  flexDirection: 'row'
                }}>
                <Icon name='map-marker' style={[styles.icon_red, styles.thongtingiaonhan_icon2]}/>
                <Text style={styles.thongtingiaonhan_txt1}>Cần Thơ</Text>
              </View>

            </View>
            <View style={{
                flexDirection: 'row'
              }}>
              <Text style={styles.thongtingiaonhan_txt2}>3h33p</Text>
              <Text style={styles.thongtingiaonhan_txt2}>169km</Text>
            </View>
          </View>

          <View style={styles.detail_chuyen_hang__row_3}>
            <Text style={styles.text_blue2}>Hàng hóa</Text>
            <List style={styles.list_hanghoa}>
              <View style={styles.hanghoa__item}>
                <View style={styles.hanghoa__item__inner}>
                  <View style={styles.hanghoa__item__txt}>
                    <View style={styles.hanghoa_txt1}>
                      <View style={styles.hanghoa_txt11}>
                        <Text style={styles.hanghoa_left_1}>Xoài cát hòa lộc</Text>
                        <View style={styles.hanghoa_left_2f}>
                          <Text style={styles.hanghoa_left_2}>Kích thước:{' '}0m x 0m x 0m</Text>
                          <Text style={styles.hanghoa_left_2}>Trọng lượng:{' '}0kg</Text>
                        </View>
                      </View>
                      <View style={styles.hanghoa_txt11}>
                        <Text style={styles.hanghoa_right_1}>100,000 đ</Text>
                        <Text style={styles.hanghoa_right_2}>SL:{' '}10 thùng</Text>
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
                        <Text style={styles.hanghoa_left_1}>Xoài cát hòa lộc</Text>
                        <View style={styles.hanghoa_left_2f}>
                          <Text style={styles.hanghoa_left_2}>Kích thước:{' '}0m x 0m x 0m</Text>
                          <Text style={styles.hanghoa_left_2}>Trọng lượng:{' '}0kg</Text>
                        </View>
                      </View>
                      <View style={styles.hanghoa_txt11}>
                        <Text style={styles.hanghoa_right_1}>100,000 đ</Text>
                        <Text style={styles.hanghoa_right_2}>SL:{' '}10 thùng</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </List>
          </View>

          <View style={styles.detail_chuyen_hang__row_3}>
            <Text style={styles.text_blue2}>Dịch vụ</Text>
            <List style={styles.list_hanghoa}>

              <View style={styles.hanghoa__item}>
                <View style={styles.hanghoa__item__inner}>
                  <View style={styles.hanghoa__item__txt}>
                    <View style={styles.hanghoa_txt1}>
                      <View style={styles.hanghoa_txt11}>
                        <Text style={styles.hanghoa_left_1}>Bốc xếp</Text>
                        <Text style={styles.hanghoa_left_2}>Chuyển đi</Text>
                      </View>
                      <View style={styles.hanghoa_txt11}>
                        <Text style={styles.hanghoa_right_1}>10,000 đ</Text>
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
                        <Text style={styles.hanghoa_left_1}>Bảo quản xe lạnh</Text>
                        <Text style={styles.hanghoa_left_2}>Chuyển về</Text>
                      </View>
                      <View style={styles.hanghoa_txt11}>
                        <Text style={styles.hanghoa_right_1}>10,000 đ</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

            </List>
          </View>

          <View style={styles.detail_chuyen_hang__row_3}>
            <Text style={styles.text_blue2}>Báo giá</Text>
            <View style={styles.thanhtien}>
              <View style={styles.thanhtien__inner}>
                <Text style={[styles.hanghoa_left_1, styles.thanhtien__txt]}>Thành tiền</Text>
                <Text style={[styles.hanghoa_right_1, styles.thanhtien__txt2]}>220,000 đ</Text>
              </View>
            </View>
          </View>
</View>
          <ListItem onPress={() => {
              this.setState({
                checkBox1: !this.state.checkBox1
              });

            }} style={styles.giaonhan_checkbox}>
            <CheckBox checked={this.state.checkBox1}/>
            <Body>
              <Text>Bạn đồng ý với mức giá trên</Text>
            </Body>
          </ListItem>



          <View style={{
              opacity: this.state.checkBox1 === true
                ? 1
                : 0.2
            }} pointerEvents={this.state.checkBox1 === true
              ? 'auto'
              : 'none'}>

              <View style={styles.giao_nhan_add_hang_hoa}>
              <Text style={[styles.text_blue2,styles.text_blue3]}>Thông tin giao hàng</Text>
                <Entypo name='plus' size={21} style={ [styles.icon_add_hanghoa, styles.icon_add_hanghoa2]}/>
              </View>
              <View style={styles.giao_nhan_add_hang_hoa}>
              <Text style={[styles.text_blue2,styles.text_blue3]}>Thông tin nhận hàng</Text>
                <Entypo name='plus' size={21} style={ [styles.icon_add_hanghoa, styles.icon_add_hanghoa2]}/>
              </View>

            <View style={styles.action_bottom_4}>
              <Button block={true} rounded={true} bordered={true} style={styles.frmgetpass__btn} onPress={() => {
                  Alert.alert('clicked')
                }}>
                <Text style={styles.frmgetpass__btn__txt}>XÁC NHẬN</Text>
              </Button>
            </View>
          </View>
        </View>
      </Content>

    </Container>);
  }
}
