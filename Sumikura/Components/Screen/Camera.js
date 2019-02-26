import React, {Component} from 'react';
import {Platform, View, Image, Modal, TouchableHighlight, StyleSheet, Alert, AsyncStorage, PermissionsAndroid} from 'react-native';
import Camera from 'react-native-camera';
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
import { withNavigationFocus } from "react-navigation";

  export default class ScanCamera  extends React.Component {
    static navigationOptions = {
      title: "Ariadne's Thread",
    };

    state = {
      focusedScreen: true,
      hasCameraPermission: null,
      qrcode: ''
    };

    onBarCodeRead = (e) => {
      const { navigation } = this.props;
      var serial_tmp = (navigation.state.params.serial ? (navigation.state.params.serial + ',' + e.data) :  e.data)
      navigation.goBack();
      navigation.state.params.onSelect(serial_tmp);
    }

    async componentWillMount() {
      //const { status } = await Permissions.askAsync(Permissions.CAMERA);
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,{
          'title': 'AndoridPermissionExample App Camera Permission',
          'message': 'AndoridPermissionExample App needs access to your camera '
        }
      )
      this.setState({ hasCameraPermission: status === PermissionsAndroid.RESULTS.GRANTED });
    }

    componentDidMount() {
      const { navigation } = this.props;
      navigation.addListener('willFocus', () =>
        this.setState({ focusedScreen: true })
      );
      navigation.addListener('willBlur', () =>
        this.setState({ focusedScreen: false })
      );
    }

    render() {
      const { hasCameraPermission, focusedScreen } = this.state;
      if (hasCameraPermission === null) {
        return <View />;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else if (focusedScreen){
        return (this.cameraView());
      } else {
        return <View />;
      }
    }

    cameraView() {
      return (
        <View style={{ flex: 1, backgroundColor :"#0C0D0E" }}>
          <Camera
            style={styles.preview}
            onBarCodeRead={this.onBarCodeRead}
            ref={cam => this.camera = cam}
            aspect={Camera.constants.Aspect.fill}
            barCodeTypes={['org.iso.QRCode']}
            >
                <Text style={{
                    backgroundColor: 'white'
                }}>{this.state.qrcode}</Text>

            </Camera>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  });
