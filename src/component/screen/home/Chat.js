import React, { Component } from 'react'
import { View, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { Container, Text, Content, List, ListItem, Left, Card, CardItem, Body, Thumbnail, Right, Button, } from 'native-base';
// import { Container } from 'native-base'
import { db, auth } from '../../config/Config'
import styles from '../../styles/styles'
// import profileImage from '../../assets/img/user'

class Chat extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        users: []
    }

    componentDidMount() {
        this.getDataUser()
    }

    getDataUser() {
        db.ref('/user').on('value', (snapshot) => {
            const current_user = auth.currentUser.uid
            const data = snapshot.val()
            const user = Object.values(data)
            const result = user.filter(user => user.uid !== current_user);
            // console.log(result)
            this.setState({
                users: result
            })
        })
    }

    renderRow = ({ item }) => {
        return (
            // <Container >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Messages', item)}>
                <View style={{ flexDirection: 'row', marginVertical: 12 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Thumbnail source={require('../../assets/img/avatar.jpg')} />
                    </View>
                    <View style={{ flex: 3, borderColor: 'silver', borderBottomWidth: 2 }}>
                        <Text style={{ fontSize: 19, marginTop: 8 }}>{item.name}</Text>
                        <Text>{item.messages}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            // </Container>
        )
    }

    render() {
        const { height } = Dimensions.get('window')
        // console.disableYellowBox = true;
        return (
            <>
                <View>
                    <FlatList
                        style={{ height }}
                        data={this.state.users}
                        renderItem={this.renderRow}
                        keyExtractor={(item) => { item.uid }}
                    />
                </View>
            </>
        )
    }
}
export default Chat