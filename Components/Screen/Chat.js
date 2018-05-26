import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert
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
            messages: []
        };

        this.user = firebase.auth().currentUser

        this.friend = this.props.navigation.state.params.friend;

        this.chatRef = this.getRef().child('chat/' + this.generateChatId());
        this.chatRefData = this.chatRef.orderByChild('order')
        this.onSend = this.onSend.bind(this);
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
        this.listenForItems(this.chatRefData);
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
                uid: this.user.uid,
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
                    _id: this.user.uid,
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
