import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Picker,
  Item,
  Alert,
  Modal,
  FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      pickerVisible:false,
      language_name: null,
      language_value: null,
      dataPicker:[
        {key: '1', name: 'English'},
        {key: '2', name: 'Tiếng Việt'},
        {key: '3', name: 'Italiano'},
        {key: '4', name: 'Deutsch'},
        {key: '5', name: '日本語'},
        {key: '6', name: 'Français'},
        {key: '7', name: 'Русский'},
      ]
    }
  }
  openModal(){
    this.setState({
      modalVisible: true
    })
  }

  closeModal(){
    this.setState({
      modalVisible: false
    })
  }

  openPicker(){
    this.setState({
      pickerVisible: true
    })
    this.closeModal();
  }
  closePicker(){
    this.openModal()
    this.setState({
      pickerVisible: false
    })
  }

  getValuePicker(key, name){
    this.setState({
      language_name: name,
      language_value: key,
    });
    this.closePicker();
  }

  renderPicker = ({item}) => (
    <TouchableOpacity style={styles.mypicker_item} onPress={()=> this.getValuePicker(item.key, item.name)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <SafeAreaView style={styles.safeareaview}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidContainer}
          behavior="padding">
          <ScrollView style={styles.scrollviewcontent}>
            <View style={styles.input_item}>
              <Text style={styles.label_text}>User name</Text>
              <TextInput
                style={styles.text_input}
                placeholder={'Enter text here'}
                blurOnSubmit={false}
                underlineColorAndroid="transparent"
                returnKeyType={Platform.OS === 'ios' ? 'next' : 'next'}
              />
            </View>

            <View style={{marginBottom: 56}}></View>
          </ScrollView>
          <View style={styles.action_footer}>
            <TouchableOpacity style={styles.mybutton}>
              <Text style={styles.mybutton_text}>Click here</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <View style={styles.btnAddBottom}>
          <View style={styles.btnCircleBottom}>
            <TouchableOpacity onPress={()=> this.openModal()}>
              <Entypo name="plus" color={'white'} size={26} />
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="none"
          transparent={false}
          visible={this.state.modalVisible}>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidContainer}
            behavior="padding">
            <TouchableOpacity style={styles.button_close_modal} onPress={()=>this.closeModal()}>
              <Ionicons style={styles.icon_close_modal} name="ios-close-circle-outline"/>
            </TouchableOpacity>
            <ScrollView style={styles.scrollviewcontent}>
              <View style={styles.input_item}>
                <Text style={styles.label_text}>Name</Text>
                <TextInput
                  style={styles.text_input}
                  placeholder={'Enter text here'}
                  onSubmitEditing={()=> {this.txt12.focus();}}
                  blurOnSubmit={false}
                  underlineColorAndroid="transparent"
                  returnKeyType={Platform.OS === 'ios' ? 'next' : 'next'}
                />
              </View>

              <View style={styles.input_item}>
                <Text style={styles.label_text}>Language</Text>
                <TextInput
                  value={this.state.language_name}
                  style={styles.text_input}
                  placeholder={'Select language'}
                  underlineColorAndroid="transparent"
                />
                <Ionicons style={styles.icon_dropdown} name="ios-arrow-down"/>
                <TouchableOpacity style={styles.button_picker} onPress={()=> this.openPicker()}></TouchableOpacity>
              </View>

              <View style={styles.input_item}>
                <Text style={styles.label_text}>Full name</Text>
                <TextInput
                  style={styles.text_input}
                  placeholder={'Enter text here'}
                  ref={elem => this.txt12 = elem}
                  onSubmitEditing={()=> {this.txt13.focus();}}
                  blurOnSubmit={false}
                  underlineColorAndroid="transparent"
                  returnKeyType={Platform.OS === 'ios' ? 'next' : 'next'}
                />
              </View>

              <View style={styles.input_item}>
                <Text style={styles.label_text}>Address</Text>
                <TextInput
                  style={styles.text_input}
                  placeholder={'Enter text here'}
                  ref={elem => this.txt13 = elem}
                  onSubmitEditing={()=> {this.txt14.focus();}}
                  blurOnSubmit={false}
                  underlineColorAndroid="transparent"
                  returnKeyType={Platform.OS === 'ios' ? 'next' : 'next'}
                />
              </View>

              <View style={styles.input_item}>
                <Text style={styles.label_text}>Company</Text>
                <TextInput
                  style={styles.text_input}
                  placeholder={'Enter text here'}
                  ref={elem => this.txt14 = elem}
                  onSubmitEditing={()=> {this.txt15.focus();}}
                  blurOnSubmit={false}
                  underlineColorAndroid="transparent"
                  returnKeyType={Platform.OS === 'ios' ? 'next' : 'next'}
                />
              </View>

              <View style={styles.input_item}>
                <Text style={styles.label_text}>Phone</Text>
                <TextInput
                  style={styles.text_input}
                  placeholder={'Enter text here'}
                  ref={elem => this.txt15 = elem}
                  onSubmitEditing={()=> {this.txt16.focus();}}
                  blurOnSubmit={false}
                  underlineColorAndroid="transparent"
                  returnKeyType={Platform.OS === 'ios' ? 'next' : 'next'}
                />
              </View>

              <View style={styles.input_item}>
                <Text style={styles.label_text}>Email</Text>
                <TextInput
                  style={styles.text_input}
                  placeholder={'Enter text here'}
                  ref={elem => this.txt16 = elem}
                  underlineColorAndroid="transparent"
                  returnKeyType={Platform.OS === 'ios' ? 'done' : 'done'}
                />
              </View>

              <View style={{marginBottom: 56}}></View>
            </ScrollView>
            <View style={styles.action_footer}>
              <TouchableOpacity style={styles.mybutton} onPress={()=> this.closeModal()}>
                <Text style={styles.mybutton_text}>Click here</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>


        <Modal
          animationType="none"
          transparent={false}
          visible={this.state.pickerVisible}>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidContainer}
            behavior="padding">
            <TouchableOpacity style={styles.button_close_modal} onPress={()=>this.closePicker()}>
              <Ionicons style={styles.icon_close_modal} name="ios-close-circle-outline"/>
            </TouchableOpacity>
            <ScrollView style={styles.scrollviewcontent}>
              <FlatList
                data={this.state.dataPicker}
                style={styles.mypicker}
                renderItem={this.renderPicker}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
  keyboardAvoidContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    marginTop: Platform.OS === "ios" ? 20 : 0
  },
  scrollviewcontent:{
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  input_item:{
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8,
    marginTop: 8,
    position: 'relative'
  },
  icon_dropdown:{
    position: 'absolute',
    bottom: 8,
    right: 4,
    zIndex: 1,
    color:'#666'
  },
  button_picker:{
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2
  },
  text_input: {
    margin: 0,
    padding: 0,
    paddingBottom: 0,
    marginBottom: 0,
    paddingLeft: 0,
    height: 32,
    width: '100%',
    color: '#000',
  },
  label_text:{
    color: '#999'
  },
  mybutton:{
    height: 40,
    width: '100%',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'orange',
  },
  mybutton_text:{
    width: '100%',
    textAlign:'center',
    lineHeight: 41,
    textTransform: 'uppercase',
    color: 'orange',
  },
  action_footer:{
    padding:8,
    paddingRight: 24,
    paddingLeft: 24,
    backgroundColor: "#fff"
  },
  button_close_modal:{
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 9,
    alignItems: 'center',
    justifyContent:'center',
    height: 40,
    width: 40,
  },
  icon_close_modal:{
    color: 'orange',
    fontSize: 35
  }
  ,mypicker_item:{
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  btnAddBottom:{
    bottom: 72,
    right: 12,
    position:'absolute',
    alignSelf:'flex-end',
  },
  btnCircleBottom:{
    alignItems: 'center',
    justifyContent:'center',
    height: 50,
    width: 50,
    borderRadius: 60,
    backgroundColor: 'orange',
    shadowColor: "#ddd",
    shadowRadius: 0,
    shadowOpacity: 0.5,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 1
    },
  },
});
