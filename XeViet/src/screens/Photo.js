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

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import pick from "../common/picker.js";

const MAX_IMG_BAOHIEM = 2, MAX_IMG_GIAYDANGKIEM = 2, MAX_IMG_XE = 4;

export default class Photo extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      listHinhXe: [],
      listHinhXe_upload: [],
      refreshingHinhXe: false,
      listHinhXe_download: [],

    };
  }


  showGetHinhXe() {
    if(this.state.dangchinhsua == true && this.state.listHinhXe.length + this.state.listHinhXe_download.length >= MAX_IMG_XE){
      Alert.alert('Thông báo',"Quá số hình!");
      return;
    }
    if (this.state.listHinhXe.length < MAX_IMG_XE) {
      pick((source, filename, data, type) => {
        this.onThemHinhXe(source, filename, data, type);
      });
    } else {
      Alert.alert('Thông báo',"Quá số hình!");
    }
  }


  onThemHinhXe(source, filename, data, type) {
    var list = this.state.listHinhXe;
    var list2 = this.state.listHinhXe_upload;
    list.push({source: source});
    list2.push({FileName: filename, FileType: type, Base64String: data, Type: 1 }); //1 hinhxe, 2 giaydangkiem, 3 baohiem
    this.setState({
      listHinhXe: list,
      listHinhXe_upload: list2,
      refreshingHinhXe: true
    }, function() {
      this.setState({refreshingHinhXe: false});
    });
  }

  onXoaHinhXe(index) {
      var list =  this.state.listHinhXe;
      var list2 = this.state.listHinhXe_upload;
      list.splice(index, 1);
      list2.splice(index, 1);
      this.setState({
        listHinhXe: list,
        refreshingHinhXe:true,
      }, function() {
          this.setState({refreshingHinhXe: false})
      });
    }

  render() {
    return (<Container>
      <Content>
        <Item stackedLabel={true} style={[
            styles.frm__item,
            styles.frm__item_2
          ]}>
          <Label style={styles.frm__label}>Hình xe</Label>
          <TouchableOpacity style={styles.button_them_hinh} onPress={() => this.showGetHinhXe()}>
            <FontAwesome name="plus-square-o" size={21} style={[styles.icon_input_text, styles.icon_blue]}/>
          </TouchableOpacity>
          <Input style={styles.frm__input}/>
          <Text style={styles.lbl_count_img}>
            (Tối đa{' '}{MAX_IMG_XE}{' '}hình)
          </Text>
        </Item>
        <View style={[styles.flexrow, {alignItems: 'flex-start'}]}>
          <FlatList numColumns={4} horizontal={false} data={this.state.listHinhXe_download}
            refreshing={this.state.refreshingHinhXe}
            renderItem={({item, index}) => (
            <View style={styles.box_img_upload}>
              <Image source={{uri: item}} style={styles.img_upload}/>
              <TouchableOpacity onPress={() => this.onXoaHinhXe_download(index)} style={styles.button_remove_img_upload}>
                <Ionicons name='ios-close-circle' style={styles.icon_remove_img_upload}/>
              </TouchableOpacity>
            </View>)}/>
          <FlatList  numColumns={4} horizontal={false} data={this.state.listHinhXe}
            refreshing={this.state.refreshingHinhXe}
            renderItem={({item, index}) => (
            <View style={styles.box_img_upload}>
              <Image source={item.source} style={styles.img_upload}/>
              <TouchableOpacity onPress={() => this.onXoaHinhXe(index)} style={styles.button_remove_img_upload}>
                <Ionicons name='ios-close-circle' style={styles.icon_remove_img_upload}/>
              </TouchableOpacity>
            </View>)}/>
        </View>
      </Content>
    </Container>);
  }
}
