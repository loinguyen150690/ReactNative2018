/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import FBSDK, { LoginManager , AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
	 _initUser(token) {
	  fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token).then((response) => response.json())
	  .then((json) => {
		// Some user object has been set up somewhere, build that user here
		alert(json.name)
		
	})
	  .catch(() => {
		reject('ERROR GETTING DATA FROM FACEBOOK')
	  })
	}

	 _fbAuth() {
      LoginManager.logInWithReadPermissions(['public_profile']).then(
         function(result) {
            if (result.isCancelled) {
               alert('Login cancelled');
            } else {
               alert('Đăng nhập thành công: '
               +	JSON.stringify(result));
			    AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    let accessToken = data.accessToken
					
					 const responseInfoCallback = (error, result) => {
						if (error) {
						  console.log(error)
						  alert('Error fetching data: ' + error.toString());
						} else {
						  console.log(result)
						  alert('Success fetching data: ' + JSON.stringify(result));
						}
					  }
						
						 const infoRequest = new GraphRequest(
						'/me',
						{
						  accessToken: accessToken,
						  parameters: {
							fields: {
							  string: 'email,name,first_name,middle_name,last_name'
							}
						  }
						},
						responseInfoCallback
					  );

					  // Start the graph request.
					  new GraphRequestManager().addRequest(infoRequest).start()
					
                  }
                )
            }
         },
         function(error) {
            alert('Login fail with error: ' + error);
         }
      );
   }
  
  render() {
     return (
         <View style={styles.container}>
            <TouchableOpacity onPress={this._fbAuth}>
               <Text>Login with Facebook</Text>
            </TouchableOpacity>
         </View>
      );
  }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
   },
   welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
   },
   instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
   },
});
