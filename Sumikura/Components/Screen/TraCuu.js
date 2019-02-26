import React, { Component } from "react";
import {
    Platform,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Dimensions,
    TextInput,
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
    Content
} from "native-base";

import styles from "../Styles/Styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";

export default class More extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            serial: "",//"ISC092T4180501141,ISC092T4180501433",
            fullname: "",
            phone: "",
            address: "",
            isLoading: false,
            userInfo:{}
        };
    }
    onSelect = data => {
      //var serial_tmp = (this.state.serial ? (this.state.serial + ',' + data) :  data)
      var serial_tmp = data;
      this.setState({serial:serial_tmp});
    };

    componentDidMount() {
      AsyncStorage.getItem("username").then((value) => {
          this.setState({userInfo:JSON.parse(value)});
      })
    }

    onActive() {
      this.setState({isLoading: true});
      fetch('http://dev.baohanhdientu.net/api/SMS_DynamicAPI/Active_OnlineMulti', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          PhoneNumber: this.state.userInfo.CellPhone,
          ProductSerial: this.state.serial,
          ProductModel: 'NoSearch',
          SMSType:"2"
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

    render() {
      if (this.state.isLoading) {
        return (
          <ActivityIndicator style={styles.activity_indicator} size="large"  color="#0000ff"  />)
      }
        return (
            <Container>
                <Content style={{ backgroundColor: "#fff", paddingTop: 30 }}>
                    <KeyboardAvoidingView behavior="padding" enabled={true}>
                      <Label style={[styles.frm__label, {paddingLeft: 16}]}>
                          Serial dàn lạnh
                      </Label>
                        <View style={styles.serial}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 4 }}>
                                    <TextInput
                                          multiline = {true}
                                        underlineColorAndroid={'white'}
                                          numberOfLines = {4}
                                           value={this.state.serial}
                                           onChangeText={serial =>
                                               this.setState({ serial })
                                           }
                                           style={[styles.frm_input,styles.frm_input_area] }
                                      />
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' , alignItems: 'center'}}>
                                    <TouchableOpacity
                                        style={{
                                            marginTop: 10,
                                            paddingLeft: 10
                                        }}
                                        onPress={() => this.props.navigation.navigate("ScanQRCode", {onSelect: this.onSelect, serial:this.state.serial })}
                                    >
                                        <Icon
                                            style={[styles.icon4]}
                                            name="qrcode"
                                        />
                                        <Text style={{fontSize: 12, textAlign: 'center', color:'#666'}}>Quét{'\n'}mã code</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </KeyboardAvoidingView>
                    <View
                        style={
                            (styles.action_bottom,
                            { marginTop: 40, padding: 16 })
                        }
                    >
                        <Button
                            block={true}
                            bordered={true}
                            rounded={true}
                            style={styles.btn_blue}
                            onPress={this.onActive.bind(this)}
                        >
                            <Text style={styles.btn_blue__text}>
                                TRA CỨU
                            </Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}
