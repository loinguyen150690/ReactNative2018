import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  Button,
  Modal
} from 'react-native';
import {Icon } from 'native-base';

import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
LocaleConfig.locales['vn'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12'
  ],
  monthNamesShort: [
    'Thg1',
    'Thg2',
    'Thg3',
    'Thg4',
    'Thg5',
    'Thg6',
    'Thg7',
    'Thg8',
    'Thg9',
    'Thg10',
    'Thg11',
    'Thg12'
  ],
  dayNames: [
    'Chủ nhật',
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7'
  ],
  dayNamesShort: [
    'CN',
    'T2',
    'T3',
    'T4',
    'T5',
    'T6',
    'T7'
  ]
};
import styles from "../styles/styles";
import Ionicons from "react-native-vector-icons/Ionicons";

LocaleConfig.defaultLocale = 'vn';
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      day: null,
      text: null,
      DataCalendar:{
        '2018-10-01' : {
          bgColor: 'blue',
          textColor: '#000',
          content: "Complete"
        },
        '2018-10-16' : {
          bgColor: 'green',
          textColor: '#000',
          content: "OnGoing"
        },
        '2018-10-17' : {
          bgColor: 'red',
          textColor: '#000',
          content: "Off"
        },
        '2018-10-18' : {
          bgColor: 'pink',
          textColor: '#000',
          content: "Booked"
        },
        '2018-10-19' : {
          bgColor: 'red',
          textColor: '#000',
          content: "Off"
        }
      }
    }
  }

  componentWillMount() {
    var id = this._getId();
    this._loadDataXeDetail(id);
  }

  _getId() {
    let id = 0;
    if (this.props.navigation.state.params) {
      id = this.props.navigation.state.params.id;
    }
    return id;
  }

  _loadDataXeDetail(id) {
    // fetch(myApi.Xe.ChiTiet + `${id}`).then(response => response.json()).then(responseJson => {
    //     this.setState({data: responseJson});
    // }).catch(error => {
    //   console.error(error);
    // });

  }

  openModal(day, text){
    this.setState({
      modalVisible: true,
      day: JSON.stringify(day),
      text: text
    })
  }

  closeModal(){
    this.setState({
      modalVisible: false
    })
  }
  render() {
    return (<View>

      <Calendar horizontal={true}
        // Enable paging on horizontal, default = false
        pagingEnabled={true}
        // Set custom calendarWidth.
         calendarWidth={320}

        // Initially visible month. Default = Date()

        //current={'2012-03-01'}

        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined

        //minDate={'2012-05-10'}

        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2019-05-30'}
        // Handler which gets executed on day press. Default = undefined
        // onDayPress={(day) => {
        //   // Alert.alert('selected day', JSON.stringify(day))
        //   this.openModal(day)
        // }}
        // Handler which gets executed on day long press. Default = undefined
        // onDayLongPress={(day) => {
        //   console.log('selected day', day)
        // }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'MM/yyyy'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log('month changed', month)
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')

        // renderArrow={(direction) => (<Arrow />)}

        // Do not show days of other months in month page. Default = false
        hideExtraDays={false}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out

        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={false}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month

        // onPressArrowLeft={substractMonth => substractMonth()}

        // Handler which gets executed when press arrow icon left. It receive a callback can go next month

        // onPressArrowRight={addMonth => addMonth()}
        markedDates={this.state.DataCalendar}
        markingType={'period'}

        dayComponent={({date, state, marking}) => {
          return (<TouchableOpacity onPress={()=> this.openModal(date, marking.content)}
            style={{
              width: '100%',
              padding:1,
              margin: 0,
              zIndex: state === 'disabled' ? -1 : 1
            }}>
            <View style={{  borderWidth: state === 'disabled' ? 0 : 1, borderColor: '#ccc', height: 50, backgroundColor: state === 'disabled' ?'#fff' : marking.bgColor, borderRadius: 3}}>
            <Text style={{
              margin: 0,
              padding: 0,
               marginTop: 4,
              fontSize: 16,
                textAlign: 'center',
                color: state === 'disabled'
                  ? '#ccc'
                  : 'black'
              }}>
              {date.day}

            </Text>
            <Text style={{fontSize: 10, marginTop:0, padding: 0, textAlign: 'center', color: marking.textColor}}>{marking.content}</Text>
            </View>
          </TouchableOpacity>);

        }} theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: 'blue',
          textDayMarginBottom: 20,
          dayHeight: 50,
          // textDayFontFamily: 'monospace',
          // textMonthFontFamily: 'monospace',
          // textDayHeaderFontFamily: 'monospace',
          textMonthFontWeight: 'bold',
          textDayFontSize: 17,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 20,
          'stylesheet.calendar.header' : {
            week: {
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }
          }
        }}/>

        <Modal animationType="fade" transparent={false} visible={this.state.modalVisible}  presentationStyle="fullScreen" onRequestClose={() => this.setState({modalVisible: false})}>
        <View style={[styles.modal__bg_nopad]}>
          <View style={styles.modal_header_page}>
              <TouchableOpacity style={ styles.buton_back_header}
                onPress={() => this.closeModal()}>
                <Ionicons name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'} style={styles.icon_back_header}/>
              </TouchableOpacity>
              <Text style={[styles.modal_header_tilte]}>Modal</Text>
          </View>
          <ScrollView>
            <View style={{padding: 10}}>
            <Picker style={styles.picker__style_2}
                     textStyle={styles.hanghoa_picker__textStyle} mode="dialog"
                     headerBackButtonText={<FontAwesome name = "angle-left" size = {20} />}
                     iosHeader="Trạng thái" iosIcon={<FontAwesome name = "angle-down" />}
                     selectedValue={this.state.TrangThai}
                     itemStyle={styles.picker__itemStyle}>
                     {this.buildPickerTinhTP()}
                   </Picker>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>);
  }
}
