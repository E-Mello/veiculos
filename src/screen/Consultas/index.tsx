import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

export default function Consultas() {
    return (
        <View style={styles.container}>
            <Text>Consultas</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});