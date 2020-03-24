import React from 'react';
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
    ToastAndroid,
} from 'react-native';
import { Thumbnail } from 'native-base'
import { auth, db } from '../../config/Config'
import Logo from '../../assets/img/virchat.png'


export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)

        this.state = {
            isVisible: false,
            name: '',
            email: '',
            password: '',
            uid: '',
            latitude: null,
            longitude: null,
            errorMessage: null,
            loading: false,
            updatesEnabled: false,
        }
        this.handleSignUp = this.handleSignUp.bind(this);
    }

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

    handleSignUp = async () => {
        const { email, name, password } = this.state;
        if (name.length < 1) {
            ToastAndroid.show('Please input your fullname', ToastAndroid.LONG);
        } else if (email.length < 6) {
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
            await auth.createUserWithEmailAndPassword(email, password)
                .then(async userCredentials => {

                    db.ref('/user/' + userCredentials.user.uid)
                        .set({
                            uid: userCredentials.user.uid,
                            name: this.state.name,
                            status: 'Online',
                            email: this.state.email,
                            photo: "http://photourl.com/photo"
                        })
                        .catch(error => console.log(error.message))

                    console.log(userCredentials);
                    ToastAndroid.show("Success", ToastAndroid.LONG)


                    if (userCredentials.user) {
                        userCredentials.user.updateProfile({
                            displayName: this.state.name,
                            photoURL: "http://linkphoto.com"
                        }).then((s) => {
                            this.props.navigation.navigate("Login")
                        })
                    }


                })
                .catch(error => {
                    ToastAndroid.show(error.message, ToastAndroid.LONG)
                })

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4"></StatusBar>

                <Text style={{ marginTop: 20, fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: "#4D4957", }}>Let's Get Started!</Text>
                <Text style={{ marginTop: 4, textAlign: 'center', color: '#9F9DA3' }}>Create an account to VirChat</Text>
                <Thumbnail square large source={require('../../assets/img/virchat.png')} style={styles.logo} />

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && (
                        <Text style={styles.error}>{this.state.errorMessage}</Text>
                    )}
                </View>

                <View style={styles.form}>
                    <KeyboardAvoidingView behavior="padding" enabled>
                        <View>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                placeholder="nama"
                                onChangeText={name => this.setState({ name })}
                                value={this.state.name}
                            ></TextInput>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                placeholder="email"
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            ></TextInput>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                autoCapitalize="none"
                                placeholder="password"
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                            ></TextInput>
                        </View>
                    </KeyboardAvoidingView>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>SIGN UP</Text>
                </TouchableOpacity>


                <TouchableOpacity style={{ alignSelf: "center", marginTop: 20 }} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={{ color: "#414959", fontSize: 13 }}>
                        Already have an account? <Text style={{ fontWeight: "bold", color: "#0253B3" }}>Login Here</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        );
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
        flex: 1,
    },
    greeting: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        color: "#000000",
    },
    logo: {
        marginLeft: 120,
        marginTop: 20
    },
    form: {
        marginTop: -40,
        marginBottom: 36,
        marginHorizontal: 30,
    },
    input: {
        borderRadius: 30,
        paddingLeft: 30,
        height: 50,
        fontSize: 15,
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



// import React, { Component } from 'react';
// import { View, Text, ToastAndroid } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { Container, Header, Content, Form, Item, Input } from 'native-base';
// import { auth,db  } from "../../config/Config";

// class Register extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             isVisible: false,
//             name: '',
//             email: '',
//             password: '',
//             uid: '',
//             latitude: null,
//             longitude: null,
//             errorMessage: null,
//             loading: false,
//             updatesEnabled: false,
//         }
//         this.handleSignUp = this.handleSignUp.bind(this);
//     }

//     componentDidMount() {
//         this._isMounted = true;

//     };

//     componentWillUnmount() {
//         this._isMounted = false;

//     }


//     hideToast = () => {
//         this.setState({
//             visible: false,
//         });
//     };

//     handleSignUp = async () => {
//         const { email, name, password } = this.state;
//         if (name.length < 1) {
//             ToastAndroid.show('Please input your fullname', ToastAndroid.LONG);
//         } else if (email.length < 6) {
//             ToastAndroid.show(
//                 'Please input a valid email address',
//                 ToastAndroid.LONG,
//             );
//         } else if (password.length < 6) {
//             ToastAndroid.show(
//                 'Password must be at least 6 characters',
//                 ToastAndroid.LONG,
//             );
//         } else {
//             // Action
//             await auth.createUserWithEmailAndPassword(email, password)
//                 .then(async userCredentials => {

//                     db.ref('/user/' + userCredentials.user.uid)
//                         .set({
//                             name: this.state.name,
//                             status: 'Online',
//                             email: this.state.email,
//                             photo: "http://photourl.com/photo"
//                         })
//                         .catch(error => console.log(error.message))

//                     console.log(userCredentials);
//                     ToastAndroid.show("Success", ToastAndroid.LONG)

//                     if (userCredentials.user) {
//                         userCredentials.user.updateProfile({
//                             displayName: this.state.name,
//                             photoURL: "http://linkphoto.com"
//                         }).then((s) => {
//                             this.props.navigation.navigate("Login")
//                         })
//                     }

//                 })
//                 .catch(error => {
//                     ToastAndroid.show(error.message, ToastAndroid.LONG)
//                 })
//         }
//     }

//     render() {
//         return (
//             <Container>
//                 <Header />
//                 <Content>
//                     <Form style={{ marginBottom: 20 }}>
//                         <Item>
//                             <Input placeholder="Name" onChangeText={name => this.setState({ name })} value={this.state.name} />
//                         </Item>
//                         <Item>
//                             <Input placeholder="Email" onChangeText={email => this.setState({ email })} value={this.state.email} />
//                         </Item>
//                         <Item>
//                             <Input placeholder="Password" onChangeText={password => this.setState({ password })} value={this.state.password} />
//                         </Item>
//                     </Form>

//                     <TouchableOpacity onPress={this.handleSignUp} style={{ marginHorizontal: 30, marginBottom: 10, backgroundColor: "#2295d4", borderRadius: 10, height: 52, alignItems: 'center', justifyContent: 'center', }} >
//                         <Text style={{ color: "#ffffff", fontWeight: 'bold' }}>
//                             SIGN UP
//                         </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => this.props.navigation.navigate('Login') }  style={{justifyContent:'center',alignItems:'center'}}><Text>Already Have an Account? Login here</Text></TouchableOpacity>
//                 </Content>
//             </Container>
//         )
//     }
// }

// export default Register;