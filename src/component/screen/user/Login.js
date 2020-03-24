import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
    LayoutAnimation,
    ScrollView,
    KeyboardAvoidingView,
    ToastAndroid
} from 'react-native';
import { Center, Thumbnail, Icon } from 'native-base'
import { auth } from "../../config/Config"
import Logo from '../../assets/img/virchat.png'

class Login extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            email: '',
            password: '',
            latitude: null,
            longitude: null,
            errorMessage: null,
            visible: false,
            Onprosess: false,
        };
    }

    handleLogin = () => {
        const { email, password } = this.state;
        if (email.length < 6) {
            ToastAndroid.show(
                'Please input a valid email address',
                ToastAndroid.LONG,
            );
        } else if (password.length < 6) {
            ToastAndroid.show(
                'Password must be at least 6 characters',
                ToastAndroid.LONG,
            );
        } else {
            // Action
            auth.signInWithEmailAndPassword(email, password)
                .then(async data => {
                    console.log(data)
                })
                .catch(error => console.log(error.message))
        }
    };
    componentDidMount() {
        this._isMounted = true;

    };

    componentWillUnmount() {
        this._isMounted = false;

    }

    hideToast = () => {
        this.setState({
            visible: false,
        });
    };
    handleLogin = () => {
        const { email, password } = this.state;
        if (email.length < 6) {
            ToastAndroid.show(
                'Please input a valid email address',
                ToastAndroid.LONG,
            );
        } else if (password.length < 6) {
            ToastAndroid.show(
                'Password must be at least 6 characters',
                ToastAndroid.LONG,
            );
        } else {
            // Action
            auth.signInWithEmailAndPassword(email, password)
                .then(async data => {
                    console.log(data)
                    this.props.navigation.navigate("Home")
                })
                .catch(error => console.log(error.message))
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4"></StatusBar>
                <Text style={{ marginTop: 20, fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: "#4D4957", }}>Wellcome Back!</Text>
                <Text style={{ marginTop: 4, textAlign: 'center', color: '#9F9DA3' }}>Log in to your account of VirChat</Text>
                <Thumbnail square large source={require('../../assets/img/virchat.png')} style={styles.logo} />
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && (
                        <Text style={styles.error}>{this.state.errorMessage}</Text>
                    )}
                </View>

                <View style={styles.form}>
                    <View>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            placeholder="email"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}>
                        </TextInput>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            placeholder="Password"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}></TextInput>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                        <Text style={{ color: "#ffffff", fontWeight: 'bold' }}>
                            SIGN IN
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{ alignSelf: 'center', marginTop: 32 }}
                    onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={{ color: '#414959', fontSize: 13 }}>
                        Don't have an account?{' '}
                        <Text style={{ fontWeight: 'bold', color: "#0253B3" }}>
                            Sign up
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View >
        )
    }
}

const Toast = props => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(
            props.message,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            1,
            800,
        );
        return null;
    }
    return null;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFF2F4',
        flex: 1,
    },
    logo: {
        marginLeft: 120,
        marginTop: 20
    },
    form: {
        marginTop: -20,
        marginBottom: 40,
        marginHorizontal: 30
    },
    input: {
        borderRadius: 30,
        height: 50,
        fontSize: 15,
        paddingLeft: 30,
        backgroundColor: 'white',
    },
    button: {
        marginHorizontal: 70,
        marginBottom: 10,
        backgroundColor: "#0253B3",
        borderRadius: 30,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    error: {
        color: 'red',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
    },
    back: {
        position: 'absolute',
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(21, 22, 48, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Login;