import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ListView,
    Image,
    Alert,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import firebase from 'firebase';


import { Colors, Styles } from './Shared'

import TextField from './Components/TextField';
import Button from './Components/Button';
import Separator from './Components/Separator';
const background_img = '../Images/background.png';
const logo_img = '../Images/logo.png';
var navigator;

export default class FriendsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            isLoading: true,
            userInfo:{},
            userId:"22"
        };
        navigator = this.props.navigator
    }

    getRef() {
      //firebase.auth()
      //   .signInWithEmailAndPassword('nobita.teo90@gmail.com', '123456')
      //firebase.auth().signOut();
      // firebase.auth()
      //    .signInWithEmailAndPassword('nobita.teo90@gmail.com', '123456')
      //    var user = firebase.auth().currentUser;
      //   Alert.alert('Thông báo',user.email + '123123');
        return firebase.database().ref();
    }

    listenForItems(friendsRef) {
        var user = firebase.auth().currentUser;
        //new user from api bao hanh dien tu
        var items = [];

        fetch('http://dev.baohanhdientu.net/api/Member_API/GetList?UserName='+ this.state.userInfo.LoginName, {method: "GET"}).then(response => {
          if (response.status === 200) {
            return response.json().then(responseJson => {
              responseJson.forEach((child) => {
                      if(child.ID != this.state.userId)
                      items.push({
                          name: child.FullName,
                          uid: child.ID
                      });
              });
              this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(items)
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

    componentDidMount() {
      this.setState({isLoading: true});
      AsyncStorage.getItem("username").then((value) => {
          this.setState({userInfo:JSON.parse(value)});
          this.setState({userId:String(this.state.userInfo.ID)});
          this.friendsRef = this.getRef().child('friends');
          this.listenForItems(this.friendsRef);
          //this.state.userInfo= JSON.parse(value);
          //this.setState({userInfo : });
          //Alert.alert('Thông báo',String(this.state.userInfo.ID));
          //return JSON.parse(value);
      })

    }

    static route = {
        navigationBar: {
            title: 'Friends List',
            ... Styles.NavBarStyles,
            renderRight: (route, props) => <Button primary
                style={styles.rightButton}
                onPress={() => {
                    firebase.auth().signOut().then(() => {
                        navigator.pop();
                    }, function (error) {
                        // An error happened.
                    });
                } }>Log out</Button>
        }
    }


    renderRow = (rowData) => {
        return (

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', {friend: rowData}) }>

            <View style={styles.profileContainer}>
                <Image source={{ uri: 'https://www.gravatar.com/avatar/'}} style={styles.profileImage}/>
                <Text style={styles.profileName}>{rowData.name}</Text>
            </View>
        </TouchableOpacity>
      );
    }

    render() {
      if (this.state.isLoading) {
        return (
          <ActivityIndicator style={styles.activity_indicator} size="large"  color="#0000ff"  />)
      }
      return (
          <View style={styles.container}>
              <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow} />

          </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        marginRight: 10,
        marginLeft: 10
    },
    rightButton: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 10,
        padding: 0,
    },
    topGroup: {
        flexDirection: 'row',
        margin: 10
    },
    myFriends: {
        flex: 1,
        color: Colors.grayColor,
        fontSize: 16,
        padding: 5
    },
    inviteFriends: {
        color: Colors.mainColor,
        padding: 5
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginLeft: 6,
        marginBottom: 8,
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: 6
    },
    profileName: {
        marginLeft: 6,
        fontSize: 16
    }

})
