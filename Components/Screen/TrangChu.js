import React, {Component} from 'react';
import {
  Platform,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions
} from 'react-native';

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
import styles from '../Styles/Styles.js';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
const logo_img = '../images/logo.png';

//size img w500 x h100
const W_IMG = 1600, H_IMG = 600;
let Width_Holder = W_IMG,  Height_Holder = H_IMG;

try {
   Height_Holder = Dimensions.get('window').width * (H_IMG / W_IMG);
   Width_Holder = Dimensions.get('window').width;
} catch (e) {

} finally {

}


export default class More extends Component<Props> {
    constructor(props) {
      super(props);
      this.state = {
        phone: '',
        password: '',
        isLoading: 0,
      };

      setTimeout(function() {
        this.setState({introPage: false});
      }.bind(this), 500);
    };
    componentDidMount() {
      //slider img
       try {
           let scrollValue = 0, itemSlider = 3;
           setInterval(function() {
             scrollValue = scrollValue + Width_Holder;
             if (scrollValue >= (Width_Holder * itemSlider)) {
               scrollValue = 0;
             }
             _scrollView.scrollTo({x: scrollValue, y: 0, animated: true});
         }, 2000);
       } catch (e) {

       } finally {

       }


    }
  render() {
    return (<Container>
      <Content>
      <View>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} ref={(scrollView) => {
            _scrollView = scrollView;
          }} horizontal={true} pagingEnabled={false} style={{
            flexDirection: 'row'
          }}>
          <Image source={{
              uri: 'https://bxslider.com/assets/images/plant.jpg'
            }} style={{
              width: Width_Holder,
              height: Height_Holder
            }}/>

          <Image source={{
              uri: 'https://bxslider.com/assets/images/daisies.jpg'
            }} style={{
              width: Width_Holder,
              height: Height_Holder
            }}/>

          <Image source={{
              uri: 'https://bxslider.com/assets/images/succulents.jpg'
            }} style={{
              width: Width_Holder,
              height: Height_Holder
            }}/>
        </ScrollView>
      </View>

       <Text style={styles.titlePage}></Text>
      <View style={styles.listItemCate}>
        <View style={styles.item_cate}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("KichHoat")}>
                <Icon style={[styles.item_cate__icon, styles.icon1]} name='qrcode'/>
            </TouchableOpacity>
        </View>
        <View style={styles.item_cate}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("LichSu")}>
          <Icon style={[styles.item_cate__icon, styles.icon2]} name='history'/>
          </TouchableOpacity>
        </View>
        <View style={styles.item_cate}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("HoiDap")}>
          <Icon style={[styles.item_cate__icon, styles.icon3]} name='commenting-o'/>
          </TouchableOpacity>
        </View>
      </View>

      </Content>
    </Container>);
  }
}
