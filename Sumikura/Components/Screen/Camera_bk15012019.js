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

class ScanCamera extends Component<Props> {
  constructor(props) {
        super(props);
        this.state = {
            qrcode: ''//,
          //  modalVisible: false
        }
    }

    // onBarCodeRead = (e) => {
    // Alert.alert(
    //   'Scan successful!',
    //   JSON.stringify(e.data)
    // ); //this.setState({qrcode: e.data});
    // const { navigation } = this.props;
    // navigation.goBack();
    // navigation.state.params.onSelect({ resulttext: e.data });

        onBarCodeRead = (e) => {
          //Alert.alert(
          //  'Scan successful!',
          //  JSON.stringify(e.data)
          //); //this.setState({qrcode: e.data});
          const { navigation } = this.props;
          var serial_tmp = (navigation.state.params.serial ? (navigation.state.params.serial + ',' + e.data) :  e.data)
          navigation.goBack();
          navigation.state.params.onSelect(serial_tmp);
          //navigation.setParams({ id: data });
    }
    // _goBack() {
    //   Alert.alert(
    //     'Scan successful!',
    //     JSON.stringify('go back')
    //   );
    //   const { navigation } = this.props;
    //   navigation.goBack();
    //   navigation.state.params.onSelect({ selected: '0979150724' });
    //   //this.props.navigation.state.params.onSelect({ resulttext: 'ok nha'  });
    // }
    //
    //   navigation.state.params({ resulttext: 'ok nha'  });
    //const { navigation } = this.props;
    //navigation.goBack();
    //navigation.state.params({ resulttext: 'ok nha'  });
//  }
//}

  /*setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }*/
  componentDidMount = () => {
   //Checking for the permission just after component loaded
    async function requestCameraPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,{
            'title': 'AndoridPermissionExample App Camera Permission',
            'message': 'AndoridPermissionExample App needs access to your camera '
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          alert("You can use the CAMERA");
        } else {
          alert("CAMERA permission denied");
        }
      } catch (err) {
        alert("err",err);
        console.warn(err)
      }
    }
    //Calling the permission function
    requestCameraPermission();
 }
 renderCamera() {
      const { isFocused } = this.props//this.props.navigation.isFocused();

        if (!isFocused) {
            return null;
        } else if (isFocused) {
            return (
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
            )
        }
  }

  render() {
    //const { goBack } = this.props.navigation;
    return (
     //<View  style={styles.container}>

     <View style={{ flex: 1 }}>
          {this.renderCamera()}
       </View>
        // <Button block={true} rounded={true} bordered={true} style={{
        //     backgroundColor: 'black'
        // }} onPress={this._goBack.bind(this)}>
        //   <Text style={{
        //       backgroundColor: 'black'
        //   }}>TẠO MỚI</Text>
        // </Button>

    //  </View>
  );
  }
}

export default withNavigationFocus(ScanCamera);

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
