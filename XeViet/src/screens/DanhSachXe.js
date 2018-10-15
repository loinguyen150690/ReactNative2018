import React, {Component} from "react";
import {
  Platform,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  Alert,
  RefreshControl,
  AsyncStorage
} from "react-native";

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
  Body,
  Content,
  Thumbnail,
  ListItem,
  Fab,
  Picker,
  Spinner
} from "native-base";

import styles from "../styles/styles.js";
import globals from "../styles/variables.js";
import myApi from "../common/api.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


//import pick from "../common/picker.js";

const MAX_IMG_BAOHIEM = 2, MAX_IMG_GIAYDANGKIEM = 2, MAX_IMG_XE = 4;
export default class DanhSachXe extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      PHONE_USER: "",
      ID_USER: -1,
      isLoading: false,
      idCurrent: 0,
      StatusId: 0,
      indexNSX: 0,
      refreshing: false,
      // them moi param
      modalThemMoiXeVisible: false,
      buttonThemMoiXeVisible: true,
      dangchinhsua: false,
      //id: null,
      data: null,
      listLoaiDongCo: [],
      listLoaiXe: [],
      tenxe: null,
      loaixeId: 1,
      loaidongcoId: 1,
      bienso: null,
      hinhxe: [],
      giaydangkiem: [],
      baohiemxe: [],
      modalVisibleXoa: false,
      modalVisible: false,
      listCar: [],
      //dia chi do xe
      tinhtp: null,
      quanhuyen: null,
      listTinhTP: [],
      listQuanHuyen: [],
      //title khi them moi va chinh sua
      titleModal: "Thêm mới xe",
      dataDetail: [],
      //upload hinh xe
      uploadButtonVisible: false,
      listHinhXe: [],
      listHinhXe_upload: [],
      refreshingHinhXe: false,
      listHinhXe_download: [],

      //upload giay dang kiem
      listHinhGiayDangKiem: [],
      listHinhGiayDangKiem_upload: [],
      refreshingHinhGiayDangKiem: false,
      listHinhGiayDangKiem_download: [],

      //upload giay dang kiem
      listHinhBaoHiem: [],
      listHinhBaoHiem_upload: [],
      refreshingHinhBaoHiem: false,
      listHinhBaoHiem_download: [],
    };
  }
  componentWillMount() {
    // this.loadListTinhTP();
    // this.loadListNhaSanXuat();
    // this.loadListLoaiXe();
    // this.GetInfoUser();
    this._loadDataLoaiXe('admin');
    this._loadDataLoaiDongCo('admin');
    this.loadDanhSach();
  }

  _loadDataLoaiXe(userName) {
    fetch(myApi.LoaiXe.DanhSach, {
      method: "GET"
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJson => {
          this.setState({
            listLoaiXe: responseJson.DataResult
          });
        });
      }
    }).then(response => {
      console.debug(response);
      this.setState({isLoading: false, refreshing : false});
    }).catch(error => {
      console.error(error);
      this.setState({isLoading: false, refreshing : false});
    });

  }

  _loadDataLoaiDongCo(userName) {
    fetch(myApi.LoaiDongCo.DanhSach, {
      method: "GET"
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJson => {
          this.setState({
            listLoaiDongCo: responseJson.DataResult
          });
        });
      }
    }).then(response => {
      console.debug(response);
      this.setState({isLoading: false, refreshing : false});
    }).catch(error => {
      console.error(error);
      this.setState({isLoading: false, refreshing : false});
    });

  }

  _buildPickerByListData(listData){
    //var listData = this.state.arrStatus;
    //build data to picker.item
    let mycontent = [],
       length = listData.length,
       i = 0,
       item;
     if (length > 0) {
       for (; i < length; i++) {
         item = listData[i];
         mycontent.push(<Picker.Item label={item.Ten} value={item.ID} tilte={item.Ten}/>);
       }
     }
    return mycontent;
  }

  // Gọi API Load danh sách
  loadDanhSach() {
    this.setState({
      refreshing: true
    });
    fetch(myApi.Xe.DanhSach, {
      method: "GET"
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJson => {
          this.setState({
            listCar: responseJson.DataResult,
            refreshing: false
          });
        });
      }
    }).then(response => {
      console.debug(response);
      this.setState({isLoading: false, refreshing : false});
    }).catch(error => {
      console.error(error);
      this.setState({isLoading: false, refreshing : false});
    });
  }
  updateContent(){
      this.loadDanhSach();
  }
  navToChiTiet(_xeId){
      //alert(_xeId);
      this.props.navigation.navigate("Calendar", {id:_xeId});
  }

  //open modal them moi xe
  openModalThemMoiXe() {
    //this._clearDataInput();
    this.setState({titleModal: "Thêm mới xe"});
    this.setState({modalThemMoiXeVisible: true, buttonThemMoiXeVisible: true});
  }
  //close modal them moi xe
  closeModalThemMoiXe() {
    //this.closeModalMore();
    this.setState({modalThemMoiXeVisible: false});
  }

  render() {
    return (<Container style={{
        backgroundColor: "#f4f4f4"
      }}>
      <Content refreshControl={<RefreshControl
                                  refreshing={this.state.refreshing}
                                  onRefresh={()=>{this.updateContent()}}/>
                              }>
        <FlatList data={this.state.listCar} refreshing={this.state.refreshing} renderItem={({item, index}) => (<View style={[styles.bgf, styles.shadow]}>
            <TouchableOpacity style={styles.button_more_list_car} onPress={() => this.openModalMore(item.Id)}>
              <Ionicons name="md-more" size={25} color={"grey"}/>
            </TouchableOpacity>
            <ListItem style={[styles.news_item]}>
              <TouchableOpacity onPress={() => this.navToChiTiet(item.ID)} style={{
                  margin: 0,
                  padding: 0
                }}>
                <Thumbnail square={true} style={styles.news__img} source={{
                     uri: myApi.Image.URLXe +  item.Images
                  }}/>
              </TouchableOpacity>
              <Body>
                <TouchableOpacity onPress={() => this.navToChiTiet(item.Id)}>
                  {/* <Text>{item.Id}</Text> */}
                  <Text style={styles.news__title_3}>{item.TenXe}</Text>
                  <View style={{
                      marginLeft: 12,
                      marginTop: 0
                    }}>
                    <Text style={styles.news__txt3}>
                        {item.BienSo}
                    </Text>
                  </View>
                </TouchableOpacity>

              </Body>
            </ListItem>
          </View>)}/>
      </Content>
      <Fab style={styles.fabAdd} position="bottomRight" onPress={() => {
        this.openModalThemMoiXe();  }}>
       <Entypo name="plus"/>
      </Fab>

    {/* modal Them moi xe */}
    <Modal animationType="fade" transparent={false} visible={this.state.modalThemMoiXeVisible} presentationStyle="fullScreen">
      <View style={[styles.modal__bg_nopad, styles.fixed_header_footer]}>
        <View style={styles.modal_header_page}>

            <TouchableOpacity style={ styles.buton_back_header} onPress={() => {
                this.closeModalThemMoiXe();
              }}>
              <Ionicons name={'md-close'} style={styles.icon_back_header}/>
            </TouchableOpacity>

            <Text style={[styles.modal_header_tilte]}>{this.state.titleModal}</Text>
        </View>
        <ScrollView style={[
            styles.modal__content_2, {
              backgroundColor: "#f4f4f4"
            }
          ]}>
          <View style={[
              styles.bgf,
              styles.shadow
            ]}>
            <View style={styles.title_chuyenhang2}>
              <Text style={[styles.text_blue]}>Thông tin xe</Text>
            </View>
            <View style={[styles.pd10]}>
              <Item stackedLabel={true}>
                <Label style={styles.frm__label}>Tên xe</Label>
                <Input style={styles.frm_input} value={this.state.tenxe} onChangeText={tenxe => this.setState({tenxe})} ref={input => (this.tenxe = input)}/>
              </Item>
              <Item stackedLabel={true}>
                <Label style={styles.frm__label}>Biển số</Label>
                <Input style={styles.frm_input} value={this.state.tenxe} onChangeText={tenxe => this.setState({tenxe})} ref={input => (this.tenxe = input)}/>
              </Item>

              <Item stackedLabel={true} style={[styles.frm__item__fl, styles.frm__item_2]}>
                <Text style={styles.hanghoa_lbl_picker_2}>
                  Loại xe
                </Text>
                <Picker style={styles.picker__style_2} textStyle={styles.hanghoa_picker__textStyle} mode="dialog" headerBackButtonText={<FontAwesome name = "angle-left" size = {
                    20
                  } />
                } iosHeader="Loại xe" iosIcon={<FontAwesome name = "angle-down" />} selectedValue={this.state.loaixeId} onValueChange={(value, index) => this.setState({loaixeId: value})} itemStyle={styles.picker__itemStyle}>
                  {this._buildPickerByListData(this.state.listLoaiXe)}
                </Picker>
              </Item>

              <Item stackedLabel={true} style={[styles.frm__item__fl, styles.frm__item_2]}>
                <Text style={styles.hanghoa_lbl_picker_2}>Loại động cơ xe</Text>
                <Picker style={styles.picker__style_2} textStyle={styles.hanghoa_picker__textStyle} mode="dialog" headerBackButtonText={<FontAwesome name = "angle-left" size = {
                    20
                  } />
                } iosHeader="Loại động cơ" iosIcon={<FontAwesome name = "angle-down" />} selectedValue={this.state.loaidongcoId} onValueChange={(value, index) => this.setState ({loaidongcoId:value})} itemStyle={styles.picker__itemStyle}>
                  {this._buildPickerByListData(this.state.listLoaiDongCo)}
                </Picker>
              </Item>

              <View style={[styles.mgt20, styles.pdb, styles.flexrow]}>
                <View style={{
                    flex: 1,
                    paddingRight: 12
                  }}>
                  <Item stackedLabel={true}>
                    <Label style={styles.frm__label}>Số chỗ ngồi</Label>
                    <Input keyboardType="numeric" style={styles.frm_input} value={this.state.trongtai} onChangeText={trongtai => this.setState({trongtai})} ref={input => (this.trongtai = input)}/>
                  </Item>
                </View>
                <View style={{
                    flex: 1,
                    paddingLeft: 12
                  }}>
                  <Item stackedLabel={true}>
                    <Label style={styles.frm__label}>Màu sắc</Label>
                    <Input style={styles.frm_input} value={this.state.phienban} onChangeText={phienban => this.setState({phienban})} ref={input => (this.phienban = input)}/>
                  </Item>
                </View>
              </View>

              <View style={[styles.mgt20, styles.pdb, styles.flexrow]}>
                <View style={{
                    flex: 1,
                    paddingRight: 12
                  }}>
                  <Item stackedLabel={true}>
                    <Label style={styles.frm__label}>Phí thuê</Label>
                    <Input keyboardType="numeric" style={styles.frm_input} value={this.state.trongtai} onChangeText={trongtai => this.setState({trongtai})} ref={input => (this.trongtai = input)}/>
                  </Item>
                </View>
                <View style={{
                    flex: 1,
                    paddingLeft: 12
                  }}>
                  <Item stackedLabel={true}>
                    <Label style={styles.frm__label}>Tiền chủ xe (%)</Label>
                    <Input style={styles.frm_input} value={this.state.phienban} onChangeText={phienban => this.setState({phienban})} ref={input => (this.phienban = input)}/>
                  </Item>
                </View>
              </View>

            </View>
          </View>

          <View style={[styles.pd10]}>
            <Item stackedLabel={true}>
              <Label style={styles.frm__label}>Ghi chú</Label>
              <Input style={styles.frm_input} value={this.state.tenxe} onChangeText={tenxe => this.setState({tenxe})} ref={input => (this.tenxe = input)}/>
            </Item>
          </View>
        </ScrollView>
        <Footer style={[styles.footer_page, styles.footer_action]}>
          <Button full block={true} bordered={true} rounded={true} style={[
              styles.frmgetpass__btn, {
                display: this.state.buttonThemMoiXeVisible == true
                  ? "flex"
                  : "none"
              }
            ]} onPress={() => this.onThemMoiXe()}>
            <Text style={styles.btn_border_blue__txt}>THÊM MỚI</Text>
          </Button>
          <Button block={true} bordered={true} rounded={true} style={[
              styles.frmgetpass__btn, {
                display: this.state.buttonThemMoiXeVisible == false
                  ? "flex"
                  : "none"
              }
            ]} onPress={() => this.onCapNhatXe()}>
            <Text style={styles.btn_border_blue__txt}>CẬP NHẬT</Text>
          </Button>
        </Footer>
      </View>
    </Modal>


      </Container>)
    }

}
