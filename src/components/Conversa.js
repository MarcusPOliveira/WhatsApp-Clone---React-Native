import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Image, TouchableHighlight, ListView, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { modificaMensagem, enviarMensagem, conversaUsuarioFetch } from '../actions/AppActions';

class Conversa extends Component {

    componentWillMount() {
        this.props.conversaUsuarioFetch(this.props.contatoEmail);
        this.criaFonteDeDados(this.props.conversa);
    }

    componentWillReceiveProps(nextProps) {
        //Condição que resolve conflitos de ciclo de vida
        if (this.props.contatoEmail != nextProps.contatoEmail) {
            this.props.conversaUsuarioFetch(nextProps.contatoEmail);
        }
        //no momento em que a propriedade conversa é atualizada, um novo dataSource é criado
        this.criaFonteDeDados(nextProps.conversa);
    }

    criaFonteDeDados(conversa) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        //encaminhando Array de conversa para dentro do dataSource
        this.dataSource = ds.cloneWithRows(conversa); //essa key é uma variável do escopo da classe
    }

    _enviarMensagem() { //função de auxílio (helper) -> extrai mensagem, contatoNome e contatoEmail do this.props (provenientes de Contatos.js)
        const { mensagem, contatoNome, contatoEmail } = this.props;
        //enviando paramentros acima para Action enviarMensagem
        this.props.enviarMensagem(mensagem, contatoNome, contatoEmail);
    }

    renderRow(texto) {
        if (texto.tipo === 'e') {
            return (
                <View style={styles.msgEnviada}>
                    <Text style={styles.txtEnviado}> { texto.mensagem } </Text>
                </View>
            )
        }
        return (
            <View style={styles.msgRecebida}>
                <Text style={styles.txtRecebido}> { texto.mensagem } </Text>
                <Text> { texto.tipo } </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.listaMensagens}>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                </View>
                <View style={styles.bottomMensagens}>
                    <TextInput
                        style={styles.inputMensagem}
                        value={this.props.mensagem}
                        onChangeText={texto => this.props.modificaMensagem(texto)}
                    />
                    <TouchableHighlight onPress={this._enviarMensagem.bind(this)} underlayColor='#FFF'>
                        <Image source={require('../imgs/enviar_mensagem.png')}/>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

mapStateToProps = state => {
    const conversa = _.map(state.ListaConversaReducer, (val, uid) => { //convertendo para array esse objeto
        return {...val, uid}
    }); 

    return ({
        conversa,
        mensagem: state.AppReducer.mensagem
    })
}

export default connect(mapStateToProps, { modificaMensagem, enviarMensagem, conversaUsuarioFetch })(Conversa);

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        backgroundColor: '#EEE4DC',
        padding: 10
    },
    listaMensagens: {
        flex: 1,
        paddingBottom: 20,
    },
    bottomMensagens: {
        flexDirection: 'row',
        height: 60,
    },
    inputMensagem: {
        flex: 4,
        backgroundColor: '#FFF',
        fontSize: 18
    },
    msgEnviada: {
        alignItems: 'flex-end',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 40
    },
    txtEnviado: {
        fontSize: 18,
        color: '#000',
        padding: 10,
        backgroundColor: '#DBF5B4',
        elevation: 1
    },
    msgRecebida: {
        alignItems: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 40
    },
    txtRecebido: {
        fontSize: 18,
        color: '#000',
        padding: 10,
        backgroundColor: '#F7F7F7',
        elevation: 1
    }
})
