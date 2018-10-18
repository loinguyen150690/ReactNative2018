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
      type: 1,
    };
  }
  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  }
  componentWillMount() {
    // Kiem tra type user hop le chuyen sang page login
    // AsyncStorage.getItem("@TypeUse").then(token => {
    //   if (token !== null && token !== "") {
    //      this.props.navigation.navigate("Login");
    //   }
    // });
  }
  navToLogin(){
    this.saveItem("@TypeUse",this.state.type.toString());
    this.props.navigation.navigate("Login");
  }
  render() {
    return (<Container>
      <Image
        source={require(background_img)}
        style={styles.backgroundImage}
      />
      <View style={{flexDirection: 'column', alignItems: 'center', paddingTop: 24, paddingBottom: 16}}>
        <Text style={{color: '#fff', fontSize: 20,}}>
        Chao mung den voi
        </Text>
        <Text style={{color: '#fff', fontSize: 50,}}>Shippers</Text>
      </View>
      <View style={[{width:'100%', marginTop: 50, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}]}>
        <ListItem onPress={()=> this.setState({ type: 1 })}
          radioColor="red"
          style={[styles.radio__item]}>
          <Radio
            radioColor="red"
            radioSelectedColor={"red"}
            selected={this.state.type === 1}
            onPress={()=> this.setState({ type: 1 })}
            style={styles.rdo}
          />
          <Text style={styles.rdo__txt}>Chủ hàng</Text>
        </ListItem>

        <ListItem onPress={()=> this.setState({ type: 2 })}
          radioColor="red"
          style={styles.radio__item}>
          <Radio
            radioColor="red"
            radioSelectedColor={"red"}
            selected={this.state.type ===2}
            onPress={()=> this.setState({ type: 2 })}
            style={styles.rdo}
          />
          <Text style={styles.rdo__txt}>Chủ xe</Text>
        </ListItem>

        <ListItem onPress={()=> this.setState({ type: 5 })}
          radioColor="red"
          style={styles.radio__item}>
          <Radio
            radioColor="red"
            radioSelectedColor={"red"}
            selected={this.state.type === 5}
            onPress={()=> this.setState({ type: 5 })}
            style={styles.rdo}
          />
          <Text style={styles.rdo__txt}>Tài xế</Text>
        </ListItem>
      </View>
      <TouchableOpacity onPress={()=> this.navToLogin()}  style={{position: 'absolute', bottom: 0, right: 0, padding: 24}}>
        <Text style={{color: '#fff', fontSize: 13}}>Tiếp theo</Text>
      </TouchableOpacity>
    </Container>);
  }
}
