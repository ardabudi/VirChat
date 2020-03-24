import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Content } from 'native-base';
import { Text } from 'react-native';

class Kontak extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <TouchableOpacity>
                        <Text>Kontak..</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        )
    }
}

export default Kontak