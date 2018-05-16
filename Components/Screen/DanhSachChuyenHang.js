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
  FooterTab,
  Content,
  ScrollableTab,
  Tabs,
  Tab,
  Right,
  Left,
  Body,
  ListItem,
  List,
  Fab
} from 'native-base';
import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from '../Styles/Styles.js';
import globals from '../Styles/Globals.js';

const icon_lo_trinh = '../images/icon_lo_trinh.png';

export default class ChuyenHang extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      active: 'true'
    }
  };

  _onPress(id) {
    this.setState({id: id});
  }

  buildTabs(data, data2) {
    let mycontent = [],
      length = data.length,
      i = 0,
      item;
    if (data.length == 0) {
      data.length = length = 3;
    }

    for (; i < length; i++) {
      item = data[i];
      mycontent.push(<Tab heading={item.name} key={'tab' + i} index={i} tabStyle={{
          backgroundColor: 'white',
          borderBottomWidth: 2,
          borderBottomColor: globals.color.darkblue
        }} textStyle={{
          color: globals.color.grey
        }} activeTabStyle={{
          backgroundColor: 'white',
          borderBottomWidth: 2,
          borderBottomColor: globals.color.darkblue
        }} activeTextStyle={{
          color: globals.color.darkblue
        }}>

        <List style={styles.list}  dataArray={data2} renderRow={(item) =>
          <View style={styles.chuyenhang__item}>
            <View style={styles.chuyenhang__item__inner}>
              <View style={styles.chuyenhang__item__txt}>
              <View style={styles.chuyenhang_txt1}>
                <View style={styles.chuyenhang_txt11}>
                  <Text style={styles.chuyenhang_ngay}>{item.ngay}</Text>
                  <Text style={styles.chuyenhang_gio}>{item.gio}</Text>
                </View>
                <View style={styles.chuyenhang_txt11}>
                  <Text style={styles.chuyenhang_giatien}>{item.giatien}
                    đ</Text>
                  <Text style={styles.chuyenhang_khoiluong}>{item.khoiluong}</Text>
                </View>
              </View>
              <View style={styles.chuyenhang_txt2}>
                <Image style={styles.icon_lo_trinh}  source={require(icon_lo_trinh)}/>
                <View style={styles.chuyenhang_txt22} >
                <Text style={styles.chuyenhang_khoihanh}>
                  <Text style={styles.icon_chuyenhang}> </Text>{' '}
                  {item.khoihanh}</Text>
                <Text style={styles.chuyenhang_ketthuc}>
                  <Text style={styles.icon_chuyenhang}> </Text>{' '}
                  {item.ketthuc}</Text>
              </View>
              </View>

            </View>
            <Button block={true} iconRight="iconRight" transparent={true} warning={true} style={styles.btn_detail}
 onPress={() => this.props.navigation.navigate("DetailChuyenHang", {id:item.id})}
              >
              <Text style={styles.btn_detail_text}>XEM LỘ TRÌNH</Text>
              <Icon name='angle-right' size={20} color='#D0D0D0'/>
            </Button>
            </View>

          </View>}></List>

      </Tab>)
    }

    return mycontent;
  }

  render() {
    let state = this.state,
      tinh_trang_hang_hoa = [
        {
          id: 1,
          name: 'ĐANG GIAO(5)'
        }, {
          id: 2,
          name: 'SẮP GIAO(5)'
        }, {
          id: 3,
          name: 'CHỜ DUYỆT(5)'
        }, {
          id: 4,
          name: 'CHỜ THANH TOÁN(5)'
        }
      ],
      danh_sach_chuyen = [
        {
          id: 1,
          ngay: '25/01/2018',
          gio: '18:02',
          khoiluong: '2,5 tấn',
          giatien: 3200000,
          khoihanh: 'Quận Tân Bình, TPHCM',
          ketthuc: '36 Bùi Thị Xuân, P Bến Thành, Q 1, TPHCM',
          tinhtrang: 1
        }, {
          id: 2,
          ngay: '25/01/2018',
          gio: '18:02',
          khoiluong: '4,5 tấn',
          giatien: 5200000,
          khoihanh: 'Quận Tân Bình, TPHCM',
          ketthuc: '36 Bùi Thị Xuân, P Bến Thành, Q 1, TPHCM'
        }, {
          id: 3,
          ngay: '25/01/2018',
          gio: '18:02',
          khoiluong: '2,8 tấn',
          giatien: 3700000,
          khoihanh: 'Quận Tân Bình, TPHCM',
          ketthuc: '36 Bùi Thị Xuân, P Bến Thành, Q 1, TPHCM'
        }, {
          id: 4,
          ngay: '25/01/2018',
          gio: '18:02',
          khoiluong: '2,5 tấn',
          giatien: 3200000,
          khoihanh: 'Quận Tân Bình, TPHCM',
          ketthuc: '36 Bùi Thị Xuân, P Bến Thành, Q 1, TPHCM'
        }, {
          id: 5,
          ngay: '25/01/2018',
          gio: '18:02',
          khoiluong: '3,5 tấn',
          giatien: 4200000,
          khoihanh: 'Quận Tân Bình, TPHCM',
          ketthuc: '36 Bùi Thị Xuân, P Bến Thành, Q 1, TPHCM'
        }
      ],
      mycontent = this.buildTabs(tinh_trang_hang_hoa, danh_sach_chuyen);

    return (<Container style={{padding: 0}}>

      <Content>
        <View style={{paddingBottom: 38, backgroundColor:'#f4f4f4'}}>
        <Tabs tabStyle={{
            borderBottomWidth: 2,
            borderBottomColor: globals.color.darkblue
          }} style={styles.tabStyle} tabBarUnderlineStyle={{
            height: 0,
            backgroundColor: globals.color.darkblue
          }} renderTabBar={() => <ScrollableTab/>}>
          {mycontent}

        </Tabs>
</View>
      </Content>
      <Fab style={{
          backgroundColor: globals.color.yellow
        }} position="bottomRight"
        onPress={() => this.props.navigation.navigate("HangHoaDichVu")}>
         <Entypo name="plus"/>
      </Fab>

    </Container>);
  }
}
