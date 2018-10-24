import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }
  async userLogout() {
      try {
        // await AsyncStorage.clear();
        // await AsyncStorage.removeItem("@Phone");
        await AsyncStorage.removeItem("@Logined");
        await AsyncStorage.removeItem("@UserName");
        this.props.navigation.navigate("LoginStack");
      } catch (error) {
        console.log("AsyncStorage error: " + error.message);
      }
    }
  render() {
    return (<View style={{padding: 20}}>
      <TouchableOpacity onPress={()=> this.userLogout()}>
          <Text>Logout</Text>
      </TouchableOpacity>

    </View>);
  }
}
