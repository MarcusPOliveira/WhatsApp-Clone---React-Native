import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableHighlight, ImageBackground, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AuthActions';

class formLogin extends Component {

    _autenticarUsuario() { //função interna
        const { email, senha } = this.props;
        //encaminhando para actionCreator
        this.props.autenticarUsuario({ email, senha });
    }

    renderBtnAcessar() {
        if (this.props.loading_login) { // spinner de loading
            return (
                <ActivityIndicator size="large" color="#FFF" />
            )
        }
        return(
            <Button 
                title='Acessar' 
                onPress={() => this._autenticarUsuario()} 
                color='#115E54'
            />
        )
    }

    render() {
        return (
            <ImageBackground style={{flex: 1, width: null}} source={require('../imgs/bg.png')} /* ImageBackground pois Image não pode encapsular */> 
                <View style={styles.container}>
                    <View style={styles.vwTitle}>
                        <Text style={styles.txtTitle}>Zap Zap</Text>
                    </View>
                    <View style={styles.vwFields}>
                        <TextInput 
                            value={this.props.email} 
                            placeholder='Email' 
                            placeholderTextColor='#FFF'  
                            style={styles.inputEmail} 
                            onChangeText={texto => this.props.modificaEmail(texto)}
                        />
                        <TextInput 
                            secureTextEntry={true} 
                            value={this.props.senha} 
                            placeholder='Senha' 
                            placeholderTextColor='#FFF' 
                            style={styles.inputSenha} 
                            onChangeText={texto => this.props.modificaSenha(texto)}
                        />
                        <Text style={styles.txtErro}> 
                            {this.props.erroLogin}
                        </Text>
                        <View style={styles.vwTxt}>  
                            <Text style={styles.txtInfo}> Ainda não tem cadastro? </Text>
                            <TouchableHighlight onPress={() => Actions.formCadastro()}>
                                <Text style={styles.txtSignUp}> Cadastre-se </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={styles.vwBtn}>
                        {
                            this.renderBtnAcessar()
                        }
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

//estabelecer transferencia de dados de state do Redux
const mapStateToProps = state => (
    {
        email: state.AuthReducer.email,
        senha: state.AuthReducer.senha,
        erroLogin: state.AuthReducer.erroLogin,
        loading_login: state.AuthReducer.loading_login
    }
);

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(formLogin);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    vwTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtTitle: {
        fontSize: 25,
        color: '#fff'    
    },
    vwFields: {   
        flex: 2,
        justifyContent: 'space-around'
    },
    inputEmail: {
        fontSize: 20,
        height: 45,
        color: '#fff'
    },
    inputSenha: {
        fontSize: 20,
        height: 45,
        color: '#fff'
    },
    txtErro: {
        color: '#FF0000',
        fontSize: 18
    },
    vwTxt: {
        flexDirection: 'row'
    },
    txtInfo: {
        fontSize: 20,
        color: '#fff'
    },
    txtSignUp: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    vwBtn: {
        flex: 2,
    }
});
