import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  Content,
  ListItem,
  Radio
} from "native-base";
import styles from "../styles/styles.js";
const bottom = 70;
const styles2 = StyleSheet.create({
  bg1:{
    backgroundColor: '#fff',
    opacity: 0.2,
    position: 'absolute',
    top: 0,
    bottom: bottom,
    left: 20,
    right: 20,
    zIndex: 0,
  }
  ,
  bg2:{
    backgroundColor: '#fff',
    opacity: 0.2,
    position: 'absolute',
    top:10,
    bottom: bottom + 10,
    left: 10,
    right: 10,
    zIndex: 0,
  }
  ,
  slide__item:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#000',
    marginBottom: bottom + 20,
  },
  slide1: {
    backgroundColor: '#9DD6EB',
  } ,
  text: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 8,
    paddingRight: 8,
    color: '#000',
    fontSize: 20,
    backgroundColor: '#fff',
    width: '100%',
    textAlign:'center',
  },
  page_title: {
    alignItems: "center",
  },
  welcome: {
    color: "#fff"
  }
})
const background_img = "../images/background.jpg";

export default class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      groupUser: 'QUANLY',
    };
  }
  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  }

  GetInfoUser() {
        AsyncStorage.getItem("@Logined")
        .then(token => {
          if (token) {
            this.props.navigation.navigate("HomePage");
          }
        });
  }

  componentWillMount() {
    // Kiem tra type user hop le chuyen sang page login
    // AsyncStorage.getItem("@TypeUse").then(token => {
    //   if (token !== null && token !== "") {
    //      this.props.navigation.navigate("Login");
    //   }
    // });
    this.GetInfoUser();
  }
  navToLogin(){
    //this.saveItem("@TypeUse",this.state.type.toString());
    this.props.navigation.navigate("Login", {groupUser:this.state.groupUser});
  }
  render() {
    return (<Container>
      <Image
        source={require(background_img)}
        style={styles.backgroundImage}
      />
      <View style={{flexDirection: 'column', alignItems: 'center', paddingTop: 24, paddingBottom: 16}}>
        <Text style={{color: '#fff', fontSize: 20,}}>
        Chào mừng đến với
        </Text>
        <Text style={{color: '#fff', fontSize: 50,}}>Xe Việt</Text>
      </View>
      <View style={[{width:'100%', marginTop: 50, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}]}>
        <ListItem onPress={()=> this.setState({ groupUser: "QUANLY" })}
          radioColor="red"
          style={[styles.radio__item]}>
          <Radio
            radioColor="red"
            radioSelectedColor={"red"}
            selected={this.state.groupUser === "QUANLY"}
            onPress={()=> this.setState({ groupUser: "QUANLY" })}
            style={styles.rdo}
          />
          <Text style={styles.rdo__txt}>Quản lý</Text>
        </ListItem>

        <ListItem onPress={()=> this.setState({ groupUser: "CHUXE" })}
          radioColor="red"
          style={styles.radio__item}>
          <Radio
            radioColor="red"
            radioSelectedColor={"red"}
            selected={this.state.groupUser ==="CHUXE"}
            onPress={()=> this.setState({ groupUser: "CHUXE" })}
            style={styles.rdo}
          />
          <Text style={styles.rdo__txt}>Chủ xe</Text>
        </ListItem>

        <ListItem onPress={()=> this.setState({ groupUser: "KHACH" })}
          radioColor="red"
          style={styles.radio__item}>
          <Radio
            radioColor="red"
            radioSelectedColor={"red"}
            selected={this.state.groupUser === "KHACH"}
            onPress={()=> this.setState({ groupUser: "KHACH" })}
            style={styles.rdo}
          />
          <Text style={styles.rdo__txt}>Khách</Text>
        </ListItem>
      </View>
      <TouchableOpacity onPress={()=> this.navToLogin()}  style={{position: 'absolute', bottom: 0, right: 0, padding: 24}}>
        <Text style={{color: '#fff', fontSize: 13}}>Tiếp theo</Text>
      </TouchableOpacity>
    </Container>);
  }
}
