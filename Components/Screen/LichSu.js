import React, {Component} from 'react';
import {Platform, View, Image, FlatList, TouchableOpacity} from 'react-native';

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
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Spinner
} from 'native-base';

const img_lichsu = "../Images/icon_change.png";
import styles from "../Styles/Styles.js";

export default class More extends Component<Props> {
  constructor(props) {
  super(props);
  this.state = {
    data: [],
     isLoading: false,
     refreshing: false
   };
 }
 componentWillMount() {
    this.loadDanhSach();
 }
 loadDanhSach() {
   this.setState({isLoading: true});
   fetch('http://dev.baohanhdientu.net/api/ActiveHistory?UserName=""', {method: "GET"}).then(response => {
     if (response.status === 200) {
       return response.json().then(responseJson => {
         this.setState({
           data: responseJson,
           isLoading: true
         });
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
 navToChiTietLichSu(_id) {
   this.props.navigation.navigate("ChiTietLichSu", {id:_id});
 }

  render() {
    if(this.state.isLoading){
      return (<Spinner color='blue' />);
    }
    return (<Container>
      <Content>
          <ListItem itemDivider={true}   style={{backgroundColor: '#f5f5f5'}}>
           <Text>THÁNG 08/2018</Text>
         </ListItem>
          <FlatList
            data={this.state.data} refreshing={this.state.refreshing}
            renderItem={({item}) =>
            <ListItem avatar={true} style={[styles.lichsu__item]}>
               <Left>
                 <Thumbnail style={styles.img_lichsu} source={require(img_lichsu)}/>
               </Left>
               <Body style={styles.bdb0}>
                <TouchableOpacity  onPress={()=> this.navToChiTietLichSu(item.ID)}>
                    <Text>{item.SmsMessage}</Text>
                 </TouchableOpacity>
                 <Text note style={{
                     color: item.WarrantSmsReceverStatus == 1 ? 'green' : 'red'
                   }}>{item.WarrantSmsReceverStatus == 1 ? "Thành công" : "Thất bại"}</Text>
               </Body>
               <Right style={styles.bdb0}>
                 <Text note>{item.CreatedDate}</Text>
               </Right>
          </ListItem>

          }
          />
          </Content>
          </Container>
      );
  }
}
