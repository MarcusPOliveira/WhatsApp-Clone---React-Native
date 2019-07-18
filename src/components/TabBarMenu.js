import React from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { habilitaInclusaoContato } from '../actions/AppActions';

const TabBarMenu = props => ( //componente funcional
    <View style={styles.container}>

        <StatusBar backgroundColor="#114D44" />
        
        <View style={styles.conteudo}>
            <View style={styles.vwTitle}>
                <Text style={styles.txtTitle}>WhatsApp Clone</Text>
            </View>

            <View style={styles.container2}>
                <View style={styles.vwImage}>
                    <TouchableHighlight onPress={() => { Actions.adicionarContato(); props.habilitaInclusaoContato() }} underlayColor="#114D44">
                        <Image source={require('../imgs/adicionar_contato.png')}/>
                    </TouchableHighlight>
                </View>
                    <View style={styles.vwSair}>
                        <TouchableHighlight onPress={() => firebase.auth().signOut().then(() => Actions.formLogin())} underlayColor='#114D44'>
                            <Text style={styles.txtSair}>Sair</Text>
                        </TouchableHighlight>
                    </View>
            </View>
        </View>
        <TabBar {...props} style={{ backgroundColor: "#115E54", elevation: 0 }}/>
    </View>
);

export default connect(null, { habilitaInclusaoContato })(TabBarMenu);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#115E54',
        elevation: 4,
        marginBottom: 6
    },
    conteudo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    vwTitle: {
        height: 50,
        justifyContent: 'center'
    },
    txtTitle: {
        color: '#FFF',
        fontSize: 20,
        marginLeft: 20
    },
    container2: {
        flexDirection: 'row', 
        marginRight: 20
    },
    vwImage: {
        justifyContent: 'center',
        width: 50,
        alignItems: 'center'
    },
    vwSair: {
        justifyContent: 'center'
    },
    txtSair: {
        fontSize: 20, 
        color: '#fff'
    }
})
