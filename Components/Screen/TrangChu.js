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
      isLoading: 0,
      dataSource: [
        {
          title: "Title 1",
          caption: "Caption 1",
          url: "https://bxslider.com/assets/Images/plant.jpg"
        }, {
          title: "Title 2",
          caption: "Caption 2",
          url: "https://bxslider.com/assets/Images/daisies.jpg"
        }, {
          title: "Title 3",
          caption: "Caption 3",
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
      }, 2000)});
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (<Container>
      <Content>
        <Slideshow dataSource={this.state.dataSource} position={this.state.position} onPositionChanged={position => this.setState({position})} arrowSize={0} indicatorSize={16}/>
      </Content>
      <Footer style={styles.footer_home}>
        <View style={[styles.flexrow, styles.footer_home_row]}>
          <TouchableOpacity style={[styles.footer_home__item]}>
            <Text style={styles.footer_home__item__icon}>
              <FontAwesome name='qrcode' size={30}/>
            </Text>
            <Text style={styles.footer_home__item__text}>Kích hoạt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footer_home__item,styles.footer_home__item_mid ]}>
            <Text style={styles.footer_home__item__icon}>
              <FontAwesome name='qrcode' size={30}/>
            </Text>
            <Text style={styles.footer_home__item__text}>Lịch sử</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footer_home__item]}>
            <Text style={styles.footer_home__item__icon}>
              <FontAwesome name='qrcode' size={30}/>
            </Text>
            <Text style={styles.footer_home__item__text}>Hỏi đáp</Text>
          </TouchableOpacity>

        </View>
        <View style={[styles.flexrow, styles.footer_home_row]}>
          <TouchableOpacity style={[styles.footer_home__item]}>
            <Text style={styles.footer_home__item__icon}>
              <FontAwesome name='qrcode' size={30}/>
            </Text>
            <Text style={styles.footer_home__item__text}>Điểm tích lũy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footer_home__item,styles.footer_home__item_mid ]}>
            <Text style={styles.footer_home__item__icon}>
              <FontAwesome name='qrcode' size={30}/>
            </Text>
            <Text style={styles.footer_home__item__text}>Thống kê</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footer_home__item]}>
            <Text style={styles.footer_home__item__icon}>
              <FontAwesome name='qrcode' size={30}/>
            </Text>
            <Text style={styles.footer_home__item__text}>Sữa chửa bảo hành</Text>
          </TouchableOpacity>

        </View>
      </Footer>
    </Container>);
  }
}
