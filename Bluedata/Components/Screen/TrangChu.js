import React, {Component} from "react";
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
import Slideshow from "react-native-slideshow";
import styles from "../Styles/Styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const logo_img = "../Images/logo.png";

//size img w500 x h100
const W_IMG = 1600,
  H_IMG = 600;
let Width_Holder = W_IMG,
  Height_Holder = H_IMG;

try {
  Height_Holder = Dimensions.get("window").width * (H_IMG / W_IMG);
  Width_Holder = Dimensions.get("window").width;
} catch (e) {} finally {}

const win = Dimensions.get('window');
const HEIGHT_SLIDER= win.height - ((win.width / 4 * 2) + 52 + 50) -33;


export default class TrangChu extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    const {
      params = {}
    } = navigation.state;
    return {headerRight: (<TouchableOpacity onPress={params.handleSubmit} style={{
        paddingRight: 20,
        paddingLeft: 20
      }}>
      <Ionicons name="md-lock" size={25} color={"white"}/>
    </TouchableOpacity>)};
  };

  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: "",
      position: 1,
      interval: null,
      isLoading: false,
      dataSource: [
        {
          title: null,
          caption: null,
          url: "https://bxslider.com/assets/Images/plant.jpg"
        }, {
          title: null,
          caption: null,
          url: "https://bxslider.com/assets/Images/daisies.jpg"
        }, {
          title: null,
          caption: null,
          url: "https://bxslider.com/assets/Images/succulents.jpg"
        }
      ]
    };

  }

  componentDidMount() {
    this.props.navigation.setParams({handleSubmit: this.DangXuat});
  }
  DangXuat = () => {
    AsyncStorage.removeItem("username");
    this.props.navigation.navigate('Login');
  };

  componentWillMount() {
    this.setState({interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length
            ? 0
            : this.state.position + 1
        });
      }, 3000)});
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  }
  navToKichHoat() {
    this.saveItem("@TabBarActive",'3');
    this.props.navigation.navigate("KichHoat");
  }
  navToLichSu() {
    this.saveItem("@TabBarActive",'5');
    this.props.navigation.navigate("LichSu");
  }

  navToHoiDap() {
    this.props.navigation.navigate("HoiDap");
  }
  navToDiemTichLuy() {
    // this.props.navigation.navigate("DiemTichLuy");
  }
  navToThongKe() {
    // this.props.navigation.navigate("ThongKe");
  }
  navToSuaChuaBaoHanh() {
    // this.props.navigation.navigate("SuaChuaBaoHanh");
  }
  render() {
    return (<Container>
      <Content>
        <Slideshow height={HEIGHT_SLIDER} dataSource={this.state.dataSource} position={this.state.position} onPositionChanged={position => this.setState({position})} arrowSize={0} indicatorSize={10}/>
      </Content>
      <Footer style={styles.footer_home}>
        <View style={[styles.flexrow, styles.footer_home_row]}>
          <TouchableOpacity style={[styles.footer_home__item]} onPress={()=> this.navToKichHoat()}>
            <Text style={styles.footer_home__item__icon}>
              <FontAwesome name='qrcode' size={30}/>
            </Text>
            <Text style={styles.footer_home__item__text}>Kích hoạt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footer_home__item,styles.footer_home__item_mid ]}  onPress={()=> this.navToLichSu()}>
            <Text style={styles.footer_home__item__icon}>
              <Ionicons name='ios-list-box' size={36}/>
            </Text>
            <Text style={styles.footer_home__item__text}>Lịch sử</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footer_home__item]} onPress={()=> this.navToHoiDap()}>
            <Text style={styles.footer_home__item__icon}>
              <FontAwesome name='commenting-o' size={30}/>
            </Text>
            <Text style={styles.footer_home__item__text}>Hỏi đáp</Text>
          </TouchableOpacity>

        </View>
        <View style={[styles.flexrow, styles.footer_home_row]}>
          <TouchableOpacity style={[styles.footer_home__item]}>
            <Text style={styles.footer_home__item__icon}>
              <FontAwesome name='credit-card' size={30}/>
            </Text>
            <Text style={styles.footer_home__item__text}>Điểm tích lũy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footer_home__item,styles.footer_home__item_mid ]}>
            <Text style={styles.footer_home__item__icon}>
              <MaterialIcons name='pie-chart-outlined' size={30}/>
            </Text>
            <Text style={styles.footer_home__item__text}>Thống kê</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footer_home__item]}>
            <Text style={styles.footer_home__item__icon}>
              <Ionicons name='ios-build' size={30}/>
            </Text>
            <Text style={styles.footer_home__item__text}>Sữa chửa bảo hành</Text>
          </TouchableOpacity>

        </View>
      </Footer>
    </Container>);
  }
}
