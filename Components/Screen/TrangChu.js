import React, { Component } from "react";
import {
    Platform,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Dimensions
} from "react-native";

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
} from "native-base";
import Slideshow from "react-native-slideshow";

import styles from "../Styles/Styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
const logo_img = "../images/logo.png";

//size img w500 x h100
const W_IMG = 1600,
    H_IMG = 600;
let Width_Holder = W_IMG,
    Height_Holder = H_IMG;

try {
    Height_Holder = Dimensions.get("window").width * (H_IMG / W_IMG);
    Width_Holder = Dimensions.get("window").width;
} catch (e) {
} finally {
}

export default class More extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            password: "",
            position: 1,
            interval: null,
            isLoading: 0,
            dataSource: [
                {
                    title: "Title 1",
                    caption: "Caption 1",
                    url: "https://bxslider.com/assets/images/plant.jpg"
                },
                {
                    title: "Title 2",
                    caption: "Caption 2",
                    url: "https://bxslider.com/assets/images/daisies.jpg"
                },
                {
                    title: "Title 3",
                    caption: "Caption 3",
                    url: "https://bxslider.com/assets/images/succulents.jpg"
                }
            ]
        };

    }
    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position:
                        this.state.position === this.state.dataSource.length
                            ? 0
                            : this.state.position + 1
                });
            }, 2000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        return (
            <Container>
                <Content>
                    <Slideshow
                        dataSource={this.state.dataSource}
                        position={this.state.position}
                        onPositionChanged={position =>
                            this.setState({ position })
                        }
                    />
                    <Text style={styles.titlePage} />
                    <View style={styles.listItemCate}>
                        <View style={styles.item_cate}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate("KichHoat")
                                }
                            >
                                <Icon
                                    style={[
                                        styles.item_cate__icon,
                                        styles.icon1
                                    ]}
                                    name="qrcode"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.item_cate}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate("LichSu")
                                }
                            >
                                <Icon
                                    style={[
                                        styles.item_cate__icon,
                                        styles.icon2
                                    ]}
                                    name="history"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.item_cate}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate("HoiDap")
                                }
                            >
                                <Icon
                                    style={[
                                        styles.item_cate__icon,
                                        styles.icon3
                                    ]}
                                    name="commenting-o"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}
