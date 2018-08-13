import React, {Component} from 'react';
import {Platform, View, Image} from 'react-native';

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
  Thumbnail
} from 'native-base';

const img_lichsu = "../Images/icon_change.png";
import styles from "../Styles/Styles.js";

export default class More extends Component<Props> {
  render() {
    return (<Container>
      <Content>
        <List style={{padding: 0}}>
          <ListItem itemDivider={true}   style={{backgroundColor: '#f5f5f5'}}>
            <Text>THANG 5/2018</Text>
          </ListItem>
          <ListItem avatar={true} style={[styles.lichsu__item]}>
            <Left>
              <Thumbnail style={styles.img_lichsu} source={require(img_lichsu)}/>
            </Left>
            <Body style={styles.bdb0}>
              <Text>Kich hoat Serial AB123215</Text>
              <Text note style={{
                  color: 'red'
                }}>Thanh cong</Text>
            </Body>
            <Right style={styles.bdb0}>
              <Text note>10/05/2018</Text>
            </Right>
          </ListItem>

          <ListItem avatar={true} style={[styles.lichsu__item]}>
            <Left>
              <Thumbnail style={styles.img_lichsu} source={require(img_lichsu)}/>
            </Left>
            <Body style={styles.bdb0}>
              <Text>Kich hoat Serial AB123215</Text>
              <Text note style={{
                  color: 'red'
                }}>Thanh cong</Text>
            </Body>
            <Right  style={styles.bdb0}>
              <Text note>10/05/2018</Text>
            </Right>
          </ListItem>

          <ListItem avatar={true} style={[styles.lichsu__item]}>
            <Left>
              <Thumbnail style={styles.img_lichsu} source={require(img_lichsu)}/>
            </Left>
            <Body style={styles.bdb0}>
              <Text>Kich hoat Serial AB123215</Text>
              <Text note style={{
                  color: 'red'
                }}>Thanh cong</Text>
            </Body>
            <Right style={styles.bdb0}>
              <Text note>10/05/2018</Text>
            </Right>
          </ListItem>

        </List>

      </Content>

    </Container>);
  }
}
