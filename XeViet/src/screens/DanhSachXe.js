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
import DateTimePicker from "react-native-modal-datetime-picker";
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
import InfoUser from "../common/InfoUser.js";
import call from 'react-native-phone-call';
export default class DanhSachXe extends Component<Props> {

  static navigationOptions = ({ navigation }) => {
    const { params = {}} = navigation.state;
    return {
     headerRight: (
       <TouchableOpacity onPress={params.handleSubmit}
          style={{paddingRight: 20,paddingLeft: 20, display: params.groupUser == "KHACH" ? "none" : "flex"}}>
          <FontAwesome name="search" size={25} color={"white"}/>
        </TouchableOpacity>
     ),
   };
  };



  constructor(props) {
    super(props);
    this.state = {
      user:{},
      userName:"",
      groupUser:"QUANLY",
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
      modalTimKiemXeVisible: false,
      //id: null,

      data: null,
      listLoaiDongCo: [],
      listLoaiXe: [],
      listChuXe:[],
      //thong tin xe
      chuxe:null,
      tenxe: "",
      loaixeId: 1,
      loaidongcoId: 1,
      bienso: null,
      mauxe:null,
      sochongoi:null,
      sotien:null,
      tylechuxe:null,
      ghichu:null,
      hinhxe: [],
      hopso:null,
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
      },
      //timkiem
      arrStatus:[],
      statusId: null,
      tungay:null,
      denngay:null,
      timkiem_giatu: null,
      timkiem_giaden: null,
      timkiem_tungay: null,
      timkiem_denngay: null,
      timkiem_sochongoi: null,
      timkiem_namsx: null,
      tungay_isDatePickerVisible: false,
      denngay_isDatePickerVisible: false,
    };
  }

  GetInfoUser() {
    InfoUser(responseJson => {
      if(responseJson){
        this.setState({
          user:responseJson,
          userName:responseJson.Username,
          groupUser: responseJson.GroupUser
        }, function() {
          this.loadDanhSach(responseJson.Username);
          this._loadDataChuXe(responseJson.Username);
          this.props.navigation.setParams({handleSubmit: this.submitStatus, groupUser: responseJson.GroupUser});
        });
      }
    });
  }

  _call(phone){
      call({number: phone, prompt: false}).catch(console.error)
  }
  openModalTimKiemXe() {
    this.setState({modalTimKiemXeVisible: true,  loaixeId:'All', statusId:'All'})
  }

  closeModalTimKiemXe(){
    this.setState({modalTimKiemXeVisible: false})
  }
  componentDidMount() {
     this.GetInfoUser();
     //alert(this.state.groupUser);
  }
  submitStatus = () => {
      this.openModalTimKiemXe();
  };

  componentWillMount() {
    this._loadDataLoaiXe('admin');
    this._loadDataLoaiDongCo('admin');
    this._loadDataStatus('admin');
  }

  _loadDataLoaiXe(userName) {
    fetch(myApi.LoaiXe.DanhSach, {
      method: "GET"
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJson => {
          this.setState({
            loaixeId: responseJson.DataResult[0].Ma,
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
            loaidongcoId: responseJson.DataResult[0].Ma,
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

  _loadDataChuXe(userName) {
    fetch(myApi.NguoiDung.DanhSach, {
      method: "GET"
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJson => {
          this.setState({
            chuxe:responseJson.DataResult[0].Username,
            listChuXe: responseJson.DataResult
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

  _buildPickerByListDataChuXe(listData){
    //var listData = this.state.arrStatus;
    //build data to picker.item
    let mycontent = [],
       length = listData.length,
       i = 0,
       item;
     if (length > 0) {
       for (; i < length; i++) {
         item = listData[i];
         mycontent.push(<Picker.Item label={item.FullName} value={item.Username} tilte={item.FullName}/>);
       }
     }
    return mycontent;
  }

  _buildPickerByListData(listData, isItemEmpty){
    //var listData = this.state.arrStatus;
    //build data to picker.item
    let mycontent = [],
       length = listData.length,
       i = 0,
       item;
     if(isItemEmpty){
        mycontent.push(<Picker.Item label='Tất cả' value='All' tilte='Tất cả'/>);
     }
     if (length > 0) {
       for (; i < length; i++) {
         item = listData[i];
         mycontent.push(<Picker.Item label={item.Ten} value={item.Ma} tilte={item.Ten}/>);
       }
     }
    return mycontent;
  }

  // Gọi API Load danh sách
  loadDanhSach(userName) {
    //alert(this.state.userName);
    this.setState({
      refreshing: true
    });
    fetch(myApi.Xe.DanhSach + userName, {
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

  GetFormattedDate(todayTime) {
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    return year + "-" + month + "-" + day;
  }
  onTimXe(){
    var strTuNgay = '';
    if(this.state.tungay){
        strTuNgay= this.GetFormattedDate(this.state.tungay);
    };
    var strDenNgay ='';
    if(this.state.denngay){
        strDenNgay = this.GetFormattedDate(this.state.denngay);
    }
    var url = myApi.Xe.DanhSach + this.state.userName + '&TrangThaiCode='+ this.state.statusId + '&LoaiXeCode=' + this.state.loaixeId + '&TuNgay=' + strTuNgay + '&DenNgay=' + strDenNgay+ '&TenXe=' + this.state.tenxe;
    //alert(url);
    this.setState({
      isLoading: true
    });

    fetch(url, {
      method: "GET"
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJson => {
          this.setState({
            listCar: responseJson.DataResult,
            isLoading: false
          });
          this.closeModalTimKiemXe();
        });
      }
      else{
          //alert(JSON.stringify(response));
          this.setState({isLoading: false, refreshing : false});
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
      this.loadDanhSach(this.state.userName);
  }
  navToChiTiet(_xeId){
      //alert(_xeId);
      if(this.state.groupUser == "KHACH"){
        this._call('0812680680');
        return;
      }
      this.props.navigation.navigate("Calendar", {id:_xeId});
  }
  _clearDataInput() {
    this.setState({
      tenxe: null,
      bienso: null,
      loaixeId: null,
      loaidongcoId: null,
      sochongoi: null,
      mauxe: null,
      bienso: null,
      sotien:null,
      tylechuxe:null,
      ghichu:null,
      dataHinhXe: {},
      hopso:null

    });
  }

  //load thong tin chi tiet xe khi chinh sua
  loadDataDetail(xeId) {
  //alert(xeId)
    fetch(myApi.Xe.ChiTiet + `${xeId}`).then(response => response.json()).then(responseJson => {
      //alert(JSON.stringify(responseJson));
      var result = responseJson.DataResult;
      //alert(result.SoChoNgoi);
      this.setState({
        dataDetail: responseJson
      }, function() {
        this.setState({
          chuxe:result.UserName,
          tenxe: result.TenXe,
          bienso: result.BienSo,
          loaixeId: result.LoaiXeCode,
          loaidongcoId: result.LoaiDongCoCode,
          sochongoi: result.SoChoNgoi ? `${result.SoChoNgoi}` : `${0}`,
          mauxe:result.Mau,
          sotien: result.SoTien ? `${result.SoTien}` : `${0}`,
          tilechuxe: result.TiLeChuXe ? `${result.TiLeChuXe}` : `${0}`,
          ghichu: result.GhiChu,
          hopso:result.HopSo
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
    if (!this.state.tenxe) {
      Alert.alert("Thông báo", "Chưa nhập tên xe!");
      return;
    }

    this.setState({isLoading: true});
    fetch(myApi.Xe.CapNhat, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "UserName": this.state.chuxe,
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
        "Images": this.state.dataHinhXe.Base64String,
        "FileName": this.state.dataHinhXe.FileName,
        "TiLeChuXe": this.state.tilechuxe,
        "HopSo":this.state.hopso
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
    if (!this.state.tenxe) {
      Alert.alert("Thông báo", "Chưa nhập tên xe!");
      return;
    }

    this.setState({isLoading: true});
    fetch(myApi.Xe.CapNhat, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "ID":this.state.idCurrent,
        "UserName": this.state.chuxe,
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
        "Images": this.state.dataHinhXe.Base64String,
        "FileName": this.state.dataHinhXe.FileName,
        "TiLeChuXe": this.state.tilechuxe,
        "HopSo":this.state.hopso
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
  //Goi API Chinh sua xe
  openModalChinhSuaXe() {
    this.closeModalMore();
    this.openModalCapNhatXe();
    this.loadDataDetail(this.state.idCurrent);
  }

  openModalCapNhatXe() {
    this._clearDataInput();
    this.setState({titleModal: "Chỉnh sửa xe"});
    this.setState({modalThemMoiXeVisible: true, buttonThemMoiXeVisible: false});
  }

  onThemHinhXe(source, filename, data, type) {
    var list = this.state.dataHinhXe;
    list["Source"] = source;
    list["FileName"] = filename;
    list["FileType"] = type;
    list["Base64String"] = data;
    //alert(JSON.stringify(list));
    this.setState({
      dataHinhXe: list
    });
  }


  _loadDataStatus(userName) {
    fetch(myApi.TrangThai.DanhSach  + userName, {
      method: "GET"
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJson => {
          //alert(JSON.stringify(responseJson.DataResult));
          this.setState({
            //statusId:responseJson.DataResult[0].Ma,
            arrStatus: responseJson.DataResult
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

  _buidPickerStatus(isItemEmpty){
    var list = this.state.arrStatus;
    //build data to picker.item
    let mycontent = [],
       length = list.length,
       i = 0,
       item;
    if(isItemEmpty){
        // this.setState({
        //   statusId: 'All'
        // });
        mycontent.push(<Picker.Item label='Tất cả' value='All' tilte='Tất cả'/>);
    }
    if (length > 0) {
       for (; i < length; i++) {
         item = list[i];
         mycontent.push(<Picker.Item label={item.Ten} value={item.Ma} tilte={item.Ten}/>);
       }
     }
    return mycontent;
  }

  _showDatePicker_TuNgay = () => {
      this.setState({ tungay_isDatePickerVisible: true });
    };
    _handleDatePicked_TuNgay = datetime => {
      var ngay = new Date(datetime);
      let y = ngay.getFullYear(),
        m = ngay.getMonth(),
        d = ngay.getDate();
        m++;
        let str_m='', str_d = '';

        if(m<10){
          str_m ='0'+`${m}`;
        }
        else {
          str_m =`${m}`;
        }
        if(d<10){
          str_d ='0'+`${d}`;
        }
        else {
          str_d = `${d}`;
        }

      let str = str_d + "/" + str_m + "/" + `${y}`;
      this.setState({
        tungay_isDatePickerVisible: false,
        timkiem_tungay: str,
        tungay:datetime
      });
    };
    _hideDatePicker_TuNgay = () => {
      this.setState({ tungay_isDatePickerVisible: false });
    };

    _showDatePicker_DenNgay = () => {
      this.setState({ denngay_isDatePickerVisible: true });
    };
    _handleDatePicked_DenNgay = datetime => {
      var ngay = new Date(datetime);
      let y = ngay.getFullYear(),
        m = ngay.getMonth(),
        d = ngay.getDate();
        m++;
        let str_m='', str_d = '';

        if(m<10){
          str_m ='0'+`${m}`;
        }
        else {
          str_m =`${m}`;
        }
        if(d<10){
          str_d ='0'+`${d}`;
        }
        else {
          str_d = `${d}`;
        }
      let str = str_d + "/" + str_m + "/" + `${y}`;
      this.setState({
        denngay_isDatePickerVisible: false,
        timkiem_denngay: str,
        denngay:datetime
      });
    };
    _hideDatePicker_DenNgay = () => {
      this.setState({ denngay_isDatePickerVisible: false });
    };
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
            <TouchableOpacity style={[styles.button_more_list_car, {opacity: this.state.groupUser =='QUANLY' ? 1 : 0}]} onPress={() => this.openModalMore(item.ID)}>
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
                    <Text style={styles.news__txt3}>
                        Giá thuê: {item.SoTienStr}đ/ngày
                    </Text>
                    <Text style={styles.news__txt3}>
                        Màu sắc: {item.Mau}
                    </Text>
                    <Text style={styles.news__txt3}>
                        Hộp số: {item.HopSo}
                    </Text>
                  </View>
                </TouchableOpacity>

              </Body>
            </ListItem>
          </View>)}/>
      </Content>
      <Fab style={[styles.fabAdd, {opacity: this.state.groupUser =='QUANLY' ? 1 : 0}]}
        position="bottomRight"  pointerEvents = { this.state.groupUser =='QUANLY' ? 'auto' : 'none'}
        onPress={() => {this.openModalThemMoiXe();  }}>
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
                <Item stackedLabel={true} style={[styles.frmInput__item]}>
                  <Text style={styles.frm__label}>
                    Chủ xe
                  </Text>
                  <Picker style={styles.picker__style_2} textStyle={styles.hanghoa_picker__textStyle} mode="dialog" headerBackButtonText={<FontAwesome name = "angle-left" size = {
                      20
                    } />
                  } iosHeader="Chủ xe" iosIcon={<FontAwesome name = "angle-down" />} selectedValue={this.state.chuxe} onValueChange={(value, index) => this.setState({chuxe: value})} itemStyle={styles.picker__itemStyle}>
                    {this._buildPickerByListDataChuXe(this.state.listChuXe)}
                  </Picker>
                </Item>

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
                    {this._buildPickerByListData(this.state.listLoaiXe, false)}
                  </Picker>
                </Item>

                <Item stackedLabel={true}  style={[styles.frmInput__item]}>
                  <Text style={styles.frm__label}>Loại động cơ xe</Text>
                  <Picker style={styles.picker__style_2} textStyle={styles.hanghoa_picker__textStyle} mode="dialog" headerBackButtonText={<FontAwesome name = "angle-left" size = {
                      20
                    } />
                  } iosHeader="Loại động cơ" iosIcon={<FontAwesome name = "angle-down" />} selectedValue={this.state.loaidongcoId} onValueChange={(value, index) => this.setState ({loaidongcoId:value})} itemStyle={styles.picker__itemStyle}>
                    {this._buildPickerByListData(this.state.listLoaiDongCo, false)}
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
                      <Input keyboardType="numeric" style={styles.frm_input} value={this.state.tilechuxe} onChangeText={tilechuxe => this.setState({tilechuxe})} ref={input => (this.tilechuxe = input)}/>
                    </Item>
                  </View>
                </View>
                <Item stackedLabel={true}  style={[styles.frmInput__item]}>
                  <Label style={styles.frm__label}>Hộp số</Label>
                  <Input style={styles.frm_input} value={this.state.hopso} onChangeText={hopso => this.setState({hopso})} ref={input => (this.hopso = input)}/>
                </Item>
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
      {/* modal tim kiem xe  */}

      <Modal animationType="fade" transparent={false} visible={this.state.modalTimKiemXeVisible} presentationStyle="fullScreen">
        <View style={[styles.modal__bg_nopad, styles.fixed_header_footer]}>
          <View style={styles.modal_header_page}>
              <TouchableOpacity style={ styles.buton_back_header} onPress={() => {
                  this.closeModalTimKiemXe();
                }}>
                <Ionicons name={'md-close'} style={styles.icon_back_header}/>
              </TouchableOpacity>

              <Text style={[styles.modal_header_tilte]}>Tìm kiếm xe</Text>
          </View>
          <ScrollView>
            <View style={[ styles.bgf ]}>
              <View style={[styles.pd10]}>
                <View style={styles.title_chuyenhang2}>
                  <Text style={[styles.text_blue]}>Thông tin tìm kiếm</Text>
                </View>
                <Item stackedLabel={true}  style={[styles.frmInput__item]} >
                  <Label style={styles.frm__label}>Tên xe</Label>
                  <Input style={styles.frm_input} value={this.state.tenxe} onChangeText={tenxe => this.setState({tenxe})} ref={input => (this.tenxe = input)}/>
                </Item>

                <Item stackedLabel={true} style={[styles.frmInput__item]}>
                  <Text style={styles.frm__label}>Trạng thái</Text>
                  <Picker style={styles.picker__style_2}
                    textStyle={styles.hanghoa_picker__textStyle} mode="dialog" headerBackButtonText={<FontAwesome name = "angle-left" size = {
                      20
                    } />
                  }
                  iosHeader="Trạng thái" iosIcon={<FontAwesome name = "angle-down" />}
                  selectedValue={this.state.statusId}
                  onValueChange={(value, index) => this.setState({statusId: value})}
                  itemStyle={styles.picker__itemStyle}>
                    {this._buidPickerStatus(true)}
                  </Picker>
                </Item>

                <Item stackedLabel={true} style={[styles.frmInput__item]}>
                  <Text style={styles.frm__label}>
                    Loại xe
                  </Text>
                  <Picker style={styles.picker__style_2} textStyle={styles.hanghoa_picker__textStyle} mode="dialog" headerBackButtonText={<FontAwesome name = "angle-left" size = {
                      20
                    } />
                  } iosHeader="Loại xe" iosIcon={<FontAwesome name = "angle-down" />} selectedValue={this.state.loaixeId} onValueChange={(value, index) => this.setState({loaixeId: value})} itemStyle={styles.picker__itemStyle}>
                    {this._buildPickerByListData(this.state.listLoaiXe, true)}
                  </Picker>
                </Item>

                <Item stackedLabel={true}  style={[styles.frmInput__item, {display:"none"}]}>
                  <Text style={styles.frm__label}>Loại động cơ xe</Text>
                  <Picker style={styles.picker__style_2} textStyle={styles.hanghoa_picker__textStyle} mode="dialog" headerBackButtonText={<FontAwesome name = "angle-left" size = {
                      20
                    } />
                  } iosHeader="Loại động cơ" iosIcon={<FontAwesome name = "angle-down" />} selectedValue={this.state.loaidongcoId} onValueChange={(value, index) => this.setState ({loaidongcoId:value})} itemStyle={styles.picker__itemStyle}>
                    {this._buildPickerByListData(this.state.listLoaiDongCo, true)}
                  </Picker>
                </Item>

                <View style={[styles.mgt20, styles.pdb, styles.flexrow, {display:"none"}]}>
                  <View style={{
                      flex: 1,
                      paddingRight: 12
                    }}>
                    <Item stackedLabel={true}  style={[styles.frmInput__item]}>
                      <Label style={styles.frm__label}>Giá từ(50000)</Label>
                      <Input style={styles.frm_input} value={this.state.timkiem_giatu} onChangeText={timkiem_giatu => this.setState({timkiem_giatu})} ref={input => (this.timkiem_giatu = input)}/>
                    </Item>
                  </View>
                  <View style={{
                      flex: 1,
                      paddingLeft: 12
                    }}>
                    <Item stackedLabel={true}  style={[styles.frmInput__item]}>
                      <Label style={styles.frm__label}>Giá đến(500000)</Label>
                      <Input style={styles.frm_input} value={this.state.timkiem_giaden} onChangeText={timkiem_giaden => this.setState({timkiem_giaden})} ref={input => (this.timkiem_giaden = input)}/>
                    </Item>
                  </View>
                </View>

                <View style={[styles.mgt20, styles.pdb, styles.flexrow, {display:"none"}]}>
                  <View style={{
                      flex: 1,
                      paddingRight: 12
                    }}>
                    <Item stackedLabel={true}  style={[styles.frmInput__item]}>
                      <Label style={styles.frm__label}>Năm sản xuất</Label>
                      <Input keyboardType="numeric" style={styles.frm_input} value={this.state.timkiem_namsx} onChangeText={timkiem_namsx => this.setState({timkiem_namsx})} ref={input => (this.timkiem_namsx = input)}/>
                    </Item>
                  </View>
                  <View style={{
                      flex: 1,
                      paddingLeft: 12
                    }}>
                    <Item stackedLabel={true}  style={[styles.frmInput__item]}>
                      <Label style={styles.frm__label}>Số chỗ ngồi</Label>
                      <Input style={styles.frm_input} value={this.state.timkiem_sochongoi} onChangeText={timkiem_sochongoi => this.setState({timkiem_sochongoi})} ref={input => (this.timkiem_sochongoi = input)}/>
                    </Item>
                  </View>
                </View>

                <View style={[styles.mgt20, styles.pdb, styles.flexrow]}>
                  <View style={{
                      flex: 1,
                      paddingRight: 12
                    }}>
                    <Item stackedLabel={true}  style={[styles.frmInput__item]}>
                      <Label style={styles.frm__label}>Từ ngày</Label>
                      <Input style={styles.frm_input} value={this.state.timkiem_tungay} onChangeText={timkiem_tungay => this.setState({timkiem_tungay})} ref={input => (this.timkiem_tungay = input)}/>
                      <TouchableOpacity
                       onPress={this._showDatePicker_TuNgay}
                       style={styles.btn_abs_input}
                     />
                     <DateTimePicker
                       isVisible={this.state.tungay_isDatePickerVisible}
                       onConfirm={this._handleDatePicked_TuNgay}
                       onCancel={this._hideDatePicker_TuNgay}
                       mode={"date"}
                       cancelTextIOS={"Hủy"}
                       confirmTextIOS={"Chọn"}
                       titleIOS={"Từ ngày"}
                     />
                    </Item>
                  </View>
                  <View style={{
                      flex: 1,
                      paddingLeft: 12
                    }}>
                    <Item stackedLabel={true}  style={[styles.frmInput__item]}>
                      <Label style={styles.frm__label}>Đến ngày</Label>
                      <Input style={styles.frm_input} value={this.state.timkiem_denngay} onChangeText={timkiem_denngay => this.setState({timkiem_denngay})} ref={input => (this.timkiem_denngay = input)}/>
                      <TouchableOpacity
                        onPress={this._showDatePicker_DenNgay}
                        style={styles.btn_abs_input}
                      />
                      <DateTimePicker
                        isVisible={this.state.denngay_isDatePickerVisible}
                        onConfirm={this._handleDatePicked_DenNgay}
                        onCancel={this._hideDatePicker_DenNgay}
                        mode={"date"}
                        cancelTextIOS={"Hủy"}
                        confirmTextIOS={"Chọn"}
                        titleIOS={"Đến ngày"}
                      />
                    </Item>
                  </View>
                </View>

              </View>
            </View>

          </ScrollView>
          <Footer style={[styles.footer_page, styles.footer_action]}>
            <Button full={true} block={true} bordered={true} rounded={true} style={[
                styles.frmgetpass__btn
              ]}
              onPress={() => this.onTimXe()}>
              <Text style={styles.btn_border_blue__txt}>Tìm xe</Text>
            </Button>

          </Footer>
        </View>
      </Modal>
    </Container>)
    }

}
