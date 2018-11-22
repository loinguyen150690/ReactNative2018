import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    AsyncStorage
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';
//import md5 from '../lib/md5'

import { Colors, Styles } from './Shared'

import TextField from './Components/TextField';
import Button from './Components/Button';
import Separator from './Components/Separator';

export default class Chat extends Component {
    static navigationOptions = ({navigation}) => {
      const {state} = navigation;
      if (state.params != undefined) {
        return {
          title: `${state.params.friend.name}`
        }
      }
    };
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            userInfo:{},
            userId:"11"
        };
        //var test = this.state.userInfo;
    }

    generateChatId() {
      if(this.user.uid > this.friend.uid)
        return `${this.user.uid}-${this.friend.uid}`
      else
        return `${this.friend.uid}-${this.user.uid}`
    }

    // static route = {
    //     navigationBar: {
    //         title: 'Chat',
    //         ... Styles.NavBarStyles
    //     }
    // }
    getRef() {
        return firebase.database().ref();
    }

    listenForItems(chatRef) {
        chatRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                var avatar = 'https://www.gravatar.com/avatar/'
                items.push({
                    _id: child.val().createdAt,
                    text: child.val().text,
                    createdAt: new Date(child.val().createdAt),
                    user: {
                        _id: child.val().uid,
                        avatar: avatar
                    }
                });
            });

            this.setState({
                loading: false,
                messages: items
            })


        });
    }

    componentDidMount() {
      AsyncStorage.getItem("username").then((value) => {
          this.setState({userInfo:JSON.parse(value)});
          this.setState({userId:String(this.state.userInfo.ID)});
          this.user = {uid : String(this.state.userInfo.ID)};//{firebase.auth().currentUser}

          this.friend = this.props.navigation.state.params.friend;

          this.chatRef = this.getRef().child('chat/' + this.generateChatId());
          this.chatRefData = this.chatRef.orderByChild('order')
          this.onSend = this.onSend.bind(this);
          this.listenForItems(this.chatRefData);
          //this.state.userInfo= JSON.parse(value);
          //this.setState({userInfo : });
          //Alert.alert('Thông báo',String(this.state.userInfo.ID));
          //return JSON.parse(value);
      })

    }

    componentWillUnmount() {
        this.chatRefData.off()
    }

    onSend(messages = []) {

        // this.setState({
        //     messages: GiftedChat.append(this.state.messages, messages),
        // });
        messages.forEach(message => {
            var now = new Date().getTime()
            this.chatRef.push({
                _id: now,
                text: message.text,
                createdAt: now,
                uid: this.state.userId,
                order: -1 * now
            })
        })

    }
    render() {

        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend.bind(this)}
                user={{
                    _id: this.state.userId,
                }}
                />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        marginRight: 10,
        marginLeft: 10
    }
})
