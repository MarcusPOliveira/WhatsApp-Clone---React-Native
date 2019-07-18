import React from 'react';
import { Image, View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default props => (
    <ImageBackground style={{flex: 1, width: null}} source={require('../imgs/bg.png')} /* ImageBackground pois Image não pode encapsular */> 
        <View style={styles.container}>
            <View style={styles.vwTitle}>
                <Text style={styles.txtTitle}> Seja bem-vindo! </Text>
                <Image source={require('../imgs/logo.png')} />
            </View>
            <View style={styles.vwBtn}>
                <Button title='Login' onPress={() => Actions.formLogin()} />
            </View>
        </View>
    </ImageBackground>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    vwTitle: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtTitle: {
        fontSize: 20,
        color: '#FFFFFF'
    },
    vwBtn: {
        flex: 1
    }
});
