import React, { Component, useEffect } from 'react';
import 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './src/component/screen/user/Login';
import RegisterScreen from './src/component/screen/user/Register';
import HomeScreen from './src/component/screen/home/Home';
import ChatScreen from './src/component/screen/home/Chat';
import ProfileScreen from './src/component/screen/user/Profile';
import MessagesScreen from './src/component/screen/messages/Messages';

// import StatusScreen from './src/component/screen/home/Status';
// import PanggilanScreen from './src/component/screen/home/Panggilan';

const homeNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: false,
    }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      header: false,
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: false,
    }
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: {
      header: false,
    }
  },
  Messages: {
    screen: MessagesScreen,
    // navigationOptions: {
    //   header: false,
    // }
  },
  Profile: {
    screen: ProfileScreen,
    // navigationOptions: {
    //   header: false,
    // }
  }
})

const AppNavigator = createSwitchNavigator({
  Home: homeNavigator,

});

const AppContainer = createAppContainer(AppNavigator);

// class App extends Component{
function App() {
  useEffect(() => {
    SplashScreen.hide()
  }, []);
  console.disableYellowBox = true;
  return (
    <AppContainer />
  )
}

export default App;