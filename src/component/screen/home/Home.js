import React, { Component, Fragment } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Input, Text, Body, Title, Icon, Content, Card, CardItem, View, Right, Item } from 'native-base';
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth } from '../../config/Config'
import image from '../../assets/img/user.png'

import Chat from './Chat';
import Kontak from './Kontak';
import Maps from './Maps';

export default class Home extends Component {

  onLogout = () => {
    auth.signOut()
      .then(res => console.warn("oke"))
  }

  render() {
    return (
      <Fragment>
        <Container>
          <Header searchBar style={{ backgroundColor: '#0253B3' }}>
            <Body>
              <Title style={{ marginLeft: 6, fontSize: 23 }}>VirChat</Title>
            </Body>
            <Item style={{ borderRadius: 30, backgroundColor: '#EFF2F4', height: 38 }}
            >
              <Icon
                style={{
                  marginTop: 10,
                  color: '#0253B3',
                  position: 'absolute',
                  paddingLeft: 15,
                }}
                name="search"
              />
              <Input style={{ marginLeft: 30, }} placeholder="Search.."
              />
            </Item>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
              <Image source={image} style={{ width: 33, height: 33, marginTop: 12, marginLeft: 17, marginRight: 3 }} />
            </TouchableOpacity>
          </Header>
          <Tabs>
            <Tab heading={<TabHeading style={{ backgroundColor: '#0253B3' }}><Text>CHAT</Text></TabHeading>}>
              <Chat navigation={this.props.navigation} />
            </Tab>
            <Tab heading={<TabHeading style={{ backgroundColor: '#0253B3' }}><Text>KONTAK</Text></TabHeading>}>
              <Kontak navigation={this.props.navigation} />
            </Tab>
            <Tab heading={<TabHeading style={{ backgroundColor: '#0253B3' }}><Text>MAPS</Text></TabHeading>}>
              <Maps navigation={this.props.navigation} />
            </Tab>
          </Tabs>
          {/* <TouchableOpacity onPress={this.onLogout}>
            <Text>
              Logout
          </Text>
          </TouchableOpacity> */}
        </Container>
      </Fragment>
    );
  }
}