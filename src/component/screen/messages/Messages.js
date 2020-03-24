import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Dimensions, ImageBackground } from 'react-native'
import styles from '../../styles/styles'
import { db, auth, time } from '../../config/Config'
import { FlatList } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'

export default class Messages extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name', null),
            headerStyle: {
                backgroundColor: '#0253B3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontSize: 22
                // fontWeight: 'bold'
            },
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            name: props.navigation.getParam('name'),
            uid: props.navigation.getParam('uid'),
            textMessage: '',
            messageList: '',
        }

    }

    componentDidMount() {
        db.ref('/messages/').child(`/${auth.currentUser.uid}/`).child(`/${this.state.uid}/`)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }


    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = (await db.ref('/messages/').child(`/${auth.currentUser.uid}/`).child(`/${this.state.uid}/`).push()).key
            let updates = {}
            let message = {
                message: this.state.textMessage,
                time: time,
                from: auth.currentUser.uid
            }
            updates['messages/' + auth.currentUser.uid + '/' + this.state.uid + '/' + msgId] = message
            updates['messages/' + this.state.uid + '/' + auth.currentUser.uid + '/' + msgId] = message
            db.ref().update(updates);
            this.setState({ textMessage: '' })

        }
    }


    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        if (c.getDay() !== d.getDay()) {
            result = d.getDay() + '' + d.getMonth() + '' + result;
        }
        return result
    }

    renderRow = ({ item }) => {
        console.disableYellowBox = true;
        return (
            <>
                <View style={{
                    flexDirection: 'row',
                    width: '60%',
                    alignSelf: item.from === auth.currentUser.uid ? 'flex-end' : 'flex-start',
                    backgroundColor: item.from === auth.currentUser.uid ? '#00BFFF' : 'white',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'silver',
                    marginBottom: 10
                }}>
                    <Text style={{ color: 'black', padding: 7, fontSize: 17 }}>
                        {item.message}
                    </Text>
                    <Text style={{ color: 'black', padding: 13, fontSize: 12 }}>
                        {this.convertTime(item.time)}
                    </Text>
                </View>
            </>
        )
    }

    render() {
        let { height, width } = Dimensions.get('window')
        return (
            <>
                <ImageBackground source={require('../../assets/img/background.jpg')} style={{ position: 'absolute', width: '100%', height: '100%' }}>
                    {/* <Text>Inside</Text> */}
                </ImageBackground>
                <FlatList
                    style={{ padding: 10, height: height * 0.8 }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>

                    <TextInput
                        ref={ref => this.FlatList}
                        style={styles.inputmessage}
                        value={this.state.textMessage}
                        placeholder="Ketik Pesan"
                        onChangeText={this.handleChange('textMessage')}
                    />

                    <TouchableOpacity onPress={this.sendMessage} style={styles.btnSend}>
                        <Icon name='send' size={20} style={{ color: 'white', marginRight: 10, marginBottom: 15 }} />
                    </TouchableOpacity>
                </View>
            </>
        )
    }
} 