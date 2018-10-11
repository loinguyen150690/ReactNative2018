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
      listNhaSanXuat: [],
      listLoaiXe: [],
      tenxe: null,
      hangsanxuat: 1,
      loaixe: 4,
      trongtai:null,
      phienban: null,
      namdangky: null,
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
    this.loadDanhSach();
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
      this.props.navigation.navigate("Calendar", {id:_xeId});
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
              <TouchableOpacity onPress={() => this.navToChiTiet(item.Id)} style={{
                  margin: 0,
                  padding: 0
                }}>
                <Thumbnail square={true} style={styles.news__img} source={{
                     uri: myApi.Image.URL +  item.Images
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
      </Container>)
    }

}
