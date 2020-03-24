import React from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import styles from '../../styles/styles'
import { auth, db } from '../../config/Config'
import image from '../../assets/img/avatar.jpg'

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
        headerStyle: {
            backgroundColor: '#0253B3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize: 22
        },
    }

    onLogout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login')
        //     auth.signOut()
        //         .then(res => console.warn("oke"))
    }

    render() {
        return (
            <View style={{ marginVertical: 100, alignItems: 'center' }}>
                {/* <Text>Foto</Text> */}
                <Image style={{ width: 70, height: 70 }} source={image} />
                <Text style={{ fontSize: 23 }}>
                    {auth.currentUser.displayName}
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 20 }}>
                    {auth.currentUser.email}
                </Text>
                <TouchableOpacity onPress={this.onLogout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}