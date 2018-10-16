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


import pick from "../common/picker.js";

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
      // dangchinhsua: false,
      //id: null,

      data: null,
      listLoaiDongCo: [],
      listLoaiXe: [],
      //thong tin xe
      tenxe: null,
      loaixeId: 1,
      loaidongcoId: 1,
      bienso: null,
      mauxe:null,
      sochongoi:null,
      sotien:null,
      tylechuxe:null,
      ghichu:null,
      hinhxe: [],
      //end thong tin xe
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
      dataHinhXe: {
            Source:null,
            FileName: null,
            FileType: null,
            Base64String: null,
        }
      // listHinhXe: [],
      // listHinhXe_upload: [],
      // refreshingHinhXe: false,
      // listHinhXe_download: [],
      //
      // //upload giay dang kiem
      // listHinhGiayDangKiem: [],
      // listHinhGiayDangKiem_upload: [],
      // refreshingHinhGiayDangKiem: false,
      // listHinhGiayDangKiem_download: [],
      //
      // //upload giay dang kiem
      // listHinhBaoHiem: [],
      // listHinhBaoHiem_upload: [],
      // refreshingHinhBaoHiem: false,
      // listHinhBaoHiem_download: [],
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
         mycontent.push(<Picker.Item label={item.Ten} value={item.Ma} tilte={item.Ten}/>);
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

  //Goi API Chinh sua xe
  openModalChinhSuaXe() {
    this.closeModalMore();

    this.openModalCapNhatXe();
    this.loadDataDetail(this.state.idCurrent);
  }

  openModalCapNhatXe() {
    this.setState({titleModal: "Chỉnh sửa xe"});
    this.setState({modalThemMoiXeVisible: true, buttonThemMoiXeVisible: false});
  }

  _clearDataInput() {
    this.setState({
      tenxe: null,
      hangsanxuat: 1,
      loaixe: 4,
      trongtai: null,
      phienban: null,
      namdangky: null,
      bienso: null,
      dataHinhXe: [],

    });
  }

  //load thong tin chi tiet xe khi chinh sua
  loadDataDetail(xeId) {
  //alert(xeId);
    fetch(myApi.Xe.ChiTiet + `${xeId}`).then(response => response.json()).then(responseJson => {
      //alert(JSON.stringify(responseJson));
      var result = responseJson.DataResult[0];
      //alert(result.SoChoNgoi);
      this.setState({
        dataDetail: responseJson
      }, function() {
        this.setState({
          tenxe: result.TenXe,
          bienso: result.BienSo,
          loaixeId: result.LoaiXeCode,
          loaidongcoId: result.LoaiDongCoCode,
          sochongoi: `${result.SoChoNgoi}`,
          mauxe:result.Mau,
          sotien: `${result.SoTien}`,
          tilechuxe: `${result.TiLeChuXe}`,
          ghichu: result.GhiChu
          }, function(){
            //this.onValueChangeTinhTP(result)
            //this.setState({refreshingHinhXe: false})
          });
        });
      }).catch(error => {
        console.error(error);
      });
  }


  //them moi xe
  onThemMoiXe(){
    this.setState({isLoading: true});
    fetch(myApi.Xe.CapNhat, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "UserName": "admin",
        "TenXe": this.state.tenxe,
        "BienSo": this.state.bienso,
        "Mau": this.state.mauxe,
        "LoaiDongCoCode": this.state.loaidongcoId,
        "LoaiXeCode": this.state.loaixeId,
        "SoChoNgoi": this.state.sochongoi,
        "SoTien": this.state.sotien,
        "GhiChu": this.state.ghichu,
        "TangGiaCuoiTuan": 100000,
        "TinhThanhID": 0,
        "Images": null,
        "FileName": null,
        "TiLeChuXe": this.state.tilechuxe
    })
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(responseJson => {
        if (responseJson.Result == true) {
          this.setState({isLoading: false});
          Alert.alert("Thông báo", "Thêm thành công");
          this.loadDanhSach();
        } else {
          this.setState({isLoading: false});
          Alert.alert("Thông báo", "Không thành công");
        }
    });
      } else {
        this.setState({isLoading: false});
        Alert.alert("Thông báo", "API lỗi, xin vui lòng thử lại sau");
        console.debug(response);
      }

    }).catch(error => {
      console.error(error);
      this.setState({isLoading: false});
      Alert.alert("Thông báo", "Lỗi kết nối, xin vui lòng thử lại sau");
    });
  }

  //cap nhat thong tin xe
  onCapNhatXe(){
    this.setState({isLoading: true});
    fetch(myApi.Xe.CapNhat, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "ID":this.state.idCurrent,
        "UserName": "admin",
        "TenXe": this.state.tenxe,
        "BienSo": this.state.bienso,
        "Mau": this.state.mauxe,
        "LoaiDongCoCode": this.state.loaidongcoId,
        "LoaiXeCode": this.state.loaixeId,
        "SoChoNgoi": this.state.sochongoi,
        "SoTien": this.state.sotien,
        "GhiChu": this.state.ghichu,
        "TangGiaCuoiTuan": 100000,
        "TinhThanhID": 0,
        "Images": null,
        "FileName": null,
        "TiLeChuXe": this.state.tilechuxe
    })
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(responseJson => {
        if (responseJson.Result == true) {
          this.setState({isLoading: false});
          Alert.alert("Thông báo", "Thêm thành công");
          this.loadDanhSach();
        } else {
          this.setState({isLoading: false});
          Alert.alert("Thông báo", "Không thành công");
        }
    });
      } else {
        this.setState({isLoading: false});
        Alert.alert("Thông báo", "API lỗi, xin vui lòng thử lại sau");
        console.debug(response);
      }

    }).catch(error => {
      console.error(error);
      this.setState({isLoading: false});
      Alert.alert("Thông báo", "Lỗi kết nối, xin vui lòng thử lại sau");
    });
  }

  //xoa xe
  xoaXe() {
    this.closeModalXoa();
    fetch(myApi.Xe.Xoa + `${this.state.idCurrent}`, {method: "GET"}).then(response => {
      //alert(JSON.stringify(response));
      if (response.status === 200) {
        return response.json().then(responseJson => {
          //alert(JSON.stringify(responseJson));
          if (responseJson.Result == true) {
            Alert.alert("Thông báo", "Xóa thành công");
            this.loadDanhSach();
          }
        });
      }
    }).then(response => {
      console.debug(response);
      this.setState({isLoading: false});
    }).catch(error => {
      console.error(error);
      this.setState({isLoading: false});
    });
  }

  //region modal
  openModalMore(id) {
    this.setState({modalVisible: true, idCurrent: id});
  }
  closeModalMore() {
    this.setState({modalVisible: false});
  }

  //open modal them moi xe
  openModalThemMoiXe() {
    this._clearDataInput();
    this.setState({titleModal: "Thêm mới xe"});
    this.setState({modalThemMoiXeVisible: true, buttonThemMoiXeVisible: true});
  }
  //close modal them moi xe
  closeModalThemMoiXe() {
    this.closeModalMore();
    this.setState({modalThemMoiXeVisible: false});
  }
  setmodalXoa() {
   this.setState({
     modalVisibleXoa: !this.state.modalVisibleXoa
   }, function() {
     this.setState({modalVisible: false});
   });
  }

  closeModalXoa() {
    this.setState({modalVisibleXoa: false});
  }
  //endregion

  showGetHinhXe() {
      pick((source, filename, data, type) => {
        this.onThemHinhXe(source, filename, data, type);
      });
    }

  onThemHinhXe(source, filename, data, type) {
    var list = this.state.dataHinhXe;
    list["Source"] = source;
    list["FileName"] = filename;
    list["FileType"] = data;
    list["Base64String"] = type;

    this.setState({
      dataHinhXe: list
    });
  }

  render() {
    return (<Container style={{
        backgroundColor: "#f4f4f4"
      }}>
      <Modal
          style={styles.modalLoading}
          animationType="fade"
          transparent={true}
          visible={this.state.isLoading}
          >
          <View style={styles.loadingView}>
            <Spinner
              style={styles.spinerLoading}
            />
          </View>
        </Modal>
      <Content refreshControl={<RefreshControl
                                  refreshing={this.state.refreshing}
                                  onRefresh={()=>{this.updateContent()}}/>
                              }>
        <FlatList data={this.state.listCar} refreshing={this.state.refreshing} renderItem={({item, index}) => (<View style={[styles.bgf, styles.shadow]}>
            <TouchableOpacity style={styles.button_more_list_car} onPress={() => this.openModalMore(item.ID)}>
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
      {/* Modal more */}
       <Modal animationType="fade" presentationStyle="fullScreen" transparent={true} visible={this.state.modalVisible}>
         <View style={styles.modal__bg_2}>
           <TouchableOpacity onPress={() => this.closeModalMore()} style={styles.modal__close}>
             <Ionicons style={styles.modal__close__icon} name="md-close-circle" color={"red"}/>
           </TouchableOpacity>
           <View style={[styles.bdrd, styles.bgf]}>
             <TouchableOpacity style={{
                 paddingTop: 5,
                 paddingBottom: 5
               }} onPress={() => {
                 this.openModalChinhSuaXe();
                 this.setState({titleModal: "Chỉnh sửa xe"});
               }}>
               <View style={[styles.thongtin_row]}>
                 <Text style={styles.thongtin_icon}>
                   <MaterialIcons color={globals.color.colorIcon} name="create" size={15}/>
                 </Text>
                 <Text style={styles.thongtin_txt2}>Chỉnh sửa</Text>
               </View>
             </TouchableOpacity>
             <TouchableOpacity style={{
                 paddingTop: 5,
                 paddingBottom: 5
               }} onPress={() => {
                 this.setmodalXoa();
               }}>
               <View style={[styles.thongtin_row]}>
                 <Text style={styles.thongtin_icon}>
                   <MaterialIcons color={globals.color.colorIcon} name="delete" size={15}/>
                 </Text>
                 <Text style={styles.thongtin_txt2}>Xóa</Text>
               </View>
             </TouchableOpacity>
           </View>
         </View>
       </Modal>

       {/* Modal xóa xe */}
       <Modal animationType="fade" presentationStyle="fullScreen" transparent={true} visible={this.state.modalVisibleXoa}>
         <View style={styles.modal__bg_3}>
           <View style={[styles.pd10, styles.bgf, styles.bdrd]}>
             <TouchableOpacity onPress={() => {
                 this.setmodalXoa();
               }} style={styles.modal__close}>
               <Ionicons style={styles.modal__close__icon} name="md-close-circle" color={"red"}/>
             </TouchableOpacity>
              <Text style={[styles.text_blue, {marginBottom: 10}]}>Xóa xe</Text>
             <Text>Bạn muốn xóa xe ra khỏi danh sách xe?</Text>
             <Text style={{
                 marginBottom: 10
               }}>
               {" "}
             </Text>
             <View style={{
                 flexDirection: "row",
                 justifyContent: "flex-end"
               }}>
               <Button transparent={true} onPress={() => this.setmodalXoa()}>
                 <Text>Hủy</Text>
               </Button>
               <Button transparent={true} onPress={() => this.xoaXe()}>
                 <Text>Đồng ý</Text>
               </Button>
             </View>
           </View>
         </View>
       </Modal>

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
            <View style={[styles.pd10]}>
              <View style={styles.title_chuyenhang2}>
                <Text style={[styles.text_blue]}>Thông tin xe</Text>
              </View>
              <Item stackedLabel={true}  style={[styles.frmInput__item]} >
                <Label style={styles.frm__label}>Tên xe</Label>
                <Input style={styles.frm_input} value={this.state.tenxe} onChangeText={tenxe => this.setState({tenxe})} ref={input => (this.tenxe = input)}/>
              </Item>

              <Item stackedLabel={true}  style={[styles.frmInput__item]}>
                <Label style={styles.frm__label}>Biển số</Label>
                <Input style={styles.frm_input} value={this.state.bienso} onChangeText={bienso => this.setState({bienso})} ref={input => (this.bienso = input)}/>
              </Item>

              <Item stackedLabel={true} style={[styles.frmInput__item]}>
                <Text style={styles.frm__label}>
                  Loại xe
                </Text>
                <Picker style={styles.picker__style_2} textStyle={styles.hanghoa_picker__textStyle} mode="dialog" headerBackButtonText={<FontAwesome name = "angle-left" size = {
                    20
                  } />
                } iosHeader="Loại xe" iosIcon={<FontAwesome name = "angle-down" />} selectedValue={this.state.loaixeId} onValueChange={(value, index) => this.setState({loaixeId: value})} itemStyle={styles.picker__itemStyle}>
                  {this._buildPickerByListData(this.state.listLoaiXe)}
                </Picker>
              </Item>

              <Item stackedLabel={true}  style={[styles.frmInput__item]}>
                <Text style={styles.frm__label}>Loại động cơ xe</Text>
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
                  <Item stackedLabel={true}  style={[styles.frmInput__item]}>
                    <Label style={styles.frm__label}>Số chỗ ngồi</Label>
                    <Input style={styles.frm_input} value={this.state.sochongoi} onChangeText={sochongoi => this.setState({sochongoi})} ref={input => (this.sochongoi = input)}/>
                  </Item>
                </View>
                <View style={{
                    flex: 1,
                    paddingLeft: 12
                  }}>
                  <Item stackedLabel={true}  style={[styles.frmInput__item]}>
                    <Label style={styles.frm__label}>Màu sắc</Label>
                    <Input style={styles.frm_input} value={this.state.mauxe} onChangeText={mauxe => this.setState({mauxe})} ref={input => (this.mauxe = input)}/>
                  </Item>
                </View>
              </View>

              <View style={[styles.mgt20, styles.pdb, styles.flexrow]}>
                <View style={{
                    flex: 1,
                    paddingRight: 12
                  }}>
                  <Item stackedLabel={true}  style={[styles.frmInput__item]}>
                    <Label style={styles.frm__label}>Phí thuê</Label>
                    <Input keyboardType="numeric" style={styles.frm_input} value={this.state.sotien} onChangeText={sotien => this.setState({sotien})} ref={input => (this.sotien = input)}/>
                  </Item>
                </View>
                <View style={{
                    flex: 1,
                    paddingLeft: 12
                  }}>
                  <Item stackedLabel={true}  style={[styles.frmInput__item]}>
                    <Label style={styles.frm__label}>Tiền chủ xe (%)</Label>
                    <Input style={styles.frm_input} value={this.state.tilechuxe} onChangeText={tilechuxe => this.setState({tilechuxe})} ref={input => (this.tilechuxe = input)}/>
                  </Item>
                </View>
              </View>

              <Item stackedLabel={true}  style={[styles.frmInput__item]}>
                <Label style={styles.frm__label}>Ghi chú</Label>
                <Input style={styles.frm_input} value={this.state.ghichu} onChangeText={ghichu => this.setState({ghichu})} ref={input => (this.ghichu = input)}/>
              </Item>

              <Item stackedLabel={true} style={[styles.frmInput__item]}>
                <Label style={styles.frm__label}>Hình xe</Label>
                <Input style={styles.text_input}/>
                <TouchableOpacity style={styles.button_them_hinh} onPress={() => this.showGetHinhXe()}>
                  <FontAwesome name="plus-square-o" size={21} style={[styles.icon_input_text, styles.icon_blue]}/>
                </TouchableOpacity>
              </Item>

              <View style={styles.box_img_upload}>
                <Image source={this.state.dataHinhXe['Source']} style={styles.img_upload}/>
              </View>

            </View>
          </View>

        </ScrollView>
        <Footer style={[styles.footer_page, styles.footer_action]}>
          <Button full={true} block={true} bordered={true} rounded={true} style={[
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
