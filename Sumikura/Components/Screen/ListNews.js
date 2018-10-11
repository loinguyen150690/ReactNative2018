import React, {Component} from 'react';
import {Platform, View, Image, Modal, TouchableHighlight, StyleSheet, TouchableOpacity, AppRegistry, ActivityIndicator, Alert} from 'react-native';
import Camera from 'react-native-camera';
import {StackNavigator} from 'react-navigation';
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

import QQBrowserScreen from './Camera.js';


export default class ListNews extends Component<Props> {
  constructor(props) {
        super(props);
        this._navigateToScreen = this._navigateToScreen.bind(this);
    }
    state = { selected: '',   isLoading: false };

    onSelect = data => {
      this.setState(data);
    };

    onPress = () => {
      this.props.navigate("ViewB", { onSelect: this.onSelect });
    };
  //  onBarCodeRead = (e) => this.setState({qrcode: e.data});

  onInsert() {
    this.setState({isLoading: true});
    fetch('http://dev.baohanhdientu.net/api/SMS_DynamicAPI/Active_Online', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        //'ProductModel': $scope.S_ProductModel,
        ProductSerial: this.state.selected,
        PhoneNumber: '0979150724',
        CustomerPhone: '0979150724',
        CustomerName: 'Loi',
        PurchaseArea: 'Binh Dinh'
      })
    })

    .then(response => {
      this.setState({isLoading: false});
      if (response.status === 200) {
        return response.json().then(responseJson => {
          if (responseJson){
            Alert.alert('Thông báo', responseJson.Message);
            //this.props.navigation.navigate('HomePage');
            // try {
            //   await AsyncStorage.setItem('@Loginned:key', 'true');
            // } catch (e) {
            //   console.log(e);
            // } finally {}
          }
          else {
              Alert.alert('Thông báo', 'Kích hoạt lỗi');
          }
        });
      }
      else {
        Alert.alert('Thông báo', 'API Lỗi, vui lòng thử lại sau!');
      }
    })

    .then(response => {
      console.debug(response);
      this.setState({isLoading: false});
    })

    .catch(error => {
      console.error(error);
      this.setState({isLoading: false});
      Alert.alert('Thông báo', 'Lỗi kết nối, vui lòng thử lại sau!');
    });

  }


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#3DB2E3',
            tintColor: 'white'
          }}/>)
    }
        return (
            <View style={styles.view_container}>
            <Item floatingLabel={true} style={styles.frmlogin__item}>
              <Label style={styles.frm__label}>Tên công ty</Label>
              <Input value={this.state.selected} style={styles.frm_input}/>
            </Item>
            <TouchableOpacity onPress={this._navigateToScanerBarcode.bind(this)}>
                <View>
                    <Text
                        style={{fontSize: 18, color: 'black'}}
                    >QR Code</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.action_bottom_2}>
              <Button bordered={true} style={styles.frmgetpass__btn} onPress={this.onInsert.bind(this)}>
                <Text style={styles.frmgetpass__btn__txt}>KÍCH HOẠT</Text>
              </Button>
            </View>
            </View>
        );
    }

    _navigateToScreen(screen) {
        //Toast.show(screen)
        const {navigate} = this.props.navigation;
        navigate(screen, { onSelect: this.onSelect });
    }

    _navigateToScanerBarcode() {
        this._navigateToScreen('ScanQRCode')
    }
}

const styles = StyleSheet.create({
    view_container: {
        flex: 1,
    },
    view_avatar_container: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 12
    },
    view_avatar_name_container: {
        marginBottom: 32,
        marginTop: 32,
        alignItems: 'center'
    },
    image_avatar: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
        borderRadius: 200,
    },
    text_item: {
        color: 'white',
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 8,
        textAlign: 'center',
        padding: 16,
        borderRadius: 8,
        fontSize: 18,
    }
})
