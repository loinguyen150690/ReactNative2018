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

import styles from "../Styles/Styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";

export default class More extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            serial: "",
            fullname: "",
            phone: "",
            address: "",
            isLoading: 0
        };
    }
    render() {
        return (
            <Container>
                <Content style={{ backgroundColor: "#fff", paddingTop: 30 }}>
                    <KeyboardAvoidingView behavior="padding" enabled={true}>
                        <View style={styles.serial}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 4 }}>
                                    <Item floatingLabel={true}>
                                        <Label style={styles.frm__label}>
                                            Serial
                                        </Label>
                                        <Input
                                            value={this.state.serial}
                                            onChangeText={serial =>
                                                this.setState({ serial })
                                            }
                                            style={styles.frm_input}
                                        />
                                    </Item>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity
                                        style={{
                                            marginTop: 10,
                                            paddingLeft: 10
                                        }}
                                    >
                                        <Icon
                                            style={[styles.icon4]}
                                            name="qrcode"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.text_group}>
                            <Item
                                floatingLabel={true}
                                style={styles.frmlogin__item}
                            >
                                <Label style={styles.frm__label}>Họ tên</Label>
                                <Input
                                    value={this.state.fullname}
                                    onChangeText={fullname =>
                                        this.setState({ fullname })
                                    }
                                    style={styles.frm_input}
                                />
                            </Item>

                            <Item
                                floatingLabel={true}
                                style={styles.frmlogin__item}
                            >
                                <Label style={styles.frm__label}>
                                    Số điện thoại
                                </Label>
                                <Input
                                    keyboardType="phone-pad"
                                    value={this.state.phone}
                                    onChangeText={phone =>
                                        this.setState({ phone })
                                    }
                                    style={styles.frm_input}
                                />
                            </Item>

                            <Item
                                floatingLabel={true}
                                style={styles.frmlogin__item}
                            >
                                <Label style={styles.frm__label}>
                                    Địac chỉ
                                </Label>
                                <Input
                                    value={this.state.address}
                                    onChangeText={address =>
                                        this.setState({ address })
                                    }
                                    style={styles.frm_input}
                                />
                            </Item>
                        </View>
                    </KeyboardAvoidingView>
                    <View
                        style={
                            (styles.action_bottom,
                            { marginTop: 40, padding: 16 })
                        }
                    >
                        <Button
                            block={true}
                            bordered={true}
                            rounded={true}
                            style={styles.frmgetpass__btn}
                        >
                            <Text style={styles.frmgetpass__btn__txt}>
                                KÍCH HOẠT
                            </Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}
