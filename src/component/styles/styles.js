import React from 'react'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'

    },
    // input: {
    //     padding: 10,
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    //     width: '80%',
    //     marginBottom: 10,
    //     marginLeft: 20,
    //     borderRadius: 5,
    // },
    inputmessage: {
        padding: 10,
        paddingLeft: 26,
        borderWidth: 1,
        borderColor: 'silver',
        width: '85%',
        marginBottom: 10,
        borderRadius: 25,
        backgroundColor: '#EFF2F4'
    },
    // btnText: {
    //     color: 'red',
    //     fontSize: 50,
    // },
    btnSend: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 10,
        height: 40,
        width: 40,
        paddingTop: 18,
        paddingLeft: 5,
        backgroundColor: '#0253B3',
        borderRadius: 20,

    }

})

export default styles