import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, modficaNome, cadastraUsuario } from '../actions/AuthActions';

class formCadastro extends Component {

    _cadastraUsuario() { //função interna do Objeto e não do Action Creator
        const { nome, email, senha } = this.props;
        
       /* 
            const nome = this.props.nome;
            const email = this.props.email;
            const senha = this.props.senha;
        */

        this.props.cadastraUsuario({ nome, email, senha }); //nome: nome 
    }

    renderBtnCadastro() {
        if (this.props.loading_cadastro) { // spinner de loading
            return (
                <ActivityIndicator size="large" color="#FFF" />
            )
        }
        return (
            <Button 
                title='Cadastrar' 
                onPress={() => this._cadastraUsuario()} 
                color='#115E54'
            />
        )
    }

    render() {
        return (
            <ImageBackground style={{flex: 1, width: null}} source={require('../imgs/bg.png')} /* ImageBackground pois Image não pode encapsular */> 
                <View style={styles.container}>
                    <View style={styles.vwFields}>
                        <TextInput 
                            value={this.props.nome} 
                            placeholder='Nome' 
                            placeholderTextColor='#FFF' 
                            style={styles.inputNome} 
                            onChangeText={texto => this.props.modficaNome(texto)}/>
                        <TextInput 
                            value={this.props.email} 
                            placeholder='Email' 
                            placeholderTextColor='#FFF' 
                            style={styles.inputEmail} 
                            onChangeText={texto => this.props.modificaEmail(texto)}/>
                        <TextInput 
                            secureTextEntry={true} 
                            value={this.props.senha} 
                            placeholder='Senha' 
                            placeholderTextColor='#FFF' 
                            style={styles.inputSenha} 
                            onChangeText={texto => this.props.modificaSenha(texto)}/>
                        <Text style={styles.txtErro} >
                            { this.props.erroCadastro }
                        </Text>
                    </View>
                    <View style={styles.vwBtn}>
                        {
                            this.renderBtnCadastro()
                        }
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => (
    {
        nome: state.AuthReducer.nome,
        email: state.AuthReducer.email,
        senha: state.AuthReducer.senha,
        erroCadastro: state.AuthReducer.erroCadastro,
        loading_cadastro: state.AuthReducer.loading_cadastro
    }
);

export default connect(
    mapStateToProps, { modificaEmail, modificaSenha, modficaNome, cadastraUsuario })(formCadastro); /* versão reduzida de JSON (chave-valor possui mesmo valor)*/ 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    vwFields: {
        flex: 4,
        justifyContent: 'center'
    },
    inputNome: {
        fontSize: 20,
        height: 45,
        color: '#fff'
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
    vwBtn: {
        flex: 1,
    }
});
